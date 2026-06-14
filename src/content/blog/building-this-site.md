---
title: '用 Astro 从零搭建这个个人主页'
description: '记录一下我用 Astro + GitHub Pages 把这个站点搭起来的过程：技术选型、视觉重构、踩过的几个坑。'
pubDate: '2026-06-14'
tags: ['Astro', '建站', 'GitHub Pages']
---

把这个主页搭起来花了大半天，过程里踩了不少小坑。趁记忆还新写下来，给以后想搭类似站点的同学一份参考。

## 为什么选 Astro

候选有 Hexo、Hugo、Next.js（静态导出）、Astro。最后选了 [Astro](https://astro.build/)，原因有三个：

1. **首屏零 JS**。Astro 默认输出纯静态 HTML，只有需要交互的组件才会带 JS。这对一个以阅读为主的个人主页来说是完美匹配。
2. **写法接近原生**。`.astro` 文件像 HTML + 一段 frontmatter 脚本，比 Hexo 的模板语法直观，比 Next.js 的 React 心智负担小。
3. **Markdown / MDX 一等公民**。博客文章直接是 `.md`，frontmatter 用 Zod 强类型校验，写错字段构建就报错。

## 起手脚手架

一句话搞定：

```bash
npm create astro@latest -- --template blog --typescript strict
```

`blog` 模板自带文章列表、RSS、sitemap、Markdown 渲染，足够当起点。装好后跑 `npm run dev`，浏览器打开 `http://localhost:4321/` 就能看到默认页面。

## 视觉重构

模板默认样式偏简陋，参考了 Hexo 的 [Butterfly](https://butterfly.js.org/) 主题做了一版暖色调重构：

- **设计 tokens**：把所有颜色、半径、阴影写到 `src/styles/global.css` 的 CSS 变量里。亮色用 `#FFF8F4` 奶油背景 + `#FF7B7B` 主色，深色用 `#1A1820` + 同色系主色。
- **Hero 卡片**：首页头像用径向渐变光晕 + 粉橙渐变环包裹，配名字和 tagline。
- **文章卡片**：博客列表改成响应式 grid（`repeat(auto-fill, minmax(280px, 1fr))`），hover 时上浮 + 边框变主色。
- **深色模式**：右上角一个按钮，点一下在 `<html data-theme="dark">` 上切换，状态存 `localStorage`。

唯一需要小心的是**防 FOUC**（白屏闪一下）：默认渲染是亮色，等 React/JS 跑起来再切到深色，中间会闪烁。解决方法是在 `<head>` 里放一段同步 inline script，第一时间读 `localStorage` 写好 `data-theme`：

```html
<script is:inline>
  const saved = localStorage.getItem('theme');
  const prefersDark = matchMedia('(prefers-color-scheme: dark)').matches;
  document.documentElement.dataset.theme = saved || (prefersDark ? 'dark' : 'light');
</script>
```

## 部署到 GitHub Pages

仓库直接命名为 `<username>.github.io`，这样部署后的地址就是 `https://<username>.github.io/`，不需要在 `astro.config.mjs` 里配 `base` 路径。

部署用 GitHub Actions，workflow 大致这样：

```yaml
- uses: actions/setup-node@v4
  with: { node-version: 22 }
- run: npm ci
- run: npm run build
- uses: actions/upload-pages-artifact@v3
  with: { path: ./dist }
- uses: actions/deploy-pages@v4
```

推到 `main` 自动构建并部署，五分钟内就能访问。

## 踩到的坑

按踩的顺序列一下：

### 1. npm 装包 TLS 报错

第一次 `npm create astro@latest` 报 `unable to verify the first certificate`。原因是默认 Node 不信任系统证书库。两个修复方案：

- 临时：`$env:NODE_OPTIONS="--use-system-ca"` 让 Node 用 Windows 证书库
- 长期：把 npm registry 换成国内镜像，`--registry=https://registry.npmmirror.com`

### 2. Pages workflow 推不上去

`git push` 报：

```text
refusing to allow an OAuth App to create or update workflow
.github/workflows/deploy.yml without `workflow` scope
```

意思是当前 GitHub 凭据没有 `workflow` 权限。解法是装 GitHub CLI 重新登录：

```bash
gh auth login    # 选 web browser, 自动带上 workflow scope
gh auth setup-git
```

### 3. Pages 默认是 legacy 构建

新建仓库后 Pages 默认会尝试直接服务 `main` 分支根目录，而不是用 GitHub Actions 产物。结果就是访问站点看到的是 README 而不是博客。需要在仓库 Settings → Pages → Source 切到 **GitHub Actions**，或者用 API 一行：

```bash
gh api -X PUT /repos/<user>/<user>.github.io/pages -f build_type=workflow
```

### 4. Workflow 里 Node 版本太旧

Astro 6 要求 Node ≥ 22.12，但很多模板生成的 workflow 默认 `node-version: 20`。改成 22 就好。

## 下一步

这一版算搭起来了，但还差几样：

- 文章封面图（PostCard 已经预留 props，frontmatter 加 `cover:` 字段即可）
- 分类页 / 标签页
- 全文搜索（pagefind 或 fuse.js）
- View Transitions API 翻页过渡

慢慢加。源码在 [leisj24/leisj24.github.io](https://github.com/leisj24/leisj24.github.io)，有问题欢迎来 Issue。

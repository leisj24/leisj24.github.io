---
title: '给主页做一次打磨：抽公共布局、补首页内容、移动端导航'
description: '骨架搭好之后的一轮重构：把重复的侧栏布局抽成共享 layout、作者信息集中到 consts、首页加了自我介绍与技能标签，再顺手把导航做成响应式汉堡菜单。'
pubDate: '2026-07-16'
tags: ['Astro', '重构', '响应式']
category: 'tech'
---

[上一篇](/blog/building-this-site/)把站点的骨架搭起来了。用了一段时间之后，回头看代码发现几个能改的地方：布局有重复、作者信息散在各处、首页内容偏单薄、移动端导航还没做。趁着有空一次性收拾干净，顺便记下来。

## 一、把重复的侧栏布局抽出来

首页、博客列表、资料页三个页面用的是同一套「左侧 ProfileCard + 右侧内容」的布局。问题是这套布局的 CSS——网格、`main` 宽度、响应式断点——被**原样复制粘贴进了三个页面的 `<style>` 块**，每个大概 60 行。改一次断点要改三个文件，迟早会漏。

解法是抽一个共享 layout `SidebarLayout.astro`，把整套外壳（`BaseHead` / `Header` / `Banner` / 侧栏网格 / `ProfileCard` / `Footer`）收进去，页面只负责通过 `<slot />` 塞自己的内容：

```astro
---
// SidebarLayout.astro
interface Props {
	title: string;
	description: string;
	bannerTitle: string;
	bannerSubtitle?: string;
	bannerHeight?: 'large' | 'medium' | 'small';
}
const { title, description, bannerTitle, bannerSubtitle, bannerHeight = 'large' } = Astro.props;
---
<html lang="zh-CN">
	<head><BaseHead title={title} description={description} /></head>
	<body>
		<Header />
		<Banner transition:name="page-banner" title={bannerTitle} subtitle={bannerSubtitle} height={bannerHeight} />
		<main>
			<div class="page-with-sidebar">
				<ProfileCard />
				<slot />
			</div>
		</main>
		<Footer />
	</body>
</html>
```

于是首页从「一整个 HTML 文档」瘦身成只剩内容：

```astro
<SidebarLayout title={SITE_TITLE} description={SITE_DESCRIPTION}
	bannerTitle="leisj24's Homepage" bannerSubtitle="USTC 本科生 · 学习轨迹与技术思考">
	<article>...</article>
</SidebarLayout>
```

这里有个 Astro 的细节值得记一下：**scoped 样式跟着写它的文件走**。页面通过 `<slot />` 传进去的 `<article>` 和 `.posts-grid`，它们的样式仍然写在页面自己的 `<style>` 里、照常生效；而网格外壳的样式写在 layout 里。两边互不干扰，正好各管各的。

## 二、作者信息集中到 consts

`leisj24` 这个名字、GitHub 链接、邮箱……散在 Header、Footer、ProfileCard、about 页里各写一遍。全部提到 `consts.ts`：

```ts
export const AUTHOR_NAME = 'leisj24';
export const AUTHOR_TAGLINE = 'USTC 本科生 · 这里是我的学习轨迹与技术思考。';
export const GITHUB_URL = 'https://github.com/leisj24';
// 邮箱拆成两半，点击时才在客户端拼接，避免被爬虫抓
export const EMAIL_USER = 'sjlei24';
export const EMAIL_DOMAIN = 'mail.ustc.edu.cn';
```

顺手把 `ProfileCard` 的 `name` / `tagline` props 也去掉了——它永远只表示同一个作者，与其一层层往下传 props，不如直接读 `consts`，调用方反而更干净。

## 三、首页补上自我介绍和技能标签

原来的首页在 Banner 底下直接就是「最新文章」，信息密度有点低。加了一张自我介绍卡片：一句问候、一段简介，底下一排关注方向的标签（算法竞赛、系统编程、人工智能……）。内容和数据都放在 frontmatter 里，以后改文案不用碰模板：

```astro
---
const skills = ['算法竞赛', '系统编程', '人工智能', '数据结构与算法', '操作系统', '计算机网络', '数学基础'];
---
<section class="intro">
	<p class="greeting">你好，我是 <strong>{AUTHOR_NAME}</strong> 👋</p>
	<p class="intro-text">{intro}</p>
	<ul class="skill-tags">{skills.map((s) => <li>{s}</li>)}</ul>
</section>
```

样式沿用已有的设计 tokens（`--color-surface`、`--shadow-card`、`--radius-pill`），标签用的是资料页同款的 `accent-soft` 胶囊，视觉上和全站统一。

## 四、移动端导航：汉堡菜单

导航一直只有桌面版横排，窄屏下 Logo + 四个链接 + 主题切换全挤在一行。这次补上标准的汉堡菜单：

- **桌面（>720px）**：保持横排，hover 有下划线动画。
- **移动（≤720px）**：链接收进一个下拉面板，卡片样式、淡入 + 下滑动画；三根横线点开变「✕」。

真正花时间的是 **View Transitions 下的脚本重新绑定**。站点开了 `<ClientRouter />`，翻页是客户端软导航、不刷新整页，普通的顶层 `<script>` 只在首次加载跑一次，翻页之后事件监听就丢了。正确姿势是监听 `astro:page-load`，并且防止重复绑定：

```html
<script is:inline>
  document.addEventListener('astro:page-load', () => {
    const nav = document.querySelector('header nav');
    const btn = nav && nav.querySelector('.nav-toggle');
    if (nav && btn && !btn.dataset.bound) {   // 逐元素防重复绑定
      btn.dataset.bound = '1';
      btn.addEventListener('click', () => {
        const open = nav.dataset.open !== 'true';
        nav.dataset.open = String(open);
        btn.setAttribute('aria-expanded', String(open));
      });
    }
    // document 级监听（点外部 / Esc / resize 关闭）只挂一次
    if (!document.documentElement.dataset.navGlobal) {
      document.documentElement.dataset.navGlobal = '1';
      // ...
    }
  });
</script>
```

两个「防重复」用了不同粒度：元素级监听用 `btn.dataset.bound` 守；而 `document` / `window` 上的全局监听（点击外部、按 Esc、窗口放大自动收起）只能挂一次，用 `documentElement.dataset.navGlobal` 守——不然每翻一页就多叠一层监听。

菜单的关闭做得尽量顺手：点链接、点面板外、按 `Esc`（还会把焦点还给按钮）、或者把窗口拉宽到 720px 以上，都会自动收起。无障碍方面 `aria-controls` / `aria-expanded` / `aria-label` 都跟着状态更新。

## 小结

这一轮没加什么新功能，基本都是打磨：**去重、集中、补内容、补交互**。其中最值得记的是两个 Astro 相关的点——scoped 样式跟文件走让「抽 layout」这件事几乎零成本，以及 View Transitions 下所有客户端脚本都得挂到 `astro:page-load` 上重新绑定。

下一步大概会去啃文章封面图和标签页，慢慢来。

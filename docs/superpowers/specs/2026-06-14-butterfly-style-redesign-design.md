# 个人主页视觉重构 — 设计说明

- **作者**：leisj24（with Claude）
- **日期**：2026-06-14
- **状态**：草案（待用户审阅）

## 目标

把 `leisj24.github.io` 从 Astro blog starter 默认样式升级为更美观、有个人风格的主页：

- 顶栏 sticky + 半透明模糊，带主色 hover 强调
- 首页 hero 卡片（圆形头像 + 名字 + 副标题 + 社交按钮）
- 博客列表卡片化（标题 + 日期 + 摘要 + hover 上浮）
- 暖色 Butterfly 主色调
- 加深色模式切换（按钮位于顶栏右侧，`localStorage` 持久化）
- 全站中文导航与文案

## 非目标 / 暂不实现

- 文章封面图（PostCard 设计上预留，但 frontmatter 没有 `cover:` 时使用渐变占位）
- 分类页 / 标签页 / 归档页
- 站点统计计数器（文章数 / 标签数）
- 全文搜索
- View Transitions API（Astro 内置可加，本轮先不接）
- 桌面端粘性侧栏（Fuwari 风）

## 设计

### 调色板（CSS 变量）

写到 `src/styles/global.css` 的 `:root` 与 `:root[data-theme='dark']`。

亮色：

| 变量 | 值 | 用途 |
| --- | --- | --- |
| `--color-bg` | `#FFF8F4` | 页面底色（奶油暖色） |
| `--color-surface` | `#FFFFFF` | 卡片/顶栏背景 |
| `--color-surface-elevated` | `#FFFFFF` | 弹层（暂未使用） |
| `--color-text` | `#34303D` | 正文 |
| `--color-text-muted` | `#7A7480` | 元信息/副标题 |
| `--color-border` | `#EFE4E0` | 卡片/分隔线 |
| `--color-accent` | `#FF7B7B` | 主色（链接/高亮） |
| `--color-accent-hover` | `#FFA86A` | hover/active 状态 |
| `--color-accent-soft` | `#FFB1B1` | 浅强调（pill 背景等） |
| `--shadow-card` | `0 2px 8px rgba(52,48,61,.06), 0 12px 24px rgba(52,48,61,.04)` | 卡片阴影 |

深色：

| 变量 | 值 |
| --- | --- |
| `--color-bg` | `#1A1820` |
| `--color-surface` | `#25232D` |
| `--color-text` | `#F0EAEC` |
| `--color-text-muted` | `#A09BA5` |
| `--color-border` | `#3A3540` |
| `--color-accent` | `#FF8E8E`（保持暖色） |
| `--color-accent-hover` | `#FFB182` |
| `--color-accent-soft` | `#4A2F2F`（深色浅强调用更深底） |
| `--shadow-card` | `0 2px 8px rgba(0,0,0,.4), 0 12px 24px rgba(0,0,0,.25)` |

### 字体

复用模板自带的 Atkinson Hyperlegible（已通过 `astro/config` 的 `fonts` 配置加载，CSS 变量 `--font-atkinson`）。

- 标题：`var(--font-atkinson)`，700
- 正文：`var(--font-atkinson)`，400
- 中文回退到系统字体：`'PingFang SC', 'Microsoft YaHei', sans-serif`

完整 stack：`var(--font-atkinson), 'PingFang SC', 'Microsoft YaHei', system-ui, sans-serif`

### 半径与间距

- `--radius-card: 16px`
- `--radius-pill: 9999px`
- `--space-section: 4rem`（章节之间）

### 组件

#### `Header.astro`（重写）

- sticky top，`backdrop-filter: blur(12px)`，背景 `color-mix(in srgb, var(--color-surface) 80%, transparent)`
- 三列 flex：左 site title（链接到首页）/ 中导航（首页 · 博客 · 关于）/ 右（`ThemeToggle` + GitHub 图标）
- 导航项：hover 时下方 3px 主色横线从左滑入；当前页激活态实线显示
- 移动端（max-width 720px）：导航折叠为图标抽屉？**本轮简化为缩小内边距 + 隐藏 GitHub 图标**，不做抽屉

#### `ThemeToggle.astro`（新增）

- vanilla JS：读取 `localStorage.theme` → 在 `<html data-theme="dark|light">` 上写
- 按钮内联 SVG 太阳/月亮（根据当前主题切换图标）
- 首次加载时同步处理 `prefers-color-scheme`：若用户未手动选过，跟随系统
- 防 FOUC：在 `<head>` 内联一小段 `<script is:inline>` 提前读取 localStorage 并写 `data-theme`

#### `Hero.astro`（新增）

- 只在首页使用
- 居中卡片，宽度 `min(640px, 90vw)`
- 内部布局：圆形头像（120px）→ name h1 → tagline（italic muted）→ 社交按钮行
- 背景：径向渐变 `radial-gradient(circle at 30% 30%, var(--color-accent-soft) 0%, transparent 60%)` 叠加在 surface 上
- 头像：先用内联 SVG 占位（径向渐变 + 居中 "LJ" 文字）。用户准备好头像后，把图片放到 `public/avatar.png`，再把 Hero.astro 中的内联 SVG 替换为 `<img src="/avatar.png" alt="leisj24" width="120" height="120" />`（spec 里给出代码片段）
- 社交按钮：pill 样式，hover 边框变 accent

#### `PostCard.astro`（新增）

```text
┌──────────────────────────────────┐
│  文章标题（h3）                  │
│  📅 2026-06-14 · 5 min read      │
│                                  │
│  摘要文字两行……                  │
│                                  │
└──────────────────────────────────┘
```

- props: `title`, `pubDate`, `description`, `slug`(href), 可选 `readingTime`
- 整卡 `<a>` 包裹（accessibility：标题用 h3，元信息次于标题）
- hover：`transform: translateY(-2px)`、边框变 accent、阴影加深
- 过渡：`transition: all 220ms ease`

#### `Footer.astro`（修改）

- 简化为单行：`© 2026 leisj24 · Built with Astro`
- 居中 muted 色，无社交图标（已在 Header 提供）
- 高度收紧到 4rem

### 页面

#### `src/pages/index.astro`

```astro
<Header />
<main>
  <Hero />
  <section class="recent-posts">
    <h2>最新文章</h2>
    <div class="posts-grid">
      {recent3.map(post => <PostCard ... />)}
    </div>
    <p class="view-all">
      <a href="/blog">查看全部 →</a>
    </p>
  </section>
</main>
<Footer />
```

- `recent3` = `getCollection('blog')` 后按 `pubDate` 倒排取 3 篇
- 网格：`grid-template-columns: repeat(auto-fill, minmax(280px, 1fr))`，gap `1.5rem`

#### `src/pages/blog/index.astro`

- 同一个 PostCard 网格，不限数量
- 顶部加一个简洁的 h1（"博客"）

#### `src/pages/about.astro`

- 沿用 `BlogPost` 布局即可（已在上一轮个性化中处理过），仅微调让其在新调色板下表现一致

### 全局 CSS（`src/styles/global.css`）

修改内容：

- 把现有的硬编码颜色替换成 CSS 变量
- `body { background: var(--color-bg); color: var(--color-text); }`
- 链接默认色 `var(--color-accent)`，hover `var(--color-accent-hover)`
- `code`、`blockquote`、`hr` 等使用 border / surface 变量

### 占位资源

- `public/avatar.svg`：手写一个柔粉到橙的渐变圆 + 居中 "LJ" 文字（70px），作为头像兜底
- 用户后续放 `public/avatar.png` 时 Hero 自动优先用 PNG（CSS 不需要改）

## 实现顺序（建议）

1. `global.css` 调色板 + 字体 stack（基础）
2. `ThemeToggle.astro` + 防 FOUC 的 `<head>` 内联脚本
3. `Header.astro` 重写
4. `Footer.astro` 简化
5. `Hero.astro` + `public/avatar.svg`
6. `PostCard.astro`
7. `index.astro` 串起来
8. `blog/index.astro` 切换到 PostCard 网格
9. 本地 `npm run dev` 检查桌面 / 移动 / 浅深色切换 / build 无报错
10. push

## 风险与开放问题

- **FOUC**：深色模式首次加载若闪一下白色就会很糟。已在 `Head` 用 `<script is:inline>` 同步读取 `localStorage` 解决。
- **Atkinson 字体加载失败时**：fallback 是系统字体 + 苹方/微软雅黑,中文显示正常。
- **现有 blog 示例文章封面**：模板自带 4 篇有 `heroImage`,本轮 PostCard 不显示封面图,样例文章看着会有点单调 — 可接受。
- **GitHub Pages 部署**:不需要任何 workflow 改动，因为构建产物路径不变。

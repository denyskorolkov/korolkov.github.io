# Denys Korolkov's Blog

A fast, SEO-friendly blog built with [Astro](https://astro.build/) and deployed on GitHub Pages.

## 🚀 Features

- **⚡ Fast Performance**: Zero JavaScript by default, only hydrates when needed
- **📝 Markdown Blog**: Write posts in Markdown with frontmatter metadata
- **🎨 Modern Design**: Responsive, mobile-first design with dark/light mode
- **🔍 SEO Optimized**: Meta tags, sitemap, RSS feed, and clean URLs
- **💬 Comments**: Giscus integration for GitHub Discussions-powered comments
- **📱 Social Sharing**: Share buttons for Twitter/X and LinkedIn
- **🏷️ Tagging System**: Organize posts with tags
- **📄 Reading Time**: Automatic reading time estimation
- **🔗 GitHub Pages**: Automated deployment with GitHub Actions

## 🛠️ Tech Stack

- **Framework**: [Astro](https://astro.build/)
- **Styling**: CSS with custom properties for theming
- **Content**: Markdown with frontmatter
- **Deployment**: GitHub Pages with GitHub Actions
- **Comments**: [Giscus](https://giscus.app/) (GitHub Discussions)

## 📦 Project Structure

```
/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions deployment
├── public/
│   ├── CNAME                   # Custom domain configuration
│   ├── robots.txt              # SEO robots file
│   ├── manifest.json           # Web app manifest
│   ├── favicon.svg             # Site favicon
│   └── styles/
│       └── global.css          # Global styles
├── src/
│   ├── components/
│   │   ├── Comments.astro      # Giscus comments component
│   │   └── ShareButtons.astro  # Social sharing buttons
│   ├── layouts/
│   │   ├── BaseLayout.astro    # Base page layout
│   │   └── PostLayout.astro    # Blog post layout
│   └── pages/
│       ├── index.astro         # Homepage
│       ├── about.astro         # About page
│       ├── posts.astro         # Blog posts index
│       ├── rss.xml.js          # RSS feed
│       └── posts/
│           └── *.md            # Blog posts
├── astro.config.mjs            # Astro configuration
└── package.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/denyskorolkov/korolkov.github.io.git
   cd korolkov.github.io
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Visit `http://localhost:4321` to see your blog.

### Development Commands

| Command           | Action                                       |
|:------------------|:---------------------------------------------|
| `npm run dev`     | Start local dev server at `localhost:4321`  |
| `npm run build`   | Build production site to `./dist/`          |
| `npm run preview` | Preview build locally before deploying      |

## ✍️ Adding Blog Posts

### Creating a New Post

1. Create a new `.md` file in `src/pages/posts/`
2. Add frontmatter with required fields:

```markdown
---
layout: ../../layouts/PostLayout.astro
title: "Your Post Title"
description: "SEO-friendly description for your post"
pubDate: "2024-01-15"
tags: ["react", "typescript", "web-development"]
draft: false
---

Your content here...
```

### Frontmatter Fields

| Field         | Type     | Required | Description                           |
|:-------------|:---------|:---------|:--------------------------------------|
| `layout`     | string   | Yes      | Path to the post layout               |
| `title`      | string   | Yes      | Post title                           |
| `description`| string   | Yes      | SEO description (160 chars max)     |
| `pubDate`    | string   | Yes      | Publication date (YYYY-MM-DD)       |
| `tags`       | array    | No       | Array of tags                        |
| `draft`      | boolean  | No       | Set to `true` to hide the post       |
| `image`      | string   | No       | Custom social sharing image          |

### Draft Posts

Set `draft: true` in the frontmatter to hide posts from the public site while working on them.

## 🌐 Deployment

### GitHub Pages Setup

1. **Enable GitHub Pages**
   - Go to your repository settings
   - Navigate to Pages section
   - Set source to "GitHub Actions"

2. **Configure for Project Site** (optional)
   If deploying to `username.github.io/repository-name`:
   
   ```bash
   # Set environment variables in GitHub repository settings
   ASTRO_BASE=/repository-name
   SITE_URL=https://username.github.io/repository-name
   ```

3. **Custom Domain** (optional)
   - Add your domain to the `CNAME` file in `/public`
   - Configure DNS settings with your domain provider

### Manual Build

```bash
npm run build
```

The built site will be in the `dist/` directory.

## 🔧 Configuration

### Site Configuration

Update `astro.config.mjs` for your site:

```javascript
export default defineConfig({
  site: 'https://yourdomain.com',
  base: process.env.ASTRO_BASE || '',
  // ... other config
});
```

### Environment Variables

| Variable      | Description                    | Example                      |
|:-------------|:-------------------------------|:-----------------------------|
| `ASTRO_BASE` | Base path for project sites   | `/my-blog`                   |
| `SITE_URL`   | Full site URL                  | `https://example.com/blog`   |

### Comments Configuration

To enable Giscus comments:

1. Visit [giscus.app](https://giscus.app/)
2. Configure your repository settings
3. Copy the repo ID and category ID
4. Update `src/components/Comments.astro`:

```javascript
const giscusConfig = {
  repo: "username/repository",
  repoId: "your-repo-id",
  category: "General",
  categoryId: "your-category-id",
  // ... other settings
};
```

### Webhook Integration (Optional)

To receive deployment notifications:

1. Add `N8N_WEBHOOK_URL` secret to your GitHub repository
2. The workflow will POST deployment status to this URL

## 🎨 Customization

### Colors and Theming

Update CSS custom properties in `public/styles/global.css`:

```css
:root {
  --accent-color: #3b82f6;
  --text-primary: #1a202c;
  /* ... other variables */
}
```

### Adding New Pages

Create `.astro` files in `src/pages/` for new pages:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout title="Page Title">
  <!-- Your content -->
</BaseLayout>
```

## 📊 SEO Features

- **Meta Tags**: Automatic generation of title, description, and social sharing tags
- **Sitemap**: Auto-generated XML sitemap at `/sitemap-index.xml`
- **RSS Feed**: Available at `/rss.xml`
- **Robots.txt**: SEO-friendly robots configuration
- **Structured Data**: Clean semantic HTML structure
- **Performance**: Optimized for Core Web Vitals

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📧 Contact

- **Email**: [denys@korolkov.pro](mailto:denys@korolkov.pro)
- **LinkedIn**: [linkedin.com/in/denyskorolkov](https://linkedin.com/in/denyskorolkov/)
- **Website**: [www.korolkov.pro](https://www.korolkov.pro)

---

Built with ❤️ using [Astro](https://astro.build/)
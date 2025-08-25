import rss from '@astrojs/rss';

export async function GET(context) {
  const posts = await import.meta.glob('./posts/*.{md,mdx}', { eager: true });
  
  const publishedPosts = Object.values(posts)
    .filter(post => !post.frontmatter.draft)
    .sort((a, b) => new Date(b.frontmatter.pubDate).valueOf() - new Date(a.frontmatter.pubDate).valueOf());

  return rss({
    title: 'Denys Korolkov Blog',
    description: 'Senior Frontend Engineer sharing insights on React, TypeScript, and web development',
    site: context.site,
    items: publishedPosts.map((post) => ({
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      pubDate: new Date(post.frontmatter.pubDate),
      link: post.url,
      categories: post.frontmatter.tags,
    })),
    customData: `<language>en-us</language>`,
  });
}
export function blogLink(slug: string, text: string) {
  return <a href={`/blog/${slug}`}>{text}</a>
}

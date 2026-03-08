import { createFileRoute } from '@tanstack/react-router'
import BlogHomePage from '../../pages/blogs/BlogHomePage'

export const Route = createFileRoute('/blog/')({
  component: BlogRoute,
  head: () => ({
    meta: [
      {
        title: 'Blog | JP Personal Website',
      },
      {
        name: 'description',
        content:
          'Editorial notes on curation, play, automation, media, and building more human futures.',
      },
    ],
  }),
})

function BlogRoute() {
  return <BlogHomePage />
}

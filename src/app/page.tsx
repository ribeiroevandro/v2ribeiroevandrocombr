import Layout from '../components/Layout'
import { load } from 'outstatic/server'
import ContentGrid from '../components/ContentGrid'
import markdownToHtml from '../lib/markdownToHtml'

export default async function Index() {
  const { content, allPosts, allProjects, allWorks } = await getData()

  const hasProject = allProjects.length !== 0
  const hasPosts = allPosts.length !== 0

  const hasProjectOrPosts = hasPosts || hasProject ? 'max-w-6xl mx-auto px-5' : 'max-w-6xl grid place-items-center h-screen mx-auto px-5'

  return (
    <Layout>
      <div className={hasProjectOrPosts}>
        <section className="mt-16 mb-16 md:mb-12">
          <div
            className="prose lg:prose-2xl home-intro"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </section>
        {allPosts.length > 0 && (
          <ContentGrid
            title="Posts"
            items={allPosts}
            collection="posts"
            priority
          />
        )}
        {allProjects.length > 0 && (
          <ContentGrid
            title="Projects"
            items={allProjects}
            collection="projects"
          />
        )}

        {allWorks.length > 0 && (
          <ContentGrid
            title="Experiência"
            items={allWorks}
            collection="work"
          />
        )}
      </div>
    </Layout>
  )
}

async function getData() {
  const db = await load()

  const page = await db
    .find({ collection: 'pages', slug: 'home' }, ['content'])
    .first()

  const content = await markdownToHtml(page.content)

  const allPosts = await db
    .find({ collection: 'posts' }, [
      'title',
      'publishedAt',
      'slug',
      'coverImage',
      'description',
      'tags'
    ])
    .sort({ publishedAt: -1 })
    .toArray()

  const allProjects = await db
    .find({ collection: 'projects' }, ['title', 'slug', 'coverImage'])
    .sort({ publishedAt: -1 })
    .toArray()

  const allWorks = await db
    .find({ collection: 'work' }, ['title', 'slug', 'coverImage'])
    .sort({ publishedAt: -1 })
    .toArray()


  return {
    content,
    allPosts,
    allProjects,
    allWorks
  }
}

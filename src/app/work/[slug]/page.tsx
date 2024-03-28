import Header from '@/components/Header'
import Layout from '@/components/Layout'
import markdownToHtml from '@/lib/markdownToHtml'
import { getDocumentSlugs, load } from 'outstatic/server'
import DateFormatter from '@/components/DateFormatter'
import Image from 'next/image'
import ContentGrid from '@/components/ContentGrid'
import { OstDocument } from 'outstatic'
import { Metadata } from 'next'
import { absoluteUrl } from '@/lib/utils'
import { notFound } from 'next/navigation'

type Work = {
  tags: { value: string; label: string }[]
} & OstDocument

interface Params {
  params: {
    slug: string
  }
}
export async function generateMetadata(params: Params): Promise<Metadata> {
  const { work } = await getData(params)

  if (!work) {
    return {}
  }

  return {
    title: work.title,
    description: work.description,
    openGraph: {
      title: work.title,
      description: work.description,
      type: 'article',
      url: absoluteUrl(`/work/${work.slug}`),
      images: [
        {
          url: absoluteUrl(work?.coverImage || '/images/og-image.png'),
          width: 1200,
          height: 630,
          alt: work.title
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: work.title,
      description: work.description,
      images: absoluteUrl(work?.coverImage || '/images/og-image.png')
    }
  }
}

export default async function work(params: Params) {
  const { work, moreWorks, content } = await getData(params)

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-5">
        <Header />
        <article className="mb-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="relative mb-2 md:mb-4 sm:mx-0 aspect-square">
              <Image
                alt={work.title}
                src={work.coverImage ?? ''}
                fill
                className="object-cover object-center"
                priority
              />
            </div>
            <div>
              <h1 className="font-primary text-2xl font-bold md:text-4xl mb-2">
                {work.title}
              </h1>
              <div className="hidden md:block md:mb-8 text-slate-600">
                Launched on <DateFormatter dateString={work.publishedAt} />{' '}
                {work?.author?.name ? `by ${work?.author?.name}` : null}.
              </div>
              <div className="inline-block p-4 border mb-8 font-semibold text-lg rounded shadow">
                {work.description}
              </div>
              <div className="max-w-2xl mx-auto">
                <div
                  className="prose lg:prose-xl"
                  dangerouslySetInnerHTML={{ __html: content }}
                />
              </div>
            </div>
          </div>
        </article>
        <div className="mb-16">
          {moreWorks.length > 0 && (
            <ContentGrid
              title="Other works"
              items={moreWorks}
              collection="work"
            />
          )}
        </div>
      </div>
    </Layout>
  )
}

async function getData({ params }: Params) {
  const db = await load()
  const work = await db
    .find<Work>({ collection: 'work', slug: params.slug }, [
      'title',
      'publishedAt',
      'description',
      'slug',
      'author',
      'content',
      'coverImage'
    ])
    .first()

  if (!work) {
    notFound()
  }

  const content = await markdownToHtml(work.content)

  const moreWorks = await db
    .find({ collection: 'work', slug: { $ne: params.slug } }, [
      'title',
      'slug',
      'coverImage'
    ])
    .toArray()

  return {
    work,
    content,
    moreWorks
  }
}

export async function generateStaticParams() {
  const posts = getDocumentSlugs('work')
  return posts.map((slug) => ({ slug }))
}

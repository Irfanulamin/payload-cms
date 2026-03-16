// collections/Articles/fetchers.ts
import { getPayload } from 'payload'
import config from '@payload-config'
import type { PopulatedArticle } from '@/types/populated'

export async function fetchArticles(): Promise<PopulatedArticle[]> {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'articles',
    select: {
      content: false, // exclude content for list view
    },
    depth: 2, // ensures author + avatar are populated
  })
  return docs as PopulatedArticle[]
}

export async function fetchArticleBySlug(slug: string): Promise<PopulatedArticle | null> {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'articles',
    where: { slug: { equals: slug } },
    depth: 2,
    limit: 1,
  })
  return (docs[0] as PopulatedArticle) ?? null
}

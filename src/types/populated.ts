// types/populated.ts
import type { Article, ArticleAuthor, Media } from '@/payload-types'

export type PopulatedAuthor = Omit<ArticleAuthor, 'avatar'> & {
  avatar: Media
}

export type PopulatedArticle = Omit<Article, 'author' | 'coverImage'> & {
  author: PopulatedAuthor
  coverImage: Media
  pdf?: Media | null
}

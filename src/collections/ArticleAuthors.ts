import { CollectionConfig } from 'payload'

export const ArticleAuthors: CollectionConfig = {
  slug: 'article-authors',
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
}

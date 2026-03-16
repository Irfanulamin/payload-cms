import { fetchArticleBySlug } from '@/collections/Articles/fetchers'
import { RichText } from '@/lib/payload/components/RichText'
import { notFound } from 'next/navigation'
import PdfViewerWrapper from '../../_components/PDFViewerWrapper'

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = await fetchArticleBySlug(slug)

  if (!article) notFound()

  return (
    <article className="article-page">
      <header className="article-header">
        <h1>{article.title}</h1>
      </header>

      <div className="article-content">
        {article.content && <RichText lexicalData={article.content} />}
      </div>

      {article.pdf && article.pdf.url && (
        <div className="article-pdf">
          <PdfViewerWrapper fileUrl={article.pdf.url} />
        </div>
      )}
    </article>
  )
}

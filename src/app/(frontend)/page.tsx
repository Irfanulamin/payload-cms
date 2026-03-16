import { fetchArticles } from '@/collections/Articles/fetchers'

export default async function HomePage() {
  const articles = await fetchArticles()
  return (
    <>
      {articles.map((article) => (
        <div key={article.id}>
          <h2>{article.title}</h2>
          <p>{article.author.name}</p>
          <img src={article.coverImage.url as string} alt={article.title} width={300} />
          <a href={`/articles/${article.slug}`}>Read more</a>
        </div>
      ))}
    </>
  )
}

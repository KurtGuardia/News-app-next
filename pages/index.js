import Image from 'next/image'
import PageLayout from '../components/PageLayout'
import styles from '../styles/Home.module.scss'

export default function Home({ articles }) {
  return (
    <PageLayout>
      <div className={styles.container}>
        {articles.length === 0 && <p>Loading...</p>}
        {articles.length > 0 &&
          articles.map((article, index) => (
            <article key={index}>
              <Image
                src={article.urlToImage}
                alt={article.title}
                width={450}
                height={300}
                // layout='responsive'
              />
              <h2>{article.title}</h2>
              <p>{article.description}</p>
            </article>
          ))}
      </div>
    </PageLayout>
  )
}

// export async function getServerSideProps() {
export async function getStaticProps() {
  const response = await fetch(
    'https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=b5dbd67693af4df080df4680eb8b164b',
  )
  const { articles } = await response.json()
  return {
    props: {
      articles,
    },
  }
}

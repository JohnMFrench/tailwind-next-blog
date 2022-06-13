import siteMetadata from '@/data/siteMetadata'
import Link from 'next/link'
import Card from '@/components/Card'
import { PageSEO } from '@/components/SEO'
import SocialIcon from '@/components/social-icons'

export default function Projects() {
  return (
    <>
      <PageSEO title={`Projects - ${siteMetadata.author}`} description={siteMetadata.description} />
      <div className="mb-8 divide-y divide-gray-200 p-6">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1
            className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 
                        sm:text-4xl sm:leading-10 md:text-6xl md:leading-14"
          >
            Projects
          </h1>
        </div>
        <div className="grid-cols-1 space-y-4">
          <div className="text text-3xl text-rust underline underline-offset-1 hover:text-opal">
            <Link href="/flash-cards">Data Analytics Flash Cards</Link>
          </div>
          <div className="text text-3xl text-rust underline  underline-offset-1 hover:text-opal">
            <Link href="https://github.com/JohnMFrench/indeed-scraper/blob/main/scrape.ipynb">
              Scraping Data from Indeed.com
            </Link>
          </div>
          <div className="text text-3xl text-rust underline  underline-offset-1 hover:text-opal">
            <Link href="https://www.loom.com/share/1d10cb6b862a4aa992ca908e69bb78ac">
              Indiana Covid Rates by County per Capita Income with Tableau
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

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
          <div className="text text-xl text-rust underline underline-offset-1 hover:text-opal md:text-3xl">
            <Link href="/flash-cards">Data Analytics Flash Cards (App)</Link>
          </div>
          <div className="text text-xl text-rust underline underline-offset-1 hover:text-opal md:text-3xl">
            <Link href="https://github.com/JohnMFrench/indeed-scraper/blob/main/scrape.ipynb">
              Scraping Data from Indeed.com (.pynb)
            </Link>
          </div>
          <div className="text text-xl text-rust underline underline-offset-1 hover:text-opal md:text-3xl">
            <Link href="https://www.loom.com/share/43062e8f91db4b5aada8e5f3afdf5ed7">
              Scraping Data from Indeed.com (Video)
            </Link>
          </div>
          <div className="text text-xl text-rust underline underline-offset-1 hover:text-opal md:text-3xl">
            <Link href="https://www.loom.com/share/43062e8f91db4b5aada8e5f3afdf5ed7">
              Indiana Covid Rates by County per Capita Income with Tableau (Video)
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

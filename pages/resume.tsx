import siteMetadata from '@/data/siteMetadata'
import Card from '@/components/Card'
import { PageSEO } from '@/components/SEO'

export default function Resume() {
  return (
    <>
      <PageSEO title={`Projects - ${siteMetadata.author}`} description={siteMetadata.description} />
      <div className="divide-y divide-gray-200 p-6 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h2 className="text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            My Résumé
          </h2>
        </div>
        <hr />

        <div className="container py-12">
          <p className="text-xl">Download:</p>
          <a
            href="/static/docs/JohnFrenchResumeNA.pdf"
            className="text-xl text-black underline visited:text-opal hover:text-opal"
          >
            John French - Resume (pdf)
          </a>
          <hr />
          <h2 className="text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Experience
          </h2>
          <div className="container mt-6">
            <div className="grid grid-cols-2 justify-start ">
              <div className="m1">Haley's Lock, Safe, & Key</div>
              <div className="m1"></div>
            </div>
            <div className="grid grid-cols-2 justify-end">
              <div className="m1"></div>
              <div className="m1">Solution Tree</div>
            </div>
            <div className="grid grid-cols-2  justify-start">
              <div className="m1">Indiana State Department of Health</div>
              <div className="m1"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

import siteMetadata from '@/data/siteMetadata'
import { PageSEO } from '@/components/SEO'

export default function Resume() {
  return (
    <>
      <PageSEO title={`Projects - ${siteMetadata.author}`} description={siteMetadata.description} />
      <div className="divide-y divide-gray-200 p-6 dark:divide-gray-700">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h2 className="smetext-4xl text-4xl font-bold leading-9 tracking-tight text-gray-900 sm:leading-10 md:text-6xl md:leading-14">
            <span className="border-t-4 border-rust">My Résumé</span>
          </h2>
        </div>

        <div className="container py-4">
          <p className="text-md md:text-xl">
            Download:{' '}
            <a
              href="/static/docs/JohnFrenchResumeNA.pdf"
              className="text-xl text-black underline hover:text-rust"
            >
              John French - Resume (pdf)
            </a>
          </p>

          <h2 className="py-8 text-4xl font-bold leading-9 tracking-tight text-gray-900 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            <span className="border-t-4 border-rust">Experience</span>
          </h2>

          {/* LIST OF EMPLOYMENT EXPERIENCE ROW */}
          <div className="container mt-6 space-y-12">
            <div className="flex min-h-fit justify-start ">
              {/* HALEYS ROW */}
              <div className="div">
                <h3 className="m1 text-2xl underline underline-offset-1">
                  Haley's Lock, Safe, & Key
                </h3>
                <ul className="space-y-1">
                  <li className="text-xl">
                    🔑 Analyzing and reporting data for electronic security solutions
                  </li>
                  <li className="text-xl">
                    🔑 Providing remote support for over 300 security system customers
                  </li>
                  <li className="text-xl">
                    🔑 Scheduling electronic security installations and service calls
                  </li>
                  <li className="text-xl">
                    🔑 Procuring equipment and working with vendors to offer new security products
                  </li>
                </ul>
              </div>
            </div>

            {/* Solution Tree ROW */}
            <div className="">
              <h3 className="m1 text-2xl underline underline-offset-1">Solution Tree</h3>
              <ul className="space-y-1">
                <li className="text-xl">
                  📚 Generating reports on annual department revenue over $30M
                </li>
                <li className="text-xl">
                  📚 Maintaining dashboards to display project details to external stakeholders
                </li>
                <li className="text-xl">
                  📚 Monitoring and maintaining data in event-management system
                </li>
              </ul>
            </div>

            {/* ISDH ROW */}
            <div className="">
              <h3 className="m1 text-2xl underline underline-offset-1">
                Indiana State Department of Health
              </h3>
              <ul className="space-y-1">
                <li className="text-xl">📋 Assisting with mobile vaccine clinic administration</li>
                <li className="text-xl">
                  📋 Working with team to coordinate vaccine delivery to businesses
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

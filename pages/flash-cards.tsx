import siteMetadata from '@/data/siteMetadata'
import Card from '@/components/Card'
import { PageSEO } from '@/components/SEO'
import SocialIcon from '@/components/social-icons'

export default function FlashCards() {
  return (
    <>
      <PageSEO
        title={`FlashCards - ${siteMetadata.author}`}
        description={siteMetadata.description}
      />
      <div className="mb-8 divide-y divide-gray-200 p-6">
        <div className="space-y-2 pt-6 pb-8 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            Data Analytics Flash Cards
          </h1>
        </div>
        <div className="grid grid-flow-row-dense"></div>
        <div className="container grid grid-cols-2 divide-x"></div>
        <div>
          <div className="flex">
            {/*
            <p className="tracking-tight text-gray-900 sm:text-2xl sm:leading-10 md:text-4xl md:leading-14">
            Things I'm learning...
            </p>
              <div className="text-right">
                <p className="text-xl leading-7 text-gray-900">Code Wars:</p>
              </div>
            <div>
              <img
                className="object-left"
                src="https://www.codewars.com/users/JohnMFrench/badges/micro"
              />
            </div>
            
            <div className="text-right">
              <p className="text-xl leading-7 text-gray-900">Tools:</p>
            </div>
            <div className="p-6">
              <SocialIcon kind="visualstudiocode" href={'#'} size={8} />
              <SocialIcon kind="html5" href={'#'} size={12} />
            </div>
            */}
          </div>
        </div>
      </div>
    </>
  )
}

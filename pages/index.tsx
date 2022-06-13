import Link from '@/components/Link'
import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import { getAllFilesFrontMatter } from '@/lib/mdx'
//import formatDate from '@/lib/utils/formatDate'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import Image from 'next/image'
import { useEffect } from 'react'
import { PostFrontMatter } from 'types/PostFrontMatter'
//import NewsletterForm from '@/components/NewsletterForm'

const MAX_DISPLAY = 5

export const getStaticProps: GetStaticProps<{ posts: PostFrontMatter[] }> = async () => {
  const posts = await getAllFilesFrontMatter('blog')

  return { props: { posts } }
}

export default function Home({ posts }: InferGetStaticPropsType<typeof getStaticProps>) {
  //this will draw focus to the About link on the header, even if the user has not clicked it yet
  useEffect(() => {
    const about_link = document.getElementById('link-About')
    console.log('found' + about_link)
    about_link.focus()
  })
  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <div className="bg-white">
        {/* COMPONENT HEADER W/ HEADSHOT */}
        <div className="mr-4 mt-4 flex overflow-hidden">
          <h1 className="title-font m-1 border-rust text-4xl font-bold md:m-1 md:mr-4 md:border-l-8 md:border-t-8 md:pl-4 md:text-6xl md:font-medium md:tracking-wide">
            <span className="text-4xl leading-3">👋</span>
            {siteMetadata.greeting}
            <br className="hidden lg:inline-block" />
            <p></p>
          </h1>
          <span className="p-2md:border-b-8 border-rust md:border-r-8">
            <Image
              className="border-1 content-end rounded-full object-cover object-center md:min-h-full"
              width="300px"
              height="300px"
              alt="person using laptop"
              src="/static/images/headshot/headshot.jpg"
            />
          </span>
        </div>
        {/* CONTAINER THAT WILL HOLD TEXT AND IMAGE ON EITHER SIDE */}
        <div className="container mx-auto flex flex-col items-center px-5 py-4 md:flex-row md:py-4">
          {/* LEFT PANE OF CONTENT WITH TEXT */}
          <div className="mb-81 flex flex-col items-center text-center md:mb-0 md:w-1/2 md:items-start md:pr-16 md:text-left lg:flex-grow lg:pr-6">
            <p className="mb-8 text-2xl">{siteMetadata.description}</p>
            <p className="mb-8 text-2xl">{siteMetadata.sub_description}</p>
            <div className="flex justify-center">
              <Link href="/resume">
                <button className="mr-2 inline-flex rounded border-4 border-rust bg-opal py-2 px-6 text-lg shadow-2xl  hover:bg-opal focus:outline-none">
                  Resume
                </button>
              </Link>
              <Link href="/projects">
                <button className="mr-2 inline-flex rounded border-4 border-rust bg-opal py-2 px-6 text-lg shadow-2xl  hover:bg-opal focus:outline-none">
                  Portfolio
                </button>
              </Link>
            </div>
          </div>
          {/* RIGHT PANE OF CONTENT WITH IMAGE */}
          <div className="w-5/6 md:h-full md:justify-end lg:w-full lg:max-w-lg">
            <Image
              className="justify-items-start rounded-lg object-cover object-center md:min-h-full"
              width="600px"
              height="600px"
              alt="person using laptop"
              src="/static/images/e-learning/E-learning.png"
            />
          </div>
        </div>
      </div>
    </>
  )
}

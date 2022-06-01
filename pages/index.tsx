import Link from '@/components/Link'
import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import { getAllFilesFrontMatter } from '@/lib/mdx'
//import formatDate from '@/lib/utils/formatDate'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import Image from 'next/image'
import { PostFrontMatter } from 'types/PostFrontMatter'
//import NewsletterForm from '@/components/NewsletterForm'

const MAX_DISPLAY = 5

export const getStaticProps: GetStaticProps<{ posts: PostFrontMatter[] }> = async () => {
  const posts = await getAllFilesFrontMatter('blog')

  return { props: { posts } }
}

export default function Home({ posts }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <div className="divide-y·divide-gray-200·bg-white">
        <h1 className="title-font m-2 text-4xl font-medium md:text-6xl md:tracking-wide">
          Hi, my name is John
          <br className="hidden lg:inline-block" />
        </h1>
        <div className="container mx-auto flex flex-col items-center px-5 py-16 md:flex-row">
          <div className="mb-16 flex flex-col items-center text-center md:mb-0 md:w-1/2 md:items-start md:pr-16 md:text-left lg:flex-grow lg:pr-24">
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
          <div className="w-5/6 md:w-1/2 lg:w-full lg:max-w-lg">
            <Image
              className="m-3 rounded-lg object-cover object-center"
              width="400px"
              height="400px"
              alt="person using laptop"
              src="/static/images/e-learning/E-learning.png"
            />
          </div>
        </div>
      </div>
    </>
  )
}

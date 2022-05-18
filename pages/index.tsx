import Link from '@/components/Link'
import { PageSEO } from '@/components/SEO'
import Tag from '@/components/Tag'
import siteMetadata from '@/data/siteMetadata'
import { getAllFilesFrontMatter } from '@/lib/mdx'
import formatDate from '@/lib/utils/formatDate'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import Image from 'next/image'
import { PostFrontMatter } from 'types/PostFrontMatter'
import NewsletterForm from '@/components/NewsletterForm'

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
        <div className="container mx-auto flex flex-col items-center px-5 py-16 md:flex-row">
          <div className="mb-16 flex flex-col items-center text-center md:mb-0 md:w-1/2 md:items-start md:pr-16 md:text-left lg:flex-grow lg:pr-24">
            <h1 className="title-font mb-4 text-2xl font-medium md:text-6xl md:tracking-wide">
              Hi, my name is John
              <br className="hidden lg:inline-block" />
            </h1>
            <p className="mb-8 leading-relaxed">{siteMetadata.description}</p>
            <div className="flex justify-center">
              <button className="inline-flex rounded border-0 bg-opal py-2 px-6 text-lg text-white hover:bg-opal focus:outline-none">
                Resume
              </button>
              <button className="ml-4 inline-flex rounded border-0 bg-gray-100 py-2 px-6 text-lg text-gray-700 hover:bg-gray-200 focus:outline-none"></button>
            </div>
          </div>
          <div className="w-5/6 md:w-1/2 lg:w-full lg:max-w-lg">
            <Image
              className=" rounded-lg object-cover object-center"
              width="400px"
              height="400px"
              alt="person using laptop"
              src="/static/images/e-learning/e-learning.png"
            />
          </div>
        </div>
      </div>
    </>
  )
}

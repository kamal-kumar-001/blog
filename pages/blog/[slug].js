import { useRouter } from 'next/router'
import React  from 'react'
import Link from 'next/link';
// import cheerio from 'cheerio';
// import Head from 'next/head';
import Layout from '../../components/Layout';
import Container from '../../components/container';
import CategoryLabel from '../../components/category'
import { parseISO, format } from "date-fns";
import Image from "next/image";
import Head from 'next/head';
// import Pagination from '../../components/Pagination';

const Post = ({ post, author, category,navItems, page, pageCount }) => {
  const router = useRouter()
  const { slug } = router.query
  const baseUrl = process.env.URL;

  function createMarkup(c) {
    return { __html: c };
  }

  return <>
    <Layout navItems={navItems}>
       
  {post &&
  <div>
    {/* <NextSeo
            title={`${post.title} `}
            description={post.metaContent || ""}
            canonical={`${baseUrl}/post/${post.slug.current}`}
            openGraph={{
              url: `${baseUrl}/post/${post.slug.current}`,
              title: `${post.title} `,
              description: post.metaContent || "",
              images: [
                {
                  url: post.img || "",
                  width: 800,
                  height: 600,
                  alt: category.name || ""
                }
              ],
              site_name: "title"
            }}
            twitter={{
              cardType: "summary_large_image"
            }}
          />  */}
          <Head>
          <title>{post.title || ''}</title>
        <meta
          name="description"
          content={post.metaContent || ''}
        />
        <meta
          name="theme-color"
          content="#000"
        />
        <link rel="icon" href="/favicon.ico" />
          </Head>
    <Container>
      <div className="max-w-screen-md mx-auto">
        <div className="text-center">
          <CategoryLabel categories={category} />
        </div>

        <h1 className="mt-2 mb-3 text-3xl font-semibold tracking-tight text-center lg:leading-snug text-brand-primary lg:text-4xl dark:text-white">
          {post.title}
        </h1>

        <div className="flex justify-center mt-3 space-x-3 text-gray-500">
          <div className="flex items-center gap-3">
            <div className="relative flex-shrink-0 w-10 h-10">
                <Image
                  src={author.img}
                  // blurDataURL={AuthorimageProps.blurDataURL}
                  // loader={AuthorimageProps.loader}
                  // objectFit="cover"
                  alt={author.name}
                  // placeholder="blur"
                  // layout="fill"
                  sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
                  fill
                  className="rounded-full object-cover"
                />
            </div>
            <div>
              <p className="text-gray-800 dark:text-gray-400">
                {author.name}
              </p>
              <div className="flex items-center space-x-2 text-sm">
                <time
                  className="text-gray-500 dark:text-gray-400"
                  dateTime={ post.createdAt}>
                  {format(
                    parseISO( post.createdAt),
                    "MMMM dd, yyyy"
                  )}
                </time>

              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
    {/* <div className="relative z-0 max-w-screen-lg mx-auto overflow-hidden lg:rounded-lg aspect-video">
              <Image
                src={post.img}
                // loader={imageProps.loader}
                // blurDataURL={imageProps.blurDataURL}
                alt={"Thumbnail"}
                // layout="fill"
                fill
                loading="eager"
                // priority
                sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 50vw,
              33vw"
                // objectFit="cover"
              />
          </div> */}
    <div className="flex  flex-col-reverse md:flex-row">
      <Container>
        <article className="max-w-screen-md mx-auto">
          <div className="mx-auto my-3 prose prose-base dark:prose-invert prose-a:text-blue-500" dangerouslySetInnerHTML={createMarkup(post.content)} />
          <div className="flex justify-center mt-7 mb-7">
            <Link href="/">
              <span className="px-5 py-2 text-sm text-blue-600 rounded-full dark:text-blue-500 bg-brand-secondary/20">
                ← View all posts
              </span>
            </Link>
          </div>
        </article>
        {/* <Pagination
          post={post}
          pageCount={blogs.length}
          currentPage={currentPage}
          handlePageChange={handlePageChange}
        /> */}
      </Container>
    </div>
    </div>
  }
</Layout>

  </>
}
export async function getServerSideProps({ params }) {
  const { slug } = params;
  const baseUrl = process.env.URL;
  const res = await fetch(`${baseUrl}/api/blog/${slug}`);
  const blog = await res.json();
  const navRes = await fetch(`${baseUrl}/api/navApi`);
  const navData = await navRes.json();

  return {
    props: {
      post: blog,
      author: blog.user,
      category: blog.category,
      navItems: navData.navItems,
    },
  };
}
export default Post
  

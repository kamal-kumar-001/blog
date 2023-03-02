import { useRouter } from 'next/router'
import React, { Suspense } from 'react'
import Link from 'next/link';
// import cheerio from 'cheerio';
// import Head from 'next/head';
import Layout from '../../components/Layout';
import Container from '../../components/container';
import CategoryLabel from '../../components/category'
import { parseISO, format } from "date-fns";
import Image from "next/image";
import Head from 'next/head';
import Loading from '../../components/Loading';
// import Pagination from '../../components/Pagination';

const Post = ({ post, author, relatedBlogs, category, navItems, categories, page, pageCount }) => {
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

            <div>
              <div className="relative flex items-center z-0 min-h-[calc(100vh-30vh)]">
                <div
                  className="absolute w-full h-full -z-10 before:bg-black/30 before:w-full before:h-full before:absolute before:z-10">
                  <Image
                    src={post.img}
                    // blurDataURL={AuthorimageProps.blurDataURL}
                    // loader={AuthorimageProps.loader}
                    // objectFit="cover"
                    alt={post.title}
                    // placeholder="blur"
                    // layout="fill"
                    loading='eager'
                    priority
                    sizes="(max-width: 768px) 100vw,
                   (max-width: 1200px) 50vw,
                   33vw"
                    fill
                    className=" object-cover"
                  />
                </div>
                <div className="max-w-screen-lg px-5 py-20 mx-auto text-center">
                  <h1
                    className="mt-2 mb-3 text-3xl font-semibold tracking-tight text-white lg:leading-tight text-brand-primary lg:text-5xl">
                    {post.title || ''}</h1>
                  <div className="flex justify-center mt-8 space-x-3 text-gray-500 ">
                    <div className="flex flex-col gap-3 md:items-center md:flex-row">
                      <div className="flex gap-3">
                        <div className="relative flex-shrink-0 w-5 h-5">

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
                        <p className="text-gray-100 "><a href="/author/erika-oliver">{author.name}</a> <span
                          className="hidden pl-2 md:inline"> ·</span></p>
                      </div>
                      <div>
                        <div className="flex space-x-2 text-sm md:flex-row md:items-center">
                          <time
                            className="text-gray-100 "
                            dateTime={post.createdAt}>
                            {format(
                              parseISO(post.createdAt),
                              "MMMM dd, yyyy"
                            )}
                          </time>
                          <span className="text-gray-100">· 5 min read</span></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col max-w-screen-xl gap-5 px-5 mx-auto md:flex-row mt-14">
                <article className="flex-1">
                  <div className="mx-auto my-3 prose prose-lg dark:prose-invert prose-a:text-blue-500" dangerouslySetInnerHTML={createMarkup(post.content)}>
                  </div>
                  <div className="flex justify-center mt-7 mb-7"><a
                    className="px-5 py-2 text-sm text-blue-600 rounded-full dark:text-blue-500 bg-brand-secondary/20 "
                    href="/">← View all posts</a></div>
                  <div
                    className="px-8 py-8 mt-3 text-gray-500 rounded-2xl bg-gray-50 dark:bg-gray-900 dark:text-gray-400">
                    <div className="flex flex-wrap items-start sm:space-x-6 sm:flex-nowrap">
                      <div className="relative flex-shrink-0 w-24 h-24 mt-1 ">
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
                        <div className="mb-3">
                          <h3 className="text-lg font-medium text-gray-800 dark:text-gray-300">About {author.name}
                          </h3>
                        </div>
                        <div>
                          <p>Erika Oliver is a successful entrepreuner. She is the founder of Acme Inc, a
                            bootstrapped business that builds affordable SaaS tools for local news, indie
                            publishers, and other small businesses.</p>
                        </div>
                        <div className="mt-3"><a
                          className="py-2 text-sm text-blue-600 rounded-full dark:text-blue-500 bg-brand-secondary/20 "
                          href="/author/erika-oliver">View Profile</a></div>
                      </div>
                    </div>
                  </div>
                </article>
                <Suspense fallback={<Loading />}>
                <aside className="sticky top-12 self-start w-full md:w-96">
                  <div className="mt-5 font-sans">
                    <div className="mt-10">
                      <h3 className="text-2xl font-bold dark:text-white">Related</h3>
                      <div className="grid gap-6 mt-6">
                        {relatedBlogs && relatedBlogs.map(blog => (
                          <Link key={blog._id} href={`/blog/${blog.slug}`}>
                            <div className="flex gap-5">
                              <div className="relative w-24 h-20 overflow-hidden rounded-md shrink-0">
                                <Image
                                  src={blog.img}
                                  // blurDataURL={AuthorimageProps.blurDataURL}
                                  // loader={AuthorimageProps.loader}
                                  // objectFit="cover"
                                  alt={blog.title}
                                  // placeholder="blur"
                                  // layout="fill"
                                  sizes="(max-width: 768px) 100vw,
                                (max-width: 1200px) 50vw,
                                   33vw"
                                  fill
                                  className=" object-cover"
                                />
                              </div>
                              <div>
                                <h3 className="font-medium dark:text-white">{blog.title}</h3>
                                <p className="mt-2 text-sm text-gray-500">
                                  <time className=""
                                    dateTime={blog.createdAt}>
                                    {format(
                                      parseISO(blog.createdAt),
                                      "MMMM dd, yyyy"
                                    )}</time></p>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                    <div className="mt-10">
                      <h3 className="text-2xl font-bold dark:text-white">Categories</h3>
                      <ul className="grid mt-4">
                        {categories && categories.map(category => (
                          <li key={category._id}>
                            <Link className="flex items-center justify-between py-2" href={`/category/${category.slug}`}>
                              <h4 className="text-gray-800 dark:text-gray-400">{category.name}</h4>
                              <div
                                className="inline-flex items-center justify-center font-bold px-2 h-6 text-sm bg-blue-50 text-blue-500 rounded-full shrink-0 dark:bg-gray-800 dark:text-gray-300">
                                {category.postCount}</div>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </aside>
</Suspense>
              </div>
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
  const { blog, relatedBlogs } = await res.json();
  const navRes = await fetch(`${baseUrl}/api/navApi`);
  const navData = await navRes.json();
  const catRes = await fetch(`${baseUrl}/api/getCategory`);
  const catData = await catRes.json();

  return {
    props: {
      post: blog,
      relatedBlogs,
      author: blog.user,
      category: blog.category,
      navItems: navData.navItems,
      categories: catData.categories,
    },
  };
}
export default Post

{/* <Container>
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
                        dateTime={post.createdAt}>
                        {format(
                          parseISO(post.createdAt),
                          "MMMM dd, yyyy"
                        )}
                      </time>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
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
            </Container>
          </div> */}
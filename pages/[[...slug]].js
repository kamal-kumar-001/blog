import React, { Suspense } from 'react';
import Container from '../components/container';
import Layout from '../components/Layout';
import { useRouter } from 'next/router';
import Home from '../components/Home';
import Blog from '../components/blogs';
import Contact from '../components/contact';
import Head from 'next/head';
import Loading from '../components/Loading';
import Portfolio from '../components/Portfolio';
import NotFoundPage from '../components/404';
const DefaultPage = ({categories, blogs, allBlogs, navItems, page }) => {
  const router = useRouter();
  const { slug } = router.query;

  console.log(blogs.length);

  function createMarkup(c) {
    return { __html: c };
  }
  if (router.isFallback) {
    return <Loading />;
  }
  if (router.asPath === '/') {
    return (
      <Layout navItems={navItems}>
        <Head>
        <title>Blog | Homepage</title>
        <meta
          name="description"
          content='create a blog with next js'
        />
        <meta
          name="theme-color"
          content="#000"
        />
        <link rel="icon" href="/favicon.ico" />
        </Head>
       <Home  blogs={blogs}/>
    </Layout>      
    );
  }
  if (router.asPath === '/blog') {
    return <Blog navItems={navItems} categories={categories}  blogs={allBlogs}/>;
  }
  if (router.asPath === '/contact') {
    return <Contact navItems={navItems} />;
  }
  if (router.asPath === '/portfolio') {
    return (
      <Layout navItems={navItems}>
        <Portfolio  />
      </Layout>
    )
  }
  return (
    <Layout navItems={navItems}>
      <Head>
      <title>{page.title || ''}</title>
        <meta
          name="description"
          content={page.desc || ''}
        />
        <meta
          name="theme-color"
          content="#000"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Suspense fallback={<Loading />}>
      <Container>
        {page && (
            <div dangerouslySetInnerHTML={createMarkup(page.content)}></div>
        )}
        {page.content  ? (
            <a></a>
        ): (
          // <NotFound />
          <NotFoundPage />
        )}
      </Container>
</Suspense>
    </Layout>
  );
};

export async function getServerSideProps({ params }) {
  // let baseUrl = process.env.URL
  let baseUrl = 'https://blog-jcxn.vercel.app/'

  const { slug } = params;
  const res = await fetch(`${baseUrl}/api/getBlog`);
  const data = await res.json();
  const navRes = await fetch(`${baseUrl}/api/navApi`);
  const navData = await navRes.json();
  const path = Array.isArray(slug) ? slug.join('/') : slug;
  const pageRes = await fetch(`${baseUrl}/api/page/${path}`);
  const page = await pageRes.json();

  return {
    props: {
      page: page,
      allBlogs: data.getBlogs,
      blogs: data.getBlogs.slice(0, 3),
      categories: data.categories,
      navItems: navData.navItems,
    },
  };
}
// export async function getServerSideProps({ params, req }) {
//   let baseUrl = process.env.URL;
//   const { slug } = params;
//   const path = Array.isArray(slug) ? slug.join('/') : slug;

//   let data;
//   if (path === 'blog') {
//     const res = await fetch(`${baseUrl}/api/getBlog`);
//     data = await res.json();
//   } else if (path === ''  ) {
//     const res = await fetch(`${baseUrl}/api/getBlog`);
//     data = await res.json();
//     console.log(data.getBlogs.slice(0, 3).length);
//   } 
//     const res = await fetch(`${baseUrl}/api/page/${path}`);
//     const page = await res.json();
  

//   const navRes = await fetch(`${baseUrl}/api/navApi`);
//   const navData = await navRes.json();

//   return {
//     props: {
//       allBlogs: data?.getBlogs ?? [],
//       blogs: data?.getBlogs.slice(0, 3) ?? [],
//       categories: data?.categories ?? [],
//       navItems: navData.navItems,
//       page: page,
//     },
//   };
// }

export default DefaultPage;

import React from 'react';
import Container from '../components/container';
import Layout from '../components/Layout';
import { useRouter } from 'next/router';
import Home from '../components/Home';
import Blog from '../components/blogs';
import Contact from '../components/contact';
import Head from 'next/head';

const DefaultPage = ({categories, blogs, allBlogs, navItems, page }) => {
  const router = useRouter();
  const { slug } = router.query;

  function createMarkup(c) {
    return { __html: c };
  }
  
  if (router.asPath === '/') {
    return (
      <Layout navItems={navItems}>
        <Container>
       <Home  categories={categories} blogs={blogs}/>
        </Container>
    </Layout>      
    );
  }
  if (router.asPath === '/blog') {
    return <Blog navItems={navItems} categories={categories}  blogs={allBlogs}/>;
  }
  if (router.asPath === '/contact') {
    return <Contact navItems={navItems} />;
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
      <Container>
        {page && (
            <div dangerouslySetInnerHTML={createMarkup(page.content)}></div>
        )}
      </Container>
    </Layout>
  );
};

export async function getServerSideProps({ params }) {
  let baseUrl = process.env.URL
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

export default DefaultPage;

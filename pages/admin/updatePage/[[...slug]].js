import React from 'react';
// import Router from 'next/router';
import WithAuth from '../withAuth';

import PageForm from '../../../components/adminComponents/PageForm';
const UpdatePage = ({ page }) => {

  return <PageForm initialValues={{title: page.title, content: page.content, slug: page.slug, desc: page.desc,  }} 
  mode="update" page={page}/>;
};
export async function getServerSideProps({ params }) {
  const { slug } = params;
  const baseUrl = process.env.URL;
  const path = Array.isArray(slug) ? slug.join('/') : slug;
  const res = await fetch(`${baseUrl}/api/page/${path}`);
  const page = await res.json();

  return {
    props: {
      page: page,
    },
  };
}
export default WithAuth(UpdatePage);


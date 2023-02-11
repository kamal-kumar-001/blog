import React from 'react';
// import Router from 'next/router';
import Page from '../../../models/Page';
import connectDb from '../../../middleware/mongoose';
import WithAuth from '../withAuth';

import PageForm from '../../../adminComponents/PageForm';
const UpdatePage = ({ page }) => {

  return <PageForm initialValues={{title: page.title, content: page.content, slug: page.slug, desc: page.desc,  }} 
  mode="update" page={page}/>;
};
export async function getServerSideProps({ query }) {
    await connectDb();
    const page = await Page.findOne({ _id: query.slug });
    return {
      props: {
        page: JSON.parse(JSON.stringify(page)),
      },
    };
  }
export default WithAuth(UpdatePage);


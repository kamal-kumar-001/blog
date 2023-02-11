import React  from 'react'
import Container from "../components/container";
import Layout from "../components/Layout";
import Page from '../models/Page';
import connectDb from '../middleware/mongoose';
import { useRouter } from 'next/router'

const DefaultPage = ({page}) => {
    const router = useRouter()
  const { slug } = router.query

    function createMarkup(c) {
        return { __html: c };
      }
  return (
    <Layout>
      <Container>
        {page && <div>
        <div>{page.title}</div>
        <div dangerouslySetInnerHTML={createMarkup(page.content)}></div>
        </div>
        }
      </Container>
    </Layout>
  )
}
export async function getServerSideProps(context) {
    await connectDb();
    let page = await Page.findOne({ slug: context.query.slug });
    return {
      props: {
        page: JSON.parse(JSON.stringify(page)),
      },
    }
  }

export default DefaultPage



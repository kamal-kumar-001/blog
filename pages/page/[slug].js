import React,{useEffect, useState} from 'react'
import Container from "../../components/container";
import Layout from "../../components/Layout";
import Page from '../../models/Page';
import connectDb from '../../middleware/mongoose';
import { useRouter } from 'next/router'

const DefaultPage = ({pages}) => {
    const router = useRouter()
  const { slug } = router.query

    const [page, setPage] = useState(null)
    useEffect(() => {
        setPage(pages)
      }, [pages])
    //   console.log(page)
    function createMarkup(c) {
        return { __html: c };
      }
  return (
    <Layout>
      <Container>
        {page && <div>
        <div>{page.title}</div>
        <div dangerouslySetInnerHTML={createMarkup(page.content)}></div>
        {/* <script>console.log(page)</script> */}
        </div>
        }
      </Container>
    </Layout>
  )
}
export async function getServerSideProps(context) {
    await connectDb();
    let page = await Page.findOne({ slug: context.query.slug });
    // console.log(page)
    // let pages = await Page.find();
    return {
      props: {
        pages: JSON.parse(JSON.stringify(page)),
        // pages: JSON.parse(JSON.stringify(pages)),
      },
    }
  }

export default DefaultPage



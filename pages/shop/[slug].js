import { useRouter } from 'next/router'
import connectDb from '../../middleware/mongoose';
import Product from '../../models/shop/Product';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import Layout from '../../components/Layout';
import Container from '../../components/container';

const Post = ({ addToCart, product }) => {
  const router = useRouter()
  const { slug } = router.query

  return (
    <Layout >
      <Container>
    <section className="text-gray-600 body-font overflow-hidden">
      {/* <ToastContainer></ToastContainer> */}
      <div className="container px-5 py-10 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-96 h-80 mt-10 px-20 object-top rounded" src={product.img} />
          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            <h2 className="text-sm title-font text-gray-500 tracking-widest">Code Shop</h2>
            <h1 className=" text-3xl title-font font-medium mb-1">{product.title}</h1>
            <p className="leading-relaxed">{product.content}</p>
            <div className="space-y-6">
              <div className="title-font font-medium text-2xl ">₹{product.price}.00</div>
              {/* <button onClick={() => { addToCart(slug, 1, product.price, product.title, size, color) }} className="flex ml-3 text-white bg-orange-500 border-0 py-2 px-4 focus:outline-none hover:bg-orange-600 rounded text-sm">Add To Cart</button> */}
              {/* <button onClick={() => { buyNow(slug, 1, product.price, product.title, size, color) }} className="flex ml-3 text-white bg-orange-500 border-0 py-2 px-4 focus:outline-none hover:bg-orange-600 rounded text-sm">Buy Now</button> */}
              <button  className="flex ml-3 text-white bg-orange-500 border-0 py-2 px-4 focus:outline-none hover:bg-orange-600 rounded text-sm">Add To Cart</button>
              <button  className="flex ml-3 text-white bg-orange-500 border-0 py-2 px-4 focus:outline-none hover:bg-orange-600 rounded text-sm">Buy Now</button>
              <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                  <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                </svg>
              </button>

            </div>
          </div>
        </div>
      </div>
    </section>
    </Container>
    </Layout>
  )
}

export async function getServerSideProps(context) {

  await connectDb();
  let product = await Product.findOne({ slug: context.query.slug })
  return {
    props: { product: JSON.parse(JSON.stringify(product)) },
  }
}
export default Post


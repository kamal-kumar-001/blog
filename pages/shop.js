import React  from 'react';
import connectDb from '../middleware/mongoose';
import Product from '../models/Shop/Product';
import Layout from '../components/Layout';
import Container from '../components/container';
import Link from 'next/link';
import {HiOutlineShoppingCart, HiStar} from 'react-icons/hi';

const Products  = ({ products }) => {

  return (
    <Layout>
      <Container>
      {/* <div className=" body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex gap-5  flex-wrap -m-4 justify-center">
            {
              products.map((item) => {
                return <Link passHref={true} key={item._id} href={`/shop/${item.slug}`}>
                  <div className="dark:bg-gray-700 p-4 cursor-pointer w-sm shadow-lg m-5">
                    <span className="block relative rounded overflow-hidden">
                      <img alt="ecommerce" className="m-auto md:mx-0 w-full  h-[30vh] md:h-[36vh] block" src={item.img} />
                    </span>
                    <div className="mt-4 text-center md:text-left ">
                      <h3 className=" text-xs tracking-widest title-font mb-1">{item.category}</h3>
                      <h2 className="dark:text-white title-font text-lg font-medium">{item.title}</h2>
                      <p className="mt-1">{item.price}</p>
                    </div>
                  </div>
                </Link>
              })}
          </div>
        </div>
      </div> */}
      <section className="py-10 ">
  <div className="mx-auto grid max-w-6xl  grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
  {
              products.map((item) => {
                return  <article key={item._id} className="rounded-xl bg-white p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300 ">
      <Link passHref={true} href={`/shop/${item.slug}`}>
        <div className="relative  flex justify-between items-end overflow-hidden rounded-xl">
          <img className='h-56 m-auto   '  src={item.img} alt={item.title} />
          {/* <img src="https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="Hotel Photo" /> */}
          <div className="absolute bottom-3 left-3 inline-flex items-center rounded-lg bg-white p-2 shadow-md">
            <HiStar className='text-yellow-400' size={20} />
            <span className="ml-1 text-sm text-slate-400">4.9</span>
          </div>
        </div>

        <div className="mt-1 p-2">
          <h2 className="text-slate-700">{item.title}</h2>
          <p className="mt-1 text-sm text-slate-400">Lisbon, Portugal</p>

          <div className="mt-3 flex items-end justify-between">
              <p className="text-lg font-bold text-blue-500">₹{item.price}</p>

            <div className="flex items-center space-x-1.5 rounded-lg bg-blue-500 px-4 py-1.5 text-white duration-100 hover:bg-blue-600">
              <HiOutlineShoppingCart size={20} />

              <button className="text-sm">Add to cart</button>
            </div>
          </div>
        </div>
      </Link>
    </article>
     })}
    </div>
</section>
      </Container>
    </Layout>
  );
};
export async function getServerSideProps(context) {
  await connectDb();
  let products = await Product.find()

  return {
    props: { 
      products: JSON.parse(JSON.stringify(products)) ,
    },
    
  }
}

export default Products;


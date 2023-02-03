import React  from 'react';
import connectDb from '../middleware/mongoose';
import Product from '../models/Shop/Product';
import Layout from '../components/Layout';
import Container from '../components/container';
import Link from 'next/link';

const Products  = ({ products }) => {

  return (
    <Layout>
      <Container>
      <div className=" body-font">
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
      </div>
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


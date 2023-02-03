import React from 'react'
import Layout from '../components/Layout';
import Container from '../components/container';
import Link from 'next/link';
import User from '../models/User'
import mongoose from 'mongoose'
import Image from "next/image";
const About = ({authors}) => {
  return (
    <Layout >
      <Container>
        <h1 className="mt-2 mb-3 text-3xl font-semibold tracking-tight text-center lg:leading-snug text-brand-primary lg:text-4xl dark:text-white">
          About
        </h1>
        <div className="text-center">
          <p className="text-lg">We are a small passionate team.</p>
        </div>

        <div className="grid grid-cols-3 gap-5 mt-6 mb-16 md:mt-16 md:mb-32 md:gap-16">
          {authors.slice(0, 3).map(author => (
            <div
              key={author._id}
              className="relative overflow-hidden rounded-md aspect-square odd:translate-y-10 odd:md:translate-y-16">
              <Image
                src={author.img}
                alt={author.name || " "}
                // layout="fill"
                // objectFit="cover"
                priority
                fill
                sizes="(max-width: 320px) 100vw, 320px"
              />
            <span>{author.name}</span>
            </div>
          ))}
        </div>

        <div className="mx-auto prose text-center dark:prose-invert mt-14">
          <p>
            We provide real-time connectivity to enable software
            providers and financial institutions to build integrated
            products for their small business customers.
          </p>
          <p>
            Our API infrastructure is leveraged by clients ranging
            from lenders to corporate card providers and business
            forecasting tools, with use cases including automatic
            reconciliation, business dashboarding, and loan
            decisioning.
          </p>
          <p>
            <Link href="/contact">Get in touch</Link>
          </p>
        </div>
      </Container>
    </Layout>
  )
}
export async function getServerSideProps(context) {
    if (!mongoose.connections[0].readyState) {
        await mongoose.connect(process.env.MONGO_URL)
      }
    
      let user = await User.find();
    
      return {
        props: {
            authors: JSON.parse(JSON.stringify(user)), 
        },
      }
  }
export default About;
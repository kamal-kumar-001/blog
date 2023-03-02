import React, { useState } from "react";
import BlogList from "./blogList";
import Carousel from "./Carousel";
// import Services from "./Services";
// import Service from "./Service";
// import HowWeDo from "./how";

const Home = ({ blogs }) => {
  const carouselItems = [
    {
      bgImage: "https://cdn.sanity.io/images/cijrdavx/production/d4898616e2973584b1b8a0bfdb5c6cf7c36ab012-1064x1330.png?w=1080&q=75&fit=clip&auto=format",
      title: "Adding blog in production",
      text: "1 This guide will teach you how to create a web form with Next.js.",
      buttonName: "Read Blog 1",
      link: "/blog/adding-blog-in-production"
    },
    {
      bgImage: "https://cdn.sanity.io/images/cijrdavx/production/b7d2fa6d0b250bd1e0c601645319db4cde42a01e-3958x5937.jpg?w=1080&q=75&fit=clip&auto=format",
      title: "Production testing update",
      text: "2 This guide will teach you how to create a web form with Next.js.",
      buttonName: "Read Blog 2",
      link: "/blog/testing"
    },
    {
      bgImage: "https://cdn.sanity.io/images/cijrdavx/production/12301f301772ed723724302aef7c70c5c1c0151f-4500x8000.jpg?rect=0,1080,4500,5330&w=1080&q=75&fit=clip&auto=format",
      title: "5 Tips for Staying Productive at Home",
      text: "3 This guide will teach you how to create a web form with Next.js.",
      buttonName: "Read Blog 3",
      link: "/blog/5-tips-for-staying-productive-at-home"
    }
  ];


  return (
    <div>
      <Carousel items={carouselItems} />
      {/* <Service /> */}
      {/* <Services/> */}
      {/* <HowWeDo /> */}
      
      <h1 className="mt-2 px-5  mb-3 text-2xl font-semibold tracking-tight lg:leading-snug text-brand-primary lg:text-3xl dark:text-white">
        Recent Blogs
      </h1>
      <div className="grid gap-10 px-5 mt-10 lg:gap-10 md:grid-cols-2 lg:grid-cols-3 ">
        <BlogList blogs={blogs} aspect="landscape" />
      </div>
    </div>
  );
};

export default Home;

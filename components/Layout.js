import React from "react";
import Head from "next/head";
// import { NextSeo } from "next-seo";
import Navbar from "./Navbar";
// import defaultOG from "../public/img/og-default.jpg";

import Footer from "./Footer";
import ChatBot from './Chatbot'
// import PopupWidget from "../components/popupWidget";

export default function Layout(props) {
  const { children, navItems } = props;
//   const ogimage = GetImage(props?.openGraphImage)?.src ?? "";
  return (
    <>
      <Head>
        <link rel="preconnect" href="/" />
        <link rel="dns-prefetch" href="/" />
      </Head>
      {/* <NextSeo
        title={props.title}
        description={props.description}
        canonical={props.url}
        openGraph={{
          url: props.url,
          title: props.title,
          description: props.description,
          images: [
            {
            //   url: ogimage,
              width: 800,
              height: 600,
              alt: props.title
            }
          ],
          site_name: props.title
        }}
        twitter={{
          handle: "@",
          site: "@",
          cardType: "summary_large_image"
        }}
      /> */}

      <div className="antialiased text-gray-800 dark:bg-black dark:text-gray-100">
        <Navbar {...props} />
        <div>{children}</div>

        {/* <Chatbot /> */}
        <ChatBot />
        <Footer {...props} />
      </div>
    </>
  );
}

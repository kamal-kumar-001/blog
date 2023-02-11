import Link from 'next/link';
import React from 'react';
import Image from "next/image";
import { parseISO, format } from "date-fns";

const BlogList = ({ blogs, aspect }) => {
  const cx = (...classNames) =>
  classNames.filter(Boolean).join(" ");
  return (
    <>
      {/* <div className="grid gap-10 mt-10 lg:gap-10 md:grid-cols-2 xl:grid-cols-3 "> */}
      {blogs && blogs.length > 0 && blogs.map(blog => (
        <div key={blog._id} className="cursor-pointer link-effect">
          <div className={cx(
            "relative overflow-hidden transition-all bg-gray-100 rounded-md dark:bg-gray-800    hover:scale-105",
            aspect === "landscape" ? "aspect-video" : "aspect-square"
          )}>
            <Link  href={`/blog/${blog.slug}`} >
              <Image
                src={blog.img}
                // loader="filled"
                // blurDataURL={imageProps.blurDataURL}
                alt={"Thumbnail"}
                // placeholder="blur"
                // layout="fill"
                // objectFit="cover"
                className="transition-all object-cover h-full w-full"
                quality="50"
                  // priority
                  // loading="lazy"
                  sizes="(max-width: 768px) 30vw, 33vw"
                  fill
              />
            </Link>
          </div>
          <Link
            href={`/category/${blog.category.slug}`}
           >
              {/* <Label color={category.color}>{category.title}</Label> */}
              <span className="inline-block mt-5 text-xs font-medium tracking-wider uppercase ">
              {blog.category.name}
              </span>
          </Link>
          <h2 className="mt-2 text-lg font-semibold tracking-normal text-brand-primary dark:text-white">
            <Link href={`/blog/${blog.slug}`}>
              <span className=" bg-gradient-to-r from-green-200 to-green-100 dark:from-purple-800 dark:to-purple-900 bg-[length:0px_10px] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 hover:bg-[length:100%_3px] group-hover:bg-[length:100%_10px]">
                {blog.title}
              </span>
            </Link>
          </h2>
          <Link href={`/blog/${blog.slug}`}>
              <p className="leading-relaxed mb-3" >{blog.metaContent}</p>
              </Link>

          <div className="hidden">
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-300  line-clamp-3">
              <Link href={`/blog/${blog.slug}`}>
              {blog.metaContent.string ? blog.metaContent.string.slice(0,30) : ""}
              </Link>
            </p>
        </div>

          <div className="flex items-center mt-3 space-x-3 text-gray-500 dark:text-gray-100 ">
            <div className="flex items-center gap-3">
              <div className="relative flex-shrink-0 w-5 h-5">
                <Image
                  src={blog.user.img}
                  // blurDataURL={AuthorimageProps.blurDataURL}
                  // loader={AuthorimageProps.loader}
                  // objectFit="cover"
                  alt={blog.user.name}
                  // placeholder="blur"
                  className="rounded-full"
                  sizes="(max-width: 640px) 640px, 100vw"
                  fill
                />
              </div>
              <span className="text-sm">{blog.user.name}</span>
            </div>
            <span className="text-xs text-gray-300 dark:text-gray-600">
              &bull;
            </span>
            <time
              className="text-sm"
              dateTime={blog.updatedAt}>
              {format(
              parseISO( blog.updatedAt),
              "MMMM dd, yyyy"
            )}
            </time>
          </div>
        </div>
      ))}
            {/* </div> */}
    </>
  );
};
export default BlogList;




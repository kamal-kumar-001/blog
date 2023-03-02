import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';


const Tabs = ({ categories }) => {
    const router = useRouter();

    const isActiveLink = (category) => {
        return category.slug === router.query.category;
    };

    return (
        <>
        <style>{`
      .scroll-hidden::-webkit-scrollbar {
        height: 0px;
        background: transparent; /* make scrollbar transparent */
      }
      `}
</style>
        <div className="  overflow-x-auto  mb-8  bg-white dark:bg-black  border-b-2 border-gray-100 dark:border-gray-800 scroll-hidden sticky top-12 z-10 md:top-16">
            <ul className="flex items-center container px-6 mx-auto w-max md:w-auto">
                <li
                    className={
                        'mr-6 py-3  rounded-sm ' + `${ router.asPath === '/blog'  ? ' text-primary dark:text-white' : ' text-gray-400' }`
                    }>
                    <Link href="/blog">All</Link>
                </li>
                {categories && categories.length > 0 && categories.map((category) => {
                    return (
                        <li
                            key={category._id}
                            className={
                                'mr-6 py-3  rounded-sm ' +
                                `${
                                    isActiveLink(category)
                                        ? ' text-primary dark:text-white'
                                        : ' text-gray-400'
                                }`
                            }>
                            <Link
                                href={`/category/${category.slug}`}>
                                {category.name}
                            </Link>
                        </li>
                    );
                })}

            </ul>
        </div>
        </>
    );
};






export default Tabs;

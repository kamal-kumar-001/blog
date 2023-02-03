import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
// import mongoose from 'mongoose';
// import Category from '../models/Category';


const Tabs = ({ categories }) => {
// const Tabs = ({ categories, handleOnSearch }: CategoryProps) => {
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
        <div className=" left-0 right-0 overflow-x-auto  mb-8 flex items-center bg-white dark:bg-black justify-between pt-2 border-b-2 border-gray-100 dark:border-gray-800 scroll-hidden sticky top-12 z-10 md:top-16">
            <ul className="flex items-center container px-6 mx-auto">
                <li
                    className={
                        'mr-6 pb-6  rounded-sm ' +
                        `${
                            router.pathname === '/'
                                ? ' text-primary'
                                : ' text-gray-400'
                        }`
                    }>
                    <Link href="/">Recent</Link>
                </li>
                {categories && categories.length > 0 && categories.map((category) => {
                    return (
                        <li
                            key={category._id}
                            className={
                                'mr-6 pb-6  rounded-sm ' +
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

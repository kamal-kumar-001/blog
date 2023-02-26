
import NewsLetter from './NewsLetter'
import {FiInstagram, FiFacebook} from 'react-icons/fi'
import {FaGithub, FaTwitter} from 'react-icons/fa'

export default function Footer(props) {
  return (
    <div className="footer mt-10 border-t border-gray-100 dark:border-gray-800">
      <NewsLetter />
      <div className="text-gray-600 bg-white body-font dark:bg-gray-900 dark:text-white ">
      <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
      <div className="flex title-font font-medium items-center md:justify-start justify-center text-gray-900 dark:text-gray-200">
      <div className="ml-3 text-xl">Kamal</div>
      </div>
      <p className="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 mt-4 md:mt-2 mb-2 md:mb-0 text-center dark:text-gray-400">
        Copyright © {new Date().getFullYear()}.  All rights reserved.
        </p>
      <div className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center items-center sm:justify-start" >
        <a href="https://www.facebook.com/" aria-label="facebook" target="_blank" rel="noreferrer" className="text-gray-500 dark:text-gray-300">
          <FiFacebook size={24} />
      </a>
      <a href="https://www.twitter.com/" aria-label="twitter" target="_blank" rel="noreferrer" className="ml-3 text-gray-500 dark:text-gray-300">
          <FaTwitter size={24} />
        </a>
        <a href="https://www.instagram.com/" aria-label="instagram" target="_blank" rel="noreferrer" className="ml-3 text-gray-500 dark:text-gray-300">
          <FiInstagram size={24} />
        </a>
        <a href="https://www.github.com/" aria-label="github" target="_blank" rel="noreferrer" className="ml-3 text-gray-500 dark:text-gray-300">
          <FaGithub size={24} />
        </a>
        </div>
        </div>
      </div>
    </div>
  );
}

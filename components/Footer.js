
import NewsLetter from './NewsLetter'
import {FiInstagram, FiFacebook} from 'react-icons/fi'
import {FaGithub, FaTwitter} from 'react-icons/fa'

export default function Footer(props) {
  return (
    <div className="footer mt-10 border-t border-gray-100 dark:border-gray-800">
      <NewsLetter />
      <hr className="my-3 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-4" />
<div className="  dark:text-gray-300 py-5">
  <div className="container mx-auto">
    <div className="flex flex-wrap">
      <div className="w-1/2 md:w-1/4 px-4 mb-4 md:mb-0">
        <h4 className="font-bold text-lg mb-4">Company</h4>
        <ul>
          <li><a href="#" className="dark:hover:text-white">About Us</a></li>
          <li><a href="#" className="dark:hover:text-white">Contact Us</a></li>
          <li><a href="#" className="dark:hover:text-white">Careers</a></li>
        </ul>
      </div>
      <div className="w-1/2 md:w-1/4 px-4 mb-4 md:mb-0">
        <h4 className="font-bold text-lg mb-4">Services</h4>
        <ul>
          <li><a href="#" className="dark:hover:text-white">Web Design</a></li>
          <li><a href="#" className="dark:hover:text-white">Web Development</a></li>
          <li><a href="#" className="dark:hover:text-white">Mobile App Development</a></li>
        </ul>
      </div>
      <div className="w-1/2 md:w-1/4 px-4 mb-4 md:mb-0">
        <h4 className="font-bold text-lg mb-4">Connect </h4>
        <ul>
          <li><a href="#" className="dark:hover:text-white">Facebook</a></li>
          <li><a href="#" className="dark:hover:text-white">Twitter</a></li>
          <li><a href="#" className="dark:hover:text-white">LinkedIn</a></li>
        </ul>
      </div>
      <div className="w-1/2 md:w-1/4 px-4 mb-4 md:mb-0">
        <h4 className="font-bold text-lg mb-4">LEGAL </h4>
        <ul>
          <li><a href="#" className="dark:hover:text-white">Privacy Policy</a></li>
          <li><a href="#" className="dark:hover:text-white">Terms & Conditions</a></li>
        </ul>
      </div>

    </div>
    <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
    <div className="flex flex-wrap  items-center justify-evenly">
        <span className="w-full md:lg:w-1/3 text-sm text-gray-500 text-center dark:text-gray-400">© {new Date().getFullYear()} <a href="#" className="hover:underline">Website</a>. All Rights Reserved.
        </span>
        <div className='w-full md:lg:w-1/3 text-center'>Logo</div>
        <div className="w-full md:lg:w-1/3 flex mt-4 space-x-6 justify-center ">
            <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
            <FiFacebook size={24} />
                <span className="sr-only">Facebook page</span>
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
            <FiInstagram size={24} />
                <span className="sr-only">Instagram page</span>
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
            <FaTwitter size={24} />
                <span className="sr-only">Twitter page</span>
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
            <FaGithub size={24} />
                <span className="sr-only">GitHub account</span>
            </a>
        </div>
    </div>
  </div>
</div>
    </div>
  );
}

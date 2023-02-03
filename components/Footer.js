
import NewsLetter from './NewsLetter'

export default function Footer(props) {
  return (
    <div className="footer mt-10 border-t border-gray-100 dark:border-gray-800">
      <NewsLetter />
      <div className="text-sm text-center">
        Copyright © {new Date().getFullYear()}. All
        rights reserved.
      </div>
      <div className="mt-1 text-sm text-center">
        Made by{" "}
        
        <a
          href="https://kamal-001.github.io"
          rel="noopener"
          target="_blank">
          Kamal
        </a><br />
      </div>
    </div>
  );
}

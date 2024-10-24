export default function Footer() {
  return (
    <footer className="bg-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center py-8">
          <div className="mb-4 md:mb-0">
            <p className="text-gray-600">
              &copy; {new Date().getFullYear()} Demo S3. All rights reserved.
            </p>
          </div>
          <div className="flex space-x-4">
            <a
              href="https://github.com/martinfiti"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-800"
            >
              <span className="sr-only">GitHub</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.483 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.34-3.369-1.34-.454-1.154-1.11-1.461-1.11-1.461-.908-.62.069-.607.069-.607 1.004.07 1.532 1.032 1.532 1.032.892 1.528 2.341 1.087 2.91.831.092-.647.35-1.087.636-1.337-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.646 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.91-1.294 2.75-1.025 2.75-1.025.544 1.376.201 2.393.099 2.646.64.699 1.029 1.592 1.029 2.683 0 3.842-2.337 4.687-4.565 4.935.36.31.682.92.682 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
            <a
              href="https://facebook.com/martin.fitipaldo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-800"
            >
              <span className="sr-only">Facebook</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
            <a
              href="https://linkedin.com/in/martin-fitipaldo-a68312185"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-gray-800"
            >
              <span className="sr-only">LinkedIn</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11.75 20h-3v-11h3v11zm-1.5-12.5c-.97 0-1.75-.78-1.75-1.75s.78-1.75 1.75-1.75 1.75.78 1.75 1.75-.78 1.75-1.75 1.75zm13.25 12.5h-3v-5.5c0-1.38-.56-2.5-2-2.5s-2 1.12-2 2.5v5.5h-3v-11h3v1.5c.44-.66 1.34-1.5 2.5-1.5 2.21 0 3.5 1.79 3.5 4v7z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function DocumentationLink() {
  return (
    <a 
      href="https://docs.base.org/wallet-app/introduction/mini-apps"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center w-full px-4 py-3 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100 font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 border border-gray-300 dark:border-gray-600"
    >
      <span className="mr-2">📖 View Documentation</span>
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
      </svg>
    </a>
  );
} 
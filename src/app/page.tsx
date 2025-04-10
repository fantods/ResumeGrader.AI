import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <main className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            ResumeGrader.AI
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-12">
            Helps you get your dream job by grading your resume and cover letter.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <a
              href="#"
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
            >
              Get Started
            </a>
            <a
              href="#"
              className="px-8 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 font-medium"
            >
              Learn More
            </a>
          </div>

          {/* 
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Modern Stack</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Built with Next.js, TypeScript, and React for optimal performance and type safety.
              </p>
            </div>
            <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Responsive Design</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Fully responsive layout that works beautifully on all devices.
              </p>
            </div>
            <div className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
              <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Best Practices</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Follows modern development practices and includes ESLint for code quality.
              </p>
            </div>
          </div> 
          */}

        </div>
      </main>
    </div>
  );
}

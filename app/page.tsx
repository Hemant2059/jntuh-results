'use client'

import Link from 'next/link'
import { GraduationCap, BookOpen, Users, BarChart2 } from 'lucide-react'

const resultPages = [
  { title: 'Academic Result Card', icon: GraduationCap, href: '/academic', color: 'bg-gray-100' },
  { title: 'Semester Result', icon: BookOpen, href: '/semester', color: 'bg-gray-200' },
  { title: 'Class Result', icon: Users, href: '/classResult', color: 'bg-gray-300' },
  { title: 'Comparison Result', icon: BarChart2, href: '/comparison', color: 'bg-gray-400' },
]

export default function Home() {
  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 py-12">
        
          <div className="text-center  mb-8">
            <h1 className="text-xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">Student Result Portal</h1>
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-300">Access your academic performance with ease</p>
          </div>
          <div className="mb-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-100 p-4 rounded-lg shadow-lg text-center mx-auto">
            <p className="text-base md:text-lg font-semibold">NOTE: This is not the JNTUH official website. Please refer to the official website for clarification.</p>
            <p className="text-base md:text-lg font-semibold">Click <a href="https://results.jntuh.ac.in/" target="_blank" rel="noopener noreferrer" className='underline'>
  Here
</a></p>
            
          </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {resultPages.map((page, index) => (
           
              <Link href={page.href} key={index}>
                <div className={`${page.color} dark:bg-gray-800 rounded-lg shadow-lg p-8 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl`}>
                  <div className="flex items-center justify-center mb-6">
                    <page.icon className="w-16 h-16 text-gray-700 dark:text-gray-300" />
                  </div>
                  <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-white mb-4">{page.title}</h2>
                  <div className="text-center">
                    <span className="inline-block bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full px-4 py-1 text-sm font-semibold hover:bg-gray-100 dark:hover:bg-gray-600 transition duration-300">
                      View Results
                    </span>
                  </div>
                </div>
              </Link>
          ))}
        </div>
      </div>
      <footer className="mt-16 text-center text-gray-600 dark:text-gray-400 pb-8">
        <p>&copy; 2025 Student Result Portal</p>
      </footer>
    </div>
  )
}


import Link from 'next/link'
import { GraduationCap, BookOpen, Users } from 'lucide-react'

const resultPages = [
  { title: 'Class Result Compare', icon: GraduationCap, href: '/comparison/class-performance', color: 'bg-gray-100' },
  { title: 'SubjectWise Compare', icon: BookOpen, href: '/comparison/subject-comparison', color: 'bg-gray-200' },
  { title: 'Students Result Compare', icon: Users, href: '/comparison/student-comparison', color: 'bg-gray-300' },
]

import site from '@/lib/site';

export const metadata = {
  title: `Comparison Results - ${site.title}`,
  description: 'Compare various JNTUH results such as student performance, class comparison, and subject comparison.',
  keywords: 'JNTUH, Comparison Results, Class Comparison, Student Comparison, Subject Comparison',
  openGraph: {
    title: `Comparison Results - ${site.openGraph.title}`,
    description: 'Compare various JNTUH results such as student performance, class comparison, and subject comparison.',
    url: `${site.url}/comparison`,
    siteName: site.openGraph.siteName,
    images: site.openGraph.images,
  },
  twitter: {
    card: site.twitter.card,
    title: `Comparison Results - ${site.twitter.title}`,
    description: 'Compare results across different parameters like students, classes, and subjects.',
    image: site.twitter.image,
    site: site.twitter.site,
  },
  canonical: `${site.url}/comparison`,
};

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-12">
        <header className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-800 dark:text-white mb-4">Result Comparison Portal</h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">Compare your academic performance with ease</p>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {resultPages.map((page) => (
            <Link key={page.title} href={page.href}>
              <div className={`${page.color} dark:bg-gray-800 rounded-lg shadow-lg p-8 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl`}>
                <div className="flex items-center justify-center mb-6">
                  <page.icon className="w-16 h-16 text-gray-700 dark:text-gray-300" />
                </div>
                <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-white">{page.title}</h2>
                <div className="mt-4 text-center">
                  <span className="inline-block bg-white text-gray-700 rounded-full px-4 py-1 text-sm font-semibold dark:bg-gray-700 dark:text-gray-300">
                    View Results
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <footer className="mt-16 text-center text-gray-600 dark:text-gray-400">
        <p>&copy; 2023 Student Result Portal. All rights reserved.</p>
      </footer>
    </div>
  )
}

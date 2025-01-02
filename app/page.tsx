import Link from 'next/link'
import { GraduationCap, BookOpen, Users, BarChart2 } from 'lucide-react'
import Image from 'next/image'

const resultPages = [
  { title: 'Academic Result Card', icon: GraduationCap, href: '/academic', color: 'bg-gray-100' },
  { title: 'Semester Result', icon: BookOpen, href: '/semester', color: 'bg-gray-200' },
  { title: 'Class Result', icon: Users, href: '/classResult', color: 'bg-gray-300' },
  { title: 'Comparison Result', icon: BarChart2, href: '/comparison', color: 'bg-gray-400' },
]

export default function Home() {
  return (
    <div className=" bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        <header className="text-center mb-10">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">Student Result Portal</h1>
          <p className="text-xl text-gray-600">Access your academic performance with ease</p>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {resultPages.map((page) => (
            <Link key={page.title} href={page.href}>
              <div className={`${page.color} rounded-lg shadow-lg p-8 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl`}>
                <div className="flex items-center justify-center mb-6">
                  <page.icon className="w-16 h-16 text-gray-700" />
                </div>
                <h2 className="text-2xl font-semibold text-center text-gray-800">{page.title}</h2>
                <div className="mt-4 text-center">
                  <span className="inline-block bg-white text-gray-700 rounded-full px-4 py-1 text-sm font-semibold">
                    View Results
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <footer className="mt-12 text-center text-gray-600">
        <p>&copy; 2023 Student Result Portal. All rights reserved.</p>
      </footer>
    </div>
  )
}


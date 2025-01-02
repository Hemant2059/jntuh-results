import React from 'react'
import AcademicForm from './AcademicForm'
// app/academic/page.tsx
import site from '@/lib/site';

export const metadata = {
  title: `Academic Results - ${site.title}`,
  description: 'View your JNTUH academic results with ease and track your progress over time.',
  keywords: 'JNTUH, Academic Results, Student Performance, University Results',
  openGraph: {
    title: `Academic Results - ${site.openGraph.title}`,
    description: 'View your JNTUH academic results with ease and track your progress over time.',
    url: `${site.url}/academic`,
    siteName: site.openGraph.siteName,
    images: site.openGraph.images,
  },
  twitter: {
    card: site.twitter.card,
    title: `Academic Results - ${site.twitter.title}`,
    description: 'Track your academic performance with JNTUH academic results.',
    image: site.twitter.image,
    site: site.twitter.site,
  },
  canonical: `${site.url}/academic`,
};


const academicResultPage = () => {
  return (
    <div><AcademicForm/></div>
  )
}

export default academicResultPage
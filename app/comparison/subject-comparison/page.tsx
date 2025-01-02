import React from 'react'
import SubjectForm from './SubjectComparisonForm'
// app/comparison/student-comparison/page.tsx
import site from '@/lib/site';

export const metadata = {
  title: `Student Comparison - ${site.title}`,
  description: 'Compare JNTUH academic results between different students.',
  keywords: 'JNTUH, Student Comparison, Performance Comparison, Academic Results',
  openGraph: {
    title: `Student Comparison - ${site.openGraph.title}`,
    description: 'Compare academic results of different students at JNTUH.',
    url: `${site.url}/comparison/student-comparison`,
    siteName: site.openGraph.siteName,
    images: site.openGraph.images,
  },
  twitter: {
    card: site.twitter.card,
    title: `Student Comparison - ${site.twitter.title}`,
    description: 'Compare academic performance between JNTUH students.',
    image: site.twitter.image,
    site: site.twitter.site,
  },
  canonical: `${site.url}/comparison/student-comparison`,
};


const subjectComaprisonPage = () => {
  return (
    <div><SubjectForm/></div>
  )
}

export default subjectComaprisonPage
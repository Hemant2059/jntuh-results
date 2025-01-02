import React from 'react'
import StudentComparisonForm from './StudentComparisonForm'
// app/comparison/subject-comparison/page.tsx
import site from '@/lib/site';

export const metadata = {
  title: `Subject Comparison - ${site.title}`,
  description: 'Compare academic results for different subjects at JNTUH.',
  keywords: 'JNTUH, Subject Comparison, Subject Performance, Academic Results',
  openGraph: {
    title: `Subject Comparison - ${site.openGraph.title}`,
    description: 'Compare subject-wise academic performance at JNTUH.',
    url: `${site.url}/comparison/subject-comparison`,
    siteName: site.openGraph.siteName,
    images: site.openGraph.images,
  },
  twitter: {
    card: site.twitter.card,
    title: `Subject Comparison - ${site.twitter.title}`,
    description: 'Compare subject-wise performance of students at JNTUH.',
    image: site.twitter.image,
    site: site.twitter.site,
  },
  canonical: `${site.url}/comparison/subject-comparison`,
};


const studentComparisonPage = () => {
  return (
    <div>
      <StudentComparisonForm/>
    </div>
  )
}

export default studentComparisonPage
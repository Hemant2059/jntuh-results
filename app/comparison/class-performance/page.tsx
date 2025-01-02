import React from 'react'
import ClassPerformanceForm from './PerformanceForm'
// app/comparison/class-comparison/page.tsx
import site from '@/lib/site';

export const metadata = {
  title: `Class Comparison - ${site.title}`,
  description: 'Compare the performance of different classes at JNTUH.',
  keywords: 'JNTUH, Class Comparison, Class Performance, Academic Results',
  openGraph: {
    title: `Class Comparison - ${site.openGraph.title}`,
    description: 'Compare class-wide academic results at JNTUH.',
    url: `${site.url}/comparison/class-comparison`,
    siteName: site.openGraph.siteName,
    images: site.openGraph.images,
  },
  twitter: {
    card: site.twitter.card,
    title: `Class Comparison - ${site.twitter.title}`,
    description: 'Compare the performance of different classes at JNTUH.',
    image: site.twitter.image,
    site: site.twitter.site,
  },
  canonical: `${site.url}/comparison/class-comparison`,
};


const classPerformancePage = () => {
  return (
    <div>
      <ClassPerformanceForm/>
    </div>
  )
}

export default classPerformancePage
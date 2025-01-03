import React from 'react'
import SemesterForm from './SemesterForm'
// app/semester/page.tsx
import site from '@/lib/site';

export const metadata = {
  title: `Semester Results - ${site.title}`,
  description: 'View your semester-wise JNTUH academic results.',
  keywords: 'JNTUH, Semester Results, Student Performance, University Results',
  openGraph: {
    title: `Semester Results - ${site.openGraph.title}`,
    description: 'View your JNTUH semester results and track academic progress.',
    url: `${site.url}/semester`,
    siteName: site.openGraph.siteName,
    images: site.openGraph.images,
  },
  twitter: {
    card: site.twitter.card,
    title: `Semester Results - ${site.twitter.title}`,
    description: 'Track your academic performance with JNTUH semester results.',
    image: site.twitter.image,
    site: site.twitter.site,
  },
  canonical: `${site.url}/semester`,
};


const semResultPage = () => {
  return (
    <div className='mt-20'><SemesterForm/></div>
  )
}

export default semResultPage
import React from 'react'
import ClassForm from './ClassForm'
// app/classResult/page.tsx
import site from '@/lib/site';

export const metadata = {
  title: `Class Results - ${site.title}`,
  description: 'View class-wide JNTUH results to compare overall student performance.',
  keywords: 'JNTUH, Class Results, University Performance, Class Comparison',
  openGraph: {
    title: `Class Results - ${site.openGraph.title}`,
    description: 'Compare class-wide results to understand overall performance in the class.',
    url: `${site.url}/classResult`,
    siteName: site.openGraph.siteName,
    images: site.openGraph.images,
  },
  twitter: {
    card: site.twitter.card,
    title: `Class Results - ${site.twitter.title}`,
    description: 'View and compare your JNTUH class results to assess the performance.',
    image: site.twitter.image,
    site: site.twitter.site,
  },
  canonical: `${site.url}/classResult`,
};


const academicResultPage = () => {
  return (
    <div><ClassForm/></div>
  )
}

export default academicResultPage
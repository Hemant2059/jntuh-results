// app/site.ts
export const site = {
    title: 'JNTUH Result Portal',
    description: 'Access your JNTUH academic, class, and semester results with ease. Compare and track student performance in just a click.',
    url: 'https://jntuhresultbp.vercel.app', // Your base website URL
    keywords: 'JNTUH, Result Portal, Academic Results, Class Results, Semester Results, Student Performance',
    author: 'Your Name or Organization',
  
    openGraph: {
      title: 'JNTUH Result Portal',
      description: 'Access and compare your academic, semester, and class results with ease.',
      siteName: 'JNTUH Result Portal',
      images: [
        {
          url: 'https://jntuhresultbp.vercel.app/image.png',
          width: 1200,
          height: 630,
          alt: 'JNTUH Result Portal Preview',
        },
      ],
    },
  
    twitter: {
      card: 'summary_large_image',
      title: 'JNTUH Result Portal',
      description: 'Easily access JNTUH results, compare student performance, and track progress.',
      image: 'https://jntuhresultbp.vercel.app/image.png',
      site: '@yourtwitterhandle',
    },
  
    robots: 'index, follow',
    canonical: 'https://jntuhresultbp.vercel.app',
  };
  
  export default site;
  
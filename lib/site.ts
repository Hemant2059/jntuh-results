// app/site.ts
export const site = {
    title: 'JNTUH Result Portal',
    description: 'Access your JNTUH academic, class, and semester results with ease. Compare and track student performance in just a click.',
    url: 'https://your-website-url.com', // Your base website URL
    keywords: 'JNTUH, Result Portal, Academic Results, Class Results, Semester Results, Student Performance',
    author: 'Your Name or Organization',
  
    openGraph: {
      title: 'JNTUH Result Portal',
      description: 'Access and compare your academic, semester, and class results with ease.',
      siteName: 'JNTUH Result Portal',
      images: [
        {
          url: 'https://your-website-url.com/image.png',
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
      image: 'https://your-website-url.com/assets/image.png',
      site: '@yourtwitterhandle',
    },
  
    robots: 'index, follow',
    canonical: 'https://your-website-url.com',
  };
  
  export default site;
  
import type { MetadataRoute } from 'next'
import site from '@/lib/site';

 
export default function sitemap(): MetadataRoute.Sitemap {
    const url = site.url
  return [
    {
      url: url,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 1,
    },
    {
      url: `${url}/academic`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },    
    {
      url: `${url}/classResult`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },    
    {
      url: `${url}/semester`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },    
    {
      url: `${url}/comparison`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },    
    {
      url: `${url}/comparison/class-performance`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },    
    {
      url: `${url}/comparison/student-comparison`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },    
    {
      url: `${url}/comparison/subject-comparison`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },    

  ]
}
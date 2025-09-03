import { AuthorData } from '@/components/blog/AuthorBio'

export const authors: Record<string, AuthorData> = {
  'lloyd-pilapil': {
    name: 'Lloyd Pilapil',
    title: 'Full Stack Developer',
    company: 'PixelMojo',
    bio: 'Passionate developer with expertise in modern web technologies, specializing in React, Next.js, and TypeScript. I love creating beautiful, performant applications that solve real-world problems.',
    avatar: '/authors/lloyd-pilapil.jpg', // You can add actual image later
    expertise: [
      'React & Next.js',
      'TypeScript',
      'Node.js',
      'UI/UX Design',
      'Performance Optimization'
    ],
    socialLinks: {
      linkedin: 'https://linkedin.com/in/lloydpilapil',
      github: 'https://github.com/lloydpilapil',
      twitter: 'https://twitter.com/lloydpilapil',
      website: 'https://lloydpilapil.com'
    }
  }
}

export function getAuthor(authorId: string): AuthorData {
  return authors[authorId] || authors['lloyd-pilapil']
}
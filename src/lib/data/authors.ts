import { AuthorData } from '@/components/blog/AuthorBio'

export const authors: Record<string, AuthorData> = {
  'lloyd-pilapil': {
    name: 'Lloyd Pilapil',
    title: 'Founder',
    company: 'Pixelmojo',
    bio: 'Lloyd Pilapil is the founder of Pixelmojo, a growth-driven design agency in the Philippines specializing in AI-powered marketing solutions. With over 20 years of experience in digital marketing and UI/UX design, Lloyd has helped scale startups and enterprises through strategic, measurable design and data-driven growth strategies. His expertise spans AI implementation, conversion optimization, and building scalable marketing systems that drive sustainable business growth.',
    avatar:
      'https://cdn.prod.website-files.com/66eac95a8aac68f7db1bd0c7/684d7867d893b153117e5400_lloyd-headshot.jpg',
    expertise: [
      'AI Marketing',
      'Growth Strategy',
      'UI/UX Design',
      'Conversion Optimization',
      'Digital Marketing',
      'Brand Strategy',
    ],
    socialLinks: {
      linkedin: 'https://linkedin.com/in/lloydpilapil',
      website: 'https://www.pixelmojo.io',
    },
  },
}

export function getAuthor(authorId: string): AuthorData {
  return authors[authorId] || authors['lloyd-pilapil']
}

import { AuthorData } from '@/components/blog/AuthorBio'

export const authors: Record<string, AuthorData> = {
  'lloyd-pilapil': {
    name: 'Lloyd Pilapil',
    title: 'Founder',
    company: 'Pixelmojo',
    bio: 'Lloyd Pilapil is the founder of Pixelmojo who turns AI, design, and growth strategy into revenue-grade systems. He is a hands-on problem solver obsessed with measurable outcomes and building marketing engines that compound.',
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

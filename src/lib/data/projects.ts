export interface Project {
  id: number
  title: string
  description: string
  technologies: string[]
  category: string
  image: string
  demoUrl: string
  githubUrl: string
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'E-commerce Platform',
    description:
      'A full-stack e-commerce solution built with Next.js and TypeScript featuring user authentication, payment processing, and admin dashboard.',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'PostgreSQL', 'Stripe'],
    category: 'Full Stack',
    image: '/project1.jpg',
    demoUrl: '#',
    githubUrl: '#',
  },
  {
    id: 2,
    title: 'Task Management App',
    description:
      'A collaborative task management application with real-time updates, team collaboration, and project tracking capabilities.',
    technologies: ['React', 'Node.js', 'Socket.io', 'MongoDB', 'Redis'],
    category: 'Web App',
    image: '/project2.jpg',
    demoUrl: '#',
    githubUrl: '#',
  },
  {
    id: 3,
    title: 'Weather Dashboard',
    description:
      'A responsive weather dashboard with location-based forecasts, interactive maps, and detailed weather analytics.',
    technologies: ['React', 'REST API', 'Chart.js', 'CSS3', 'PWA'],
    category: 'Frontend',
    image: '/project3.jpg',
    demoUrl: '#',
    githubUrl: '#',
  },
  {
    id: 4,
    title: 'Blog Platform',
    description: 'A modern blog platform with MDX support, content management, and SEO optimization for technical writers.',
    technologies: ['Next.js', 'MDX', 'Contentlayer', 'Vercel', 'Algolia'],
    category: 'Content',
    image: '/project4.jpg',
    demoUrl: '#',
    githubUrl: '#',
  },
  {
    id: 5,
    title: 'AI Chat Interface',
    description: 'An intelligent chat interface with AI-powered responses, conversation history, and customizable themes.',
    technologies: ['Next.js', 'OpenAI API', 'Supabase', 'TailwindCSS', 'Framer Motion'],
    category: 'AI/ML',
    image: '/project5.jpg',
    demoUrl: '#',
    githubUrl: '#',
  },
  {
    id: 6,
    title: 'Portfolio Website',
    description: 'This very portfolio website showcasing modern web development practices with performance optimization.',
    technologies: ['Next.js 15', 'TypeScript', 'Tailwind CSS', 'MDX', 'Vercel'],
    category: 'Portfolio',
    image: '/project6.jpg',
    demoUrl: '#',
    githubUrl: 'https://github.com/lloydpilapil/pixelmojo-2026',
  },
]
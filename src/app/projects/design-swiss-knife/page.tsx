import WorkPage, { generateWorkMetadata } from '@/components/WorkPage'
import { getAllWorks } from '@/data/works'
import { notFound } from 'next/navigation'

export async function generateMetadata() {
  const works = getAllWorks()
  const workData = works.find(
    work => work.slug === '/projects/design-swiss-knife'
  )

  if (!workData) {
    return {
      title: 'Design Swiss Knife | Pixelmojo',
      description: 'AI-powered Figma plugin case study',
    }
  }

  return generateWorkMetadata(workData)
}

export default function DesignSwissKnifePage() {
  const works = getAllWorks()
  const workData = works.find(
    work => work.slug === '/projects/design-swiss-knife'
  )

  if (!workData) {
    notFound()
  }

  return <WorkPage work={workData} />
}

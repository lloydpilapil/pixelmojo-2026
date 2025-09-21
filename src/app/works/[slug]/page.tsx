import WorkPage, { generateWorkMetadata } from '@/components/WorkPage'
import { getAllWorks } from '@/data/works'
import { notFound } from 'next/navigation'

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props) {
  const works = getAllWorks()
  const workData = works.find(work => work.slug === `/works/${params.slug}`)

  if (!workData) {
    return {
      title: 'Work Not Found',
      description: 'The requested work page could not be found.',
    }
  }

  return generateWorkMetadata(workData)
}

export default function WorkDetailPage({ params }: Props) {
  const works = getAllWorks()
  const workData = works.find(work => work.slug === `/works/${params.slug}`)

  if (!workData) {
    notFound()
  }

  return <WorkPage work={workData} />
}

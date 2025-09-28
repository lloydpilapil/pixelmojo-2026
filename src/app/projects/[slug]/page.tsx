import WorkPage, { generateWorkMetadata } from '@/components/WorkPage'
import { getAllWorks } from '@/data/works'
import { notFound } from 'next/navigation'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const works = getAllWorks()
  const workData = works.find(work => work.slug === `/projects/${slug}`)

  if (!workData) {
    return {
      title: 'Work Not Found',
      description: 'The requested work page could not be found.',
    }
  }

  return generateWorkMetadata(workData)
}

export default async function WorkDetailPage({ params }: Props) {
  const { slug } = await params
  const works = getAllWorks()
  const workData = works.find(work => work.slug === `/projects/${slug}`)

  if (!workData) {
    notFound()
  }

  return <WorkPage work={workData} />
}

import ServicePage, { generateServiceMetadata } from '@/components/ServicePage'
import { getServiceData } from '@/data/services'
import { notFound } from 'next/navigation'

const serviceData = getServiceData('full-stack-ai')

if (!serviceData) {
  notFound()
}

export const metadata = generateServiceMetadata(serviceData)

export default function FullStackAI() {
  return <ServicePage service={serviceData!} />
}

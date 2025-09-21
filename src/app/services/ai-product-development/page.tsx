import ServicePage, { generateServiceMetadata } from '@/components/ServicePage'
import { getServiceData } from '@/data/services'
import { notFound } from 'next/navigation'

const serviceData = getServiceData('ai-product-development')

if (!serviceData) {
  notFound()
}

export const metadata = generateServiceMetadata(serviceData)

export default function AIProductDevelopment() {
  return <ServicePage service={serviceData!} />
}

import ServicePage, { generateServiceMetadata } from '@/components/ServicePage'
import { getServiceData } from '@/data/services'
import { notFound } from 'next/navigation'

const serviceData = getServiceData('revenue-first-design')

if (!serviceData) {
  notFound()
}

export const metadata = generateServiceMetadata(serviceData)

export default function RevenueFirstDesign() {
  return <ServicePage service={serviceData!} />
}

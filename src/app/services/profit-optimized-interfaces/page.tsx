import ServicePage, { generateServiceMetadata } from '@/components/ServicePage'
import { getServiceData } from '@/data/services'
import { notFound } from 'next/navigation'

const serviceData = getServiceData('profit-optimized-interfaces')

if (!serviceData) {
  notFound()
}

export const metadata = generateServiceMetadata(serviceData)

export default function ProfitOptimizedInterfaces() {
  return <ServicePage service={serviceData!} />
}

import ServicePage, { generateServiceMetadata } from '@/components/ServicePage'
import { getServiceData } from '@/data/services'
import { notFound } from 'next/navigation'

const serviceData = getServiceData('conversion-assets')

if (!serviceData) {
  notFound()
}

export const metadata = generateServiceMetadata(serviceData)

export default function ConversionAssets() {
  return <ServicePage service={serviceData!} />
}

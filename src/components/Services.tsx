interface ServiceProps {
  icon: React.ReactNode
  title: string
  description: string
}

interface ServicesProps {
  title?: string
  description?: string
  services: ServiceProps[]
}

function ServiceCard({ icon, title, description }: ServiceProps) {
  return (
    <div className='card text-center p-8 hover:shadow-lg transition-shadow'>
      <div className='w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6'>
        {icon}
      </div>
      <h3 className='mb-4'>{title}</h3>
      <p className='text-muted'>{description}</p>
    </div>
  )
}

export default function Services({ 
  title = 'What We Do', 
  description = 'Specialized in creating digital experiences that matter',
  services 
}: ServicesProps) {
  return (
    <section className='mb-20'>
      <div className='text-center mb-12'>
        <h2 className='mb-4'>{title}</h2>
        <p className='text-muted'>{description}</p>
      </div>
      <div className='grid md:grid-cols-3 gap-8'>
        {services.map((service, index) => (
          <ServiceCard
            key={index}
            icon={service.icon}
            title={service.title}
            description={service.description}
          />
        ))}
      </div>
    </section>
  )
}
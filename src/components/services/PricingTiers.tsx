'use client'

import React from 'react'
import { Check } from 'lucide-react'
import servicesData from '@/data/services-knowledge.json'
import type { ServiceTheme } from '@/utils/serviceThemes'

interface PricingTiersProps {
  serviceType:
    | 'ai-product-development'
    | 'ai-powered-growth'
    | 'full-stack-ai'
    | 'conversion-assets'
    | 'profit-optimized-interfaces'
    | 'revenue-first-design'
  theme: ServiceTheme
}

export default function PricingTiers({
  serviceType,
  theme,
}: PricingTiersProps) {
  const service = servicesData.services[serviceType]
  if (!service) return null

  const packages = service.packages as Record<
    string,
    {
      price: string
      timeline: string
      best_for: string
      deliverables: string[]
      popular?: boolean
      value_note?: string
    }
  >
  const packageKeys = Object.keys(packages)

  return (
    <section className='space-y-8' aria-labelledby='pricing-heading'>
      <div className='max-w-3xl'>
        <h2
          id='pricing-heading'
          className='text-3xl font-semibold md:text-4xl'
          style={{ color: theme.textColor }}
        >
          Pricing & Packages
        </h2>
        <p
          className='mt-4 text-base md:text-lg leading-relaxed'
          style={{ color: theme.mutedTextColor }}
        >
          Choose the package that fits your needs. All packages include
          post-launch support.
        </p>
      </div>

      {/* 3-Tier Pricing Grid */}
      <div className='grid gap-6 md:grid-cols-3'>
        {packageKeys.map(key => {
          const pkg = packages[key]
          const isPopular = pkg.popular === true
          const tierName = key.charAt(0).toUpperCase() + key.slice(1)

          return (
            <div
              key={key}
              className='relative rounded-2xl border-2 p-8 transition-all hover:scale-105 focus-within:ring-2 focus-within:ring-offset-2'
              style={
                {
                  borderColor: isPopular ? theme.textColor : theme.border,
                  backgroundColor: isPopular
                    ? 'rgba(0, 0, 0, 0.05)'
                    : 'rgba(0, 0, 0, 0.02)',
                  '--tw-ring-color': theme.textColor,
                } as React.CSSProperties
              }
              role='article'
              aria-label={`${tierName} pricing package`}
            >
              {/* Popular Badge */}
              {isPopular && (
                <div
                  className='absolute -top-3 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-wider shadow-sm'
                  style={{
                    backgroundColor: theme.textColor,
                    color: theme.bg,
                  }}
                  role='status'
                  aria-label='Most popular package'
                >
                  Most Popular
                </div>
              )}

              {/* Package Header */}
              <div className='mb-6'>
                <h3
                  className='text-sm font-semibold uppercase tracking-wider'
                  style={{ color: theme.mutedTextColor }}
                >
                  {tierName}
                </h3>
                <div className='mt-2'>
                  <span
                    className='text-3xl font-bold'
                    style={{ color: theme.textColor }}
                  >
                    {pkg.price}
                  </span>
                </div>
                {pkg.value_note && (
                  <p
                    className='mt-2 text-sm font-semibold'
                    style={{ color: theme.textColor }}
                    role='note'
                    aria-label='Value highlight'
                  >
                    {pkg.value_note}
                  </p>
                )}
                <p
                  className='mt-2 text-sm leading-relaxed'
                  style={{ color: theme.mutedTextColor }}
                >
                  {pkg.best_for}
                </p>
              </div>

              {/* Deliverables */}
              <ul
                className='mb-6 space-y-3'
                role='list'
                aria-label='Package deliverables'
              >
                {pkg.deliverables.map((item: string, i: number) => (
                  <li key={i} className='flex gap-2'>
                    <Check
                      className='mt-0.5 h-5 w-5 flex-shrink-0'
                      style={{ color: theme.textColor }}
                      aria-hidden='true'
                    />
                    <span
                      className='text-sm leading-relaxed'
                      style={{ color: theme.textColor }}
                    >
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Timeline */}
              <div
                className='border-t pt-4'
                style={{ borderColor: theme.border }}
              >
                <p
                  className='text-sm font-medium'
                  style={{ color: theme.mutedTextColor }}
                >
                  <span className='sr-only'>Estimated </span>Timeline:{' '}
                  <strong style={{ color: theme.textColor }}>
                    {pkg.timeline}
                  </strong>
                </p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Comparison Table */}
      {servicesData.comparison_table && (
        <div
          className='mt-12 rounded-2xl border p-8'
          style={{
            borderColor: theme.border,
            backgroundColor: 'rgba(0, 0, 0, 0.02)',
          }}
        >
          <h3
            className='mb-2 text-2xl font-semibold'
            style={{ color: theme.textColor }}
          >
            {servicesData.comparison_table.title}
          </h3>
          <p
            className='mb-6 text-sm leading-relaxed'
            style={{ color: theme.mutedTextColor }}
          >
            {servicesData.comparison_table.subtitle}
          </p>

          <div className='grid gap-6 md:grid-cols-2'>
            {servicesData.comparison_table.columns.map((column, index) => (
              <div
                key={index}
                className='rounded-xl border p-6'
                style={{
                  borderColor: column.highlight
                    ? theme.textColor
                    : theme.border,
                  backgroundColor: column.highlight
                    ? 'rgba(0, 0, 0, 0.05)'
                    : 'rgba(0, 0, 0, 0.02)',
                }}
                role='article'
                aria-label={column.label}
              >
                <h4
                  className='mb-4 text-lg font-semibold'
                  style={{ color: theme.textColor }}
                >
                  {column.label}
                </h4>
                <ul className='space-y-2' role='list'>
                  {column.items.map((item, i) => (
                    <li
                      key={i}
                      className='text-sm leading-relaxed'
                      style={{ color: theme.textColor }}
                    >
                      • {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Savings Example */}
          {servicesData.comparison_table.savings_example && (
            <div
              className='mt-6 rounded-xl border p-6 text-center'
              style={{
                borderColor: theme.textColor,
                backgroundColor: 'rgba(0, 0, 0, 0.05)',
              }}
            >
              <h4
                className='mb-3 text-lg font-semibold'
                style={{ color: theme.textColor }}
              >
                {servicesData.comparison_table.savings_example.title}
              </h4>
              <div className='flex flex-col items-center gap-2 md:flex-row md:justify-center md:gap-6'>
                <div>
                  <span
                    className='text-sm line-through'
                    style={{ color: theme.mutedTextColor }}
                  >
                    {servicesData.comparison_table.savings_example.traditional}
                  </span>
                </div>
                <div>
                  <span
                    className='text-2xl font-bold'
                    style={{ color: theme.textColor }}
                  >
                    {servicesData.comparison_table.savings_example.pixelmojo}
                  </span>
                </div>
                <div>
                  <span
                    className='text-sm font-semibold'
                    style={{ color: theme.textColor }}
                  >
                    {servicesData.comparison_table.savings_example.savings}{' '}
                    saved
                  </span>
                </div>
              </div>
              <p
                className='mt-2 text-sm leading-relaxed'
                style={{ color: theme.mutedTextColor }}
              >
                {servicesData.comparison_table.savings_example.note}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Free Strategy Call CTA */}
      {servicesData.free_roi_audit && (
        <div
          className='rounded-2xl border-2 p-10 text-center'
          style={{
            borderColor: theme.textColor,
            backgroundColor: 'rgba(0, 0, 0, 0.02)',
          }}
        >
          <h3
            className='mb-2 text-2xl font-semibold'
            style={{ color: theme.textColor }}
          >
            {servicesData.free_roi_audit.title}
          </h3>
          <p
            className='mb-4 text-lg leading-relaxed'
            style={{ color: theme.mutedTextColor }}
          >
            {servicesData.free_roi_audit.tagline}
          </p>
          <p
            className='mx-auto mb-6 max-w-2xl text-sm leading-relaxed'
            style={{ color: theme.mutedTextColor }}
          >
            {servicesData.free_roi_audit.description}
          </p>
          <a
            href='/contact-us'
            className='inline-flex items-center gap-2 rounded-lg px-6 py-3 font-semibold transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2'
            style={
              {
                backgroundColor: theme.textColor,
                color: theme.bg,
                border: `1px solid ${theme.textColor}`,
                '--tw-ring-color': theme.textColor,
              } as React.CSSProperties
            }
            aria-label={`${servicesData.free_roi_audit.cta} - Schedule a free 30-minute strategy call`}
          >
            {servicesData.free_roi_audit.cta} →
          </a>
        </div>
      )}

      {/* Philippines Startup Special */}
      {servicesData.ph_startup_special && (
        <div
          className='rounded-xl border p-6'
          style={{
            borderColor: theme.border,
            backgroundColor: 'rgba(0, 0, 0, 0.03)',
          }}
        >
          <h4 className='mb-2 font-semibold' style={{ color: theme.textColor }}>
            🇵🇭 {servicesData.ph_startup_special.title}
          </h4>
          <p
            className='mb-3 text-lg font-bold'
            style={{ color: theme.textColor }}
          >
            {servicesData.ph_startup_special.discount}
          </p>
          <p
            className='text-sm leading-relaxed'
            style={{ color: theme.mutedTextColor }}
          >
            {servicesData.ph_startup_special.note}
          </p>
        </div>
      )}
    </section>
  )
}

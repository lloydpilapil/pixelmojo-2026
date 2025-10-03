'use client'

import * as Sentry from '@sentry/nextjs'
import { useEffect } from 'react'

export default function SentryExamplePage() {
  useEffect(() => {
    // Send a test event on page load
    Sentry.captureMessage('Sentry Example Page Loaded', 'info')
  }, [])

  return (
    <div className='flex min-h-screen flex-col items-center justify-center gap-8 p-8'>
      <div className='max-w-2xl text-center'>
        <h1 className='mb-4 text-4xl font-bold'>
          Sentry Error Monitoring Test
        </h1>
        <p className='mb-8 text-lg text-gray-600'>
          Click the button below to trigger a test error that will be sent to
          Sentry.
        </p>
      </div>

      <div className='flex gap-4'>
        <button
          className='rounded-lg bg-red-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-red-700'
          onClick={() => {
            throw new Error('Sentry Test Error - Button Clicked!')
          }}
        >
          Trigger Test Error
        </button>

        <button
          className='rounded-lg bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700'
          onClick={() => {
            Sentry.captureMessage('Manual test message from button', 'info')
            alert('Test message sent to Sentry!')
          }}
        >
          Send Test Message
        </button>

        <button
          className='rounded-lg bg-purple-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-purple-700'
          onClick={() => {
            Sentry.captureException(
              new Error('Manually captured exception from test page')
            )
            alert('Exception sent to Sentry!')
          }}
        >
          Capture Exception
        </button>
      </div>

      <div className='mt-8 max-w-2xl rounded-lg bg-gray-100 p-6'>
        <h2 className='mb-3 text-xl font-semibold'>What happens:</h2>
        <ul className='space-y-2 text-left text-gray-700'>
          <li>
            ✓ <strong>Red Button:</strong> Throws an uncaught error (shows error
            boundary)
          </li>
          <li>
            ✓ <strong>Blue Button:</strong> Sends an info message to Sentry
          </li>
          <li>
            ✓ <strong>Purple Button:</strong> Manually captures an exception
          </li>
          <li>✓ All events will appear in your Sentry dashboard</li>
        </ul>
      </div>

      <a
        href='https://sentry.io/organizations/pixelmojo/projects/pixelmojo-site/'
        target='_blank'
        rel='noopener noreferrer'
        className='mt-4 text-blue-600 underline hover:text-blue-800'
      >
        → View Events in Sentry Dashboard
      </a>
    </div>
  )
}

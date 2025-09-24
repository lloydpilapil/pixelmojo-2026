#!/usr/bin/env node

// Script to populate Edge Config with initial values
// Run: node scripts/setup-edge-config.mjs

const EDGE_CONFIG_ID = 'ecfg_jfilueabwlhmzf0wgto4k8s2nnqq';
const TOKEN = 'your_vercel_api_token_here'; // Replace with your Vercel API token

const items = {
  'maintenance-mode': false,
  'ai-feature-enabled': true,
  'new-pricing-enabled': false,
  'contact-form-enabled': true,
  'featured-services': [
    'AI Product Development',
    'Revenue-First Design Systems',
    'Profit-Optimized Interfaces'
  ],
  'hero-variant': 'default', // options: default, ai-focused, results-focused
  'testimonial-rotation': [
    'testimonial-1',
    'testimonial-2',
    'testimonial-3'
  ],
  'special-offer-banner': {
    enabled: true,
    message: '🚀 Limited Time: Free consultation for new clients!',
    link: '/contact-us'
  },
  'contact-response-time': '24 hours',
  'current-availability': 'available', // options: available, booking-fast, waitlist
  'emergency-message': {
    enabled: false,
    message: '',
    type: 'info'
  }
};

async function updateEdgeConfig() {
  console.log('🔧 Setting up Edge Config items...\n');

  for (const [key, value] of Object.entries(items)) {
    try {
      const response = await fetch(
        `https://api.vercel.com/v1/edge-config/${EDGE_CONFIG_ID}/items`,
        {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${process.env.VERCEL_API_TOKEN || TOKEN}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            items: [
              {
                operation: 'upsert',
                key,
                value,
              },
            ],
          }),
        }
      );

      if (!response.ok) {
        const error = await response.text();
        console.error(`❌ Failed to set ${key}:`, error);
      } else {
        console.log(`✅ Set ${key}: ${JSON.stringify(value).substring(0, 50)}...`);
      }
    } catch (error) {
      console.error(`❌ Error setting ${key}:`, error.message);
    }
  }

  console.log('\n✨ Edge Config setup complete!');
  console.log(`\n📍 Test your config at: https://pixelmojo-2026-gamma.vercel.app/edge-config-test`);
}

// Note: You need a Vercel API token to write to Edge Config
console.log(`
⚠️  To use this script, you need a Vercel API token:

1. Go to: https://vercel.com/account/tokens
2. Create a new token with "Full Access"
3. Run this script with: VERCEL_API_TOKEN=your_token node scripts/setup-edge-config.mjs

Or update the TOKEN constant in this file with your API token.
`);

// Run the setup
updateEdgeConfig();
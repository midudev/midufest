import { defineConfig } from 'astro/config'

import vercel from '@astrojs/vercel/serverless'
import tailwind from '@astrojs/tailwind'
import preact from '@astrojs/preact'

export default defineConfig({
	output: 'server',
	adapter: vercel(),
	integrations: [tailwind(), preact()]
})

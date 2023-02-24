import { defineConfig } from 'astro/config'
import vercel from '@astrojs/vercel/serverless'

// https://astro.build/config
import tailwind from '@astrojs/tailwind'

// https://astro.build/config
import preact from '@astrojs/preact'

// https://astro.build/config

// https://astro.build/config
export default defineConfig({
	output: 'server',
	adapter: vercel(),
	integrations: [tailwind(), preact()]
})

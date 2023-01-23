const defaultTheme = require('tailwindcss/defaultTheme') // eslint-disable-line

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			fontFamily: ['Montserrat', ...defaultTheme.fontFamily.sans]
		}
	},
	plugins: []
}

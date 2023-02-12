const { withAnimations } = require('animated-tailwindcss') // eslint-disable-line
const defaultTheme = require('tailwindcss/defaultTheme') // eslint-disable-line

/** @type {import('tailwindcss').Config} */
module.exports = withAnimations({
	content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
	theme: {
		extend: {
			colors: {
				primary: '#FFD200',
				// color 111111 con 50% de opacidad
				gray: 'rgba(17, 17, 17, 0.5)'
			},
			sans: {
				fontFamily: ['Montserrat', ...defaultTheme.fontFamily.sans]
			},
			screens: {
				medium: '468px',
				mobile: '411px',
				tablet: '721px',
				laptop: '890px'
			}
		}
	},
	plugins: []
})

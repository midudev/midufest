import { Resvg } from '@resvg/resvg-js'
import satori from 'satori'
import { html } from 'satori-html'

export default async (req, res) => {
	const { username } = req

	console.log(username)

	const opts = {
		background: '#fff',
		fitTo: {
			mode: 'width',
			value: 2400
		}
	}

	const inter = await fetch('https://midu.dev/inter.ttf').then((res) =>
		res.arrayBuffer()
	)

	const markup = html`<div
		tw="flex bg-black w-full h-full items-center justify-center relative"
	>
		<img
			src="http://localhost:3000/ticket-background.svg"
			width="979"
			height="642"
			style="width: 979px; height: 642px;"
		/>
		<div tw="absolute inset-0 -top-[200px]  flex items-center justify-center">
			<img
				src="http://localhost:3000/ticket-logo.svg"
				width="672"
				height="168"
				style="width: 672px; height: 168px;"
			/>
		</div>

		<div
			tw="flex absolute italic absolute inset-0 top-[235px] max-w-full text-base mx-auto flex-row text-center gap-x-2 justify-center text-white text-xl font-bold"
			style="transform: rotate(-10deg);"
		>
			<strong>21 y 22 marzo</strong>
			<span tw="opacity-70 flex">
				Streaming en
				<a
					tw="font-semibold text-purple-400 hover:underline ml-1"
					href="https://twitch.tv/midudev"
				>
					twitch.tv/midudev
				</a>
			</span>
		</div>
	</div>`

	const svg = await satori(markup, {
		width: 1200,
		height: 630,
		fonts: [
			{
				name: 'Inter',
				data: inter,
				weight: 400,
				style: 'normal'
			}
		]
	})

	const resvg = new Resvg(svg, opts)

	const pngData = resvg.render()
	const pngBuffer = pngData.asPng()

	res.setHeader('Content-Type', 'image/png')
	res.status(200).send(pngBuffer)
}

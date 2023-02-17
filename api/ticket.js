import { Resvg } from '@resvg/resvg-js'
import satori from 'satori'
import { html } from 'satori-html'

export default async (req, res) => {
	const { username } = req

	const opts = {
		background: '#fff',
		fitTo: {
			mode: 'width',
			value: 2400
		}
	}

	const [fontExtraBold, fontRegular] = await Promise.all([
		fetch('https://midufest.com/Montserrat-ExtraBoldItalic.ttf').then((res) =>
			res.arrayBuffer()
		),
		fetch('https://midufest.com/Montserrat-Italic.ttf').then((res) =>
			res.arrayBuffer()
		)
	])

	const markup = html`<div
		tw="flex bg-black w-full h-full items-center justify-center relative"
	>
		<img
			src="http://midufest.com/ticket-background.svg"
			width="979"
			height="642"
			style="width: 979px; height: 642px;"
		/>
		<div tw="absolute inset-0 -top-[200px]  flex items-center justify-center">
			<img
				src="http://midufest.com/ticket-logo.svg"
				width="672"
				height="168"
				style="width: 672px; height: 168px;"
			/>
		</div>

		<div
			tw="flex absolute italic absolute inset-0 top-[335px] max-w-full text-base mx-auto flex-row text-center justify-center text-white text-3xl"
			style="transform: rotate(-10deg);"
		>
			<strong tw="mr-2 font-bold">21 y 22 marzo</strong>
			<span tw="mr-2">·</span>
			<span tw="opacity-80 flex mr-2">
				Streaming en
				<a
					tw="font-semibold text-purple-400 hover:underline ml-1"
					href="https://twitch.tv/midudev"
				>
					twitch.tv/midudev
				</a>
			</span>
		</div>

		<div
			tw="italic absolute left-55 bottom-[80px] flex flex-col justify-center text-center items-center text-white italic"
			style="transform: rotate(-10deg);"
		>
			<span tw="opacity-70 text-3xl"> Ticket number </span>
			<strong tw="text-5xl"> #00001 </strong>
		</div>

		<div
			tw="italic absolute left-2/4 bottom-[170px] right-0 w-[400px] mx-auto flex flex-row items-center justify-center text-right text-white text-xl"
			style="transform: rotate(-10deg);"
		>
			<div tw="flex flex-col text-right max-w-full text-3xl">
				<span tw="opacity-70"> Miguel Ángel Durán </span>
				<strong tw="font-semibold"> @midudev </strong>
			</div>
			<figure
				tw="ml-4 rounded-full w-22 h-22 bg-white flex justify-center items-center"
			>
				<img
					tw="w-21 h-21 objet-cover rounded-full"
					src="https://unavatar.io/github/${ogImage}"
				/>
			</figure>
		</div>
	</div>`

	const svg = await satori(markup, {
		width: 1200,
		height: 630,
		fonts: [
			{
				name: 'Montserrat',
				data: fontRegular,
				weight: 400,
				style: 'normal'
			},
			{
				name: 'Montserrat',
				data: fontExtraBold,
				weight: 800,
				style: 'normal'
			},
			{
				name: 'Montserrat',
				data: fontRegular,
				weight: 400,
				style: 'italic'
			},
			{
				name: 'Montserrat',
				data: fontExtraBold,
				weight: 800,
				style: 'italic'
			}
		]
	})

	const resvg = new Resvg(svg, opts)

	const pngData = resvg.render()
	const pngBuffer = pngData.asPng()

	res.setHeader('Content-Type', 'image/png')
	res.status(200).send(pngBuffer)
}

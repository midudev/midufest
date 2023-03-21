import { useEffect, useState } from 'preact/hooks'

export default function TwitchStream () {
	const [open, setOpen] = useState(true)
	const [show, setShow] = useState(false)

	useEffect(() => {
		setShow(true)
	}, [])

	if (!show) return <div></div>

	const { hostname } = document.location

	if (!open) return null

	return (
		<div className='p-2 bg-purple-500 rounded shadow-2xl fil shadow-purple-400/50 w-full'>
			<iframe className='aspect-video w-full md:w-96 h-auto' src={`https://player.twitch.tv/?channel=midudev&parent=${hostname}`} frameBorder='0' allowFullScreen scrolling='no'></iframe>
			<a className='block py-2 font-semibold text-center' href='https://twitch.tv/midudev' rel='noopener nofollow noreferrer' target='_blank'>
      ¡Ir a Twitch!
			</a>
		</div>
	)
}

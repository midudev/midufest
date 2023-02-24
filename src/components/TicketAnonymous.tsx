import { useEffect } from 'preact/hooks'
import { supabase } from 'src/utils/supabase'

const getURL = () => {
	const isProduction = import.meta.env.MODE === 'production'
	let url = isProduction
		? 'https://midufest.com#ticket'
		: 'http://localhost:3000#ticket'

	// Make sure to including trailing `/`.
	url = url.charAt(url.length - 1) === '/' ? url : `${url}/`
	return url
}

export function TicketAnonymous () {
	const handleClick = async () => {
		await supabase.auth.signInWithOAuth({
			provider: 'github',
			options: {
				redirectTo: getURL()
			}
		})
	}

	useEffect(() => {
		const el = document.getElementById('user-ticket')
		if (el) el.style.filter = 'blur(10px);'
	}, [])

	return (
		<>
			<button class='hover:bg-black hover:text-white font-bold tablet:text-4xl text-xl px-8 py-4 border-4 hover:border-primary rounded-full transition bg-primary border-black text-black shadow-2xl shadow-black' onClick={handleClick}>
				Conseguir ticket
			</button>
		</>
	)
}

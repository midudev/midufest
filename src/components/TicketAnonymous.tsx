import { useEffect } from 'preact/hooks'
import { supabase } from 'src/utils/supabase'

export function TicketAnonymous () {
	const handleClick = async () => {
		await supabase.auth.signInWithOAuth({ provider: 'github' })
	}

	useEffect(() => {
		const el = document.getElementById('user-ticket')
		if (el) el.style.filter = 'blur(10px);'
	}, [])

	return (
		<>
			<button class='hover:bg-black hover:text-white font-bold text-4xl px-8 py-4 border-4 hover:border-primary rounded-full transition bg-primary border-black text-black shadow-2xl shadow-black' onClick={handleClick}>
				Conseguir ticket
			</button>
		</>
	)
}

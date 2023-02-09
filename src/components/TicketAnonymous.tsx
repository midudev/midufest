import { useEffect } from 'preact/hooks'
import { supabase } from 'src/utils/supabase'

export function TicketAnonymous () {
	const handleClick = async () => {
		console.log('click')
		await supabase.auth.signInWithOAuth({ provider: 'github' })
	}

	useEffect(() => {
		const el = document.getElementById('user-ticket')
		if (el) el.style.filter = 'blur(10px);'
	}, [])

	return (
		<>
			<div class='absolute w-full h-full flex justify-center items-center top-10'>
				<button class='text-5xl p-4 border border-primary rounded-full' onClick={handleClick}>
				Conseguir ticket
				</button>
			</div>
		</>
	)
}

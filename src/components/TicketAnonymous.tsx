import { supabase } from 'src/utils/supabase'

export function TicketAnonymous () {
	const handleClick = async () => {
		console.log('click')
		await supabase.auth.signInWithOAuth({ provider: 'github' })
	}

	return (
		<>
			<div class='absolute z-10 top-7'>
				<button class='text-3xl border border-primary' onClick={handleClick}>
				Conseguir ticket
				</button>
			</div>
		</>
	)
}

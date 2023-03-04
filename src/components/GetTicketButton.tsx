import { supabase } from 'src/utils/supabase'

const getURL = () => {
	const isProduction = import.meta.env.MODE === 'production'
	return isProduction
		? 'https://midufest.com/?ticket'
		: 'http://localhost:3000/?ticket'
}

export function GetTicketButton () {
	const handleClick = async () => {
		try {
			sessionStorage.setItem('ticket', 'true')
		} catch (e) {}

		await supabase.auth.signInWithOAuth({
			provider: 'github',
			options: {
				redirectTo: getURL()
			}
		})
	}

	return (
		<div class='flex flex-col justify-center items-center text-white'>
			<button onClick={handleClick} className='px-6 py-2 z-10 opacity-[99%] font-semibold bg-primary border-2 border-black text-black rounded hover:scale-125 transition-all'>
			Consigue tu ticket
			</button>
			<span class='text-xs font-semibold'>¡Es gratis!</span>
		</div>
	)
}

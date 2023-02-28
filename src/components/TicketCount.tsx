import { useEffect } from 'preact/hooks'
import { useProgressiveNumber } from '@hooks/useProgressiveNumber'
import { supabase } from '@utils/supabase'

export const TicketCount = () => {
	const [tickets, setTickets] = useProgressiveNumber(0)

	useEffect(() => {
		async function fetchTickets () {
			const { count } = await supabase.from('tickets')
				.select('*', { count: 'exact', head: true })

			if (count) setTickets(count)
		}
		fetchTickets()
	}, [])

	return tickets.toFixed(0).toString().padStart(5, '0')
}

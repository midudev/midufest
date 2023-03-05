import { useEffect } from 'preact/hooks'
import { useProgressiveNumber } from '@hooks/useProgressiveNumber'
import { supabase } from '@utils/supabase'

export const TicketCount = () => {
	const [tickets, setTickets] = useProgressiveNumber(0)

	useEffect(() => {
		async function fetchTickets () {
			const { data } = await supabase.from('tickets')
				.select('number')
				.order('number', { ascending: false })
				.limit(1)

			const { number } = data?.[0] ?? { number: 1766 }

			if (number) setTickets(number)
		}
		fetchTickets()
	}, [])

	return tickets.toFixed(0).toString().padStart(5, '0')
}

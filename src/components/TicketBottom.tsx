import { TicketAnonymous } from './TicketAnonymous'
import { TicketUser } from './TicketUser'
import { useUser } from '@hooks/useUser'

export function TicketBottom () {
	const { user } = useUser()

	return user ? <TicketUser user={user} /> : <TicketAnonymous />
}

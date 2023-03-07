import { useEffect, useState } from 'preact/hooks'
import { supabase } from 'src/utils/supabase'
import { useUser } from './useUser.js'

type User = {
	avatar: string
	name: string
	username: string
	id: string,
	uuid: string
}

async function getTicketForUser (userName: string) {
	// read query param ticket from url
	const urlParams = new URLSearchParams(window.location.search)
	const userNameToUse = urlParams.get('ticket') || userName

	const { data } = await supabase.from('tickets').select().eq('user_name', userNameToUse).single()
	return data
}

export async function createTicketForUser (user: User) {
	// check if user has ticket
	const ticket = await getTicketForUser(user.username)
	if (ticket) return ticket

	const { data, error } = await supabase.from('tickets').insert(
		{
			user_id: user.uuid,
			user_name: user.username,
			user_fullname: user.name ?? user.username
		}).select()

	console.error(error)
	if (!error) {
		const [ticket] = data
		return ticket
	}
}

let creatingTicket = false

export function useTicket () {
	const { user } = useUser()
	const [ticket, setTicket] = useState(null)

	useEffect(() => {
		async function getTicket () {
			// read query param ticket from url
			const urlParams = new URLSearchParams(window.location.search)
			const ticketUser = urlParams.get('ticket')
			if (creatingTicket) return

			if (ticketUser) {
				const ticket = await getTicketForUser(ticketUser)
				setTicket(ticket)
			} else if (user) {
				creatingTicket = true
				const ticket = await createTicketForUser(user)
				setTicket(ticket)
				creatingTicket = false
			}
		}

		getTicket()
	}, [user])

	return { ticket }
}

import { supabase } from 'src/utils/supabase'
import { useEffect, useState } from 'preact/hooks'

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
	const userNameToUse = urlParams.get('ticket') ?? userName

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
			user_fullname: user.name
		}).select()

	console.log(error)
	return data
}

export const useUser = () => {
	const [user, setUser] = useState<User | null>(null)
	const [ticket, setTicket] = useState(null)

	useEffect(() => {
		async function getTicket () {
			if (user) {
				const ticket = await createTicketForUser(user)
				setTicket(ticket)
			}
		}

		getTicket()
	}, [user])

	useEffect(() => {
		async function getUser () {
			const { data: { user } } = await supabase.auth.getUser()
			if (!user) return setUser(null)

			const { identities, id: uuid } = user
			if (!identities || !identities.length) return setUser(null)

			const [github] = identities
			const { id, identity_data: data } = github
			const { avatar_url: avatar, name, user_name: username } = data
			const newUser = { avatar, name, username, id, uuid }
			setUser(newUser)
		}

		const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event) => {
			if (event === 'SIGNED_OUT') {
				setUser(null)
			}
		})

		getUser()

		return () => subscription?.unsubscribe()
	}, [])

	return { user, ticket }
}

import { supabase } from 'src/utils/supabase'
import { useEffect, useState } from 'preact/hooks'

type User = {
	avatar: string
	name: string
	username: string
	id: string
}

export const useUser = () => {
	const [user, setUser] = useState<User | null>(null)

	useEffect(() => {
		async function getUser () {
			const { data: { user } } = await supabase.auth.getUser()
			if (!user) return setUser(null)

			const { identities } = user
			if (!identities || !identities.length) return setUser(null)

			const [github] = identities
			const { id, identity_data: data } = github
			const { avatar_url: avatar, name, user_name: username } = data
			const newUser = { avatar, name, username, id }
			setUser(newUser)
		}

		getUser()
	}, [])

	return { user }
}

import { supabase } from 'src/utils/supabase'
import { useEffect, useState } from 'preact/hooks'

type User = {
	avatar: string
	name: string
	username: string
	id: string,
	uuid: string
}

export const useUser = () => {
	const [user, setUser] = useState<User | null>(null)


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

	return { user }
}

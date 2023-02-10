import { useUser } from '@hooks/useUser.js'
import { supabase } from 'src/utils/supabase.js'
import { Icons } from './Icons.js'

export function LogoutButton () {
	const { user } = useUser()

	if (!user) return null

	const handleClick = async () => {
		await supabase.auth.signOut()
	}

	return (
		<button class='flex gap-x-2 text-primary items-center' onClick={handleClick}>
			<Icons.logout />
			Cerrar sesión
		</button>
	)
}

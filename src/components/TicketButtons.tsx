import { useUser } from '@hooks/useUser'
import { atcb_action as addToCalendar } from 'add-to-calendar-button'
import { Icons } from '@components/Icons'
import type { ComponentChildren } from 'preact'

const TWITTER_TEXT = `¡Ya tengo mi ENTRADA para la #MiduFest!
Conferencia de Desarrollo y Programación Web.

¡Consigue el tuyo totalmente gratis! ⇩ https://midufest.com/ticket/midudev`

const TWITTER_URL = `https://twitter.com/intent/tweet?text=${encodeURIComponent(TWITTER_TEXT)}`

const Button = (
	{ children, onClick, type } :
	{ children: ComponentChildren, onClick: () => void, type?: string }
) => {
	const buttonClasses = type === 'twitter'
		? 'text-white border-[#1da1f2]/80 bg-[#1da1f2] hover:bg-[#1da1f2]/60 hover:bg-[#1da1f2]/90 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50'
		: 'text-primary hover:border-primary border-white/10 bg-zinc-900/90'

	return (
		<button
			class={`${buttonClasses} text-sm transition inline-flex items-center  font-semibold border rounded-lg px-6 py-3`}
			onClick={onClick}
		>
			{children}
		</button>
	)
}

export function TicketButtons () {
	const { user } = useUser()

	const handleAddCalendar = (e) => {
		const config = {
			name: 'miduFest - Conferencia de programación y desarrollo',
			description:
				'Entra a https://twitch.tv/midudev para disfrutar totalmente gratis de la conferencia.',
			startDate: '2023-03-21',
			startTime: '17:00',
			endDate: '2023-03-21',
			endTime: '22:00',
			timeZone: 'Europe/Madrid',
			location: 'https://midufest.com',
			buttonStyle: 'round',
			language: 'es',
			options: ['Google', 'Apple', 'iCal']
		}

		addToCalendar(config, e.target)
	}

	const handleCopyLink = () => {
		if (user?.username) {
			navigator.clipboard.writeText(
				`https://midufest.com/ticket/${user.username}`
			)
			import('https://cdn.skypack.dev/wc-toast').then(({ toast }) =>
				toast('Enlace copiado al portapapeles', {
					duration: 2000,
					icon: {
						type: 'success'
					}
				})
			)
		}
	}

	const handleTwitterShare = () => {
		window.open(TWITTER_URL)
	}

	if (!user) return null

	return (
		<footer class='flex justify-center items-center mt-10 gap-x-2'>
			<Button onClick={handleAddCalendar}>Añadir al calendario</Button>
			<Button onClick={handleCopyLink}>Copiar enlace</Button>
			<Button type='twitter' onClick={handleTwitterShare}>
				<Icons.twitter class='w-4 h-4 mr-2 -ml-1' /> Compartir en Twitter
			</Button>
		</footer>
	)
}

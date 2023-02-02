import { useUser } from '@hooks/useUser'
import { atcb_action } from 'add-to-calendar-button'

const Button = ({ children, onClick }: { children: string, onClick: any}) => {
	return (
		<button class='text-primary text-sm transition bg-zinc-900/90 font-semibold border hover:border-primary border-white/10 rounded-lg px-6 py-3' onClick={onClick}>
			{children}
		</button>
	)
}

export function TicketButtons () {
	const { user } = useUser()

	const handleAddCalendar = (e) => {
		const config = {
			name: 'miduFest - Conferencia de programación y desarrollo',
			description: 'Entra a https://twitch.tv/midudev para disfrutar totalmente gratis de la conferencia.',
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

		atcb_action(config, e.target)
	}

	const handleCopyLink = () => {
		if (user?.username) {
			navigator.clipboard.writeText(`https://midufest.com/ticket/${user.username}`)
			import('https://cdn.skypack.dev/wc-toast')
				.then(({ toast }) => toast('Enlace copiado al portapapeles', {
					duration: 2000,
					icon: {
						type: 'success'
					}
				}))
		}
	}

	const handleTwitterShare = () => {
		window.open('https://twitter.com/intent/tweet?text=%C2%A1Ya%20tengo%20mi%20ENTRADA%20para%20la%20%23MiduFest!%0AConferencia%20de%20Desarrollo%20y%20Programaci%C3%B3n%20Web.%0A%0A%C2%A1Consigue%20el%20tuyo%20totalmente%20gratis!%20%E2%87%A9&url=https%3A%2F%2Fmidufest.com%2Fticket%2Fmidudev')
	}

	if (!user) return null

	return (
		<footer class='flex justify-center items-center mt-10 gap-x-2'>
			<Button onClick={handleAddCalendar}>Añadir al calendario</Button>
			<Button onClick={handleCopyLink}>Copiar enlace</Button>
			<Button onClick={handleTwitterShare}>Compartir en Twitter</Button>
		</footer>
	)
}

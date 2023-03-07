export function Hour ({ hour } : { hour: string }) {
	const localHour = new Date(`2023-03-21T${hour}:00Z`)
	const zone = Intl.DateTimeFormat().resolvedOptions().timeZone

	const hourFormatted = localHour.toLocaleString('es-ES', {
		timeZone: zone,
		hour: 'numeric',
		minute: 'numeric'
	})

	return hourFormatted
}

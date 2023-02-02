import { useEffect, useState } from 'preact/hooks'

export function TicketUser({ user }: Object) {
	const [date, setDate] = useState<string>('')

	useEffect(() => {
		const d = new Date(1679414400000)
		const date = d.toLocaleTimeString('es-ES', {
			hour12: false,
			hour: '2-digit'
		})
		const diff = (new Date().getTimezoneOffset() / 60) * -1
		const gmt = diff > 0 ? `GMT+${diff}` : `GMT-${Math.abs(diff)}`
		const dateToRender = `${date}:00 ${gmt}`
		setDate(dateToRender)
	}, [])

	return (
		<>
			<div class='italic absolute inset-0 top-[235px] flex gap-x-2 justify-center -rotate-[10deg] [&>*]:before:mr-2 [&>*]:before:font-bold [&>span]:before:content-["·"]'>
				<strong data-atropos-offset='2'>21 marzo</strong>
				<span data-atropos-offset='2' class='opacity-70'>
					{date}
				</span>
				<span data-atropos-offset='2' class='opacity-70'>
					Streaming en{' '}
					<a
						class='font-semibold text-purple-400 hover:underline ml-1'
						href='https://twitch.tv/midudev'
					>
						twitch.tv/midudev
					</a>
				</span>
			</div>
			<div class='-rotate-[10deg] italic absolute left-24 bottom-16 flex flex-col justify-center text-center'>
				<span data-atropos-offset='10' class='opacity-70'>
					Ticket number
				</span>
				<strong data-atropos-offset='10' class='text-2xl'>
					#00001
				</strong>
			</div>
			<div class='italic absolute right-24 bottom-[120px] flex flex-row items-center justify-center text-center -rotate-[10deg] gap-x-4'>
				<div class='flex flex-col text-right'>
					<span data-atropos-offset='2' class='opacity-70'>
						{user.name}
					</span>
					<strong data-atropos-offset='2' class='font-semibold'>
						@{user.username}
					</strong>
				</div>
				<figure class='rotate-[10deg] -skew-x-6 border border-white rounded-full w-14 h-14 overflow-hidden'>
					<img data-atropos-offset='2' class='skew-x-6' src={user.avatar} />
				</figure>
			</div>
		</>
	)
}

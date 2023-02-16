import { useUser } from '@hooks/useUser.js'
import { useEffect, useState } from 'preact/hooks'
import { TicketAnonymous } from './TicketAnonymous.js'
import TicketLogo from './TicketLogo.js'
import type { AtroposInstance, Atropos } from 'atropos'
import { useWidth } from '@hooks/useWidth.js'
import TicketLayoutMobile from './TicketLayoutMobile.js'
import TicketLogoMobile from './TicketLogoMobile.js'


function TicketLayout () {
	return (
		<svg xmlns='http://www.w3.org/2000/svg' xmlSpace='preserve' id='Layer_1' x='0' y='0' style='enable-background:new 0 0 688 453' version='1.1' viewBox='0 0 688 453'><path d='M57.7 451.4c-7.1 1.3-13.4.7-18.8-1.6s-9.6-6.3-12.7-12.2c-3-5.9-4.6-13.5-4.6-22.9l.2-98.2c0-5.6-1.1-9.6-3.3-11.9s-5.3-3-9.2-2.3l-8.9 1.6.1-33.6 9-1.6c4.2-.8 7.4-2.6 9.4-5.5s2.9-7.2 2.9-12.9l.4-103.2c.1-13 3.1-23.1 8.7-30.4s14.9-12.1 27.8-14.4L630.4 2c7.1-1.3 13.4-.7 18.8 1.6s9.6 6.3 12.7 12.2c3 5.9 4.6 13.5 4.6 22.9l-.5 98.2c0 5.6 1.1 9.6 3.4 11.8 2.3 2.2 5.3 3 9 2.3l8.9-1.6.2 33.6-9 1.6c-4.2.8-7.4 2.6-9.4 5.5s-2.9 7.2-2.9 12.9l-.5 103.2c-.1 13-3 23.1-8.7 30.4s-14.9 12.1-27.8 14.4L57.7 451.4z' style='fill:#11111199;stroke:#222' /><path d='M646.6 307.3c-.1 6.8-1.7 12.5-4.8 17.1s-8.3 7.5-15.7 8.8L60.8 432.6c-5.9 1.1-10.8-.3-14.6-3.9-3.8-3.7-5.7-10.3-5.7-19.8l.4-95.7c0-8.3-1.5-14.2-4.7-17.9-3.2-3.7-7.5-5.5-13.1-5.6l-.1-13.2c4.5-1.6 8.1-3.6 10.6-5.9s4.4-5.4 5.6-9.2c1.2-3.8 1.8-8.8 1.8-15l.3-100.7c.1-6.8 1.7-12.5 4.9-17.1 3.2-4.6 8.4-7.5 15.6-8.8l565.4-99.4c5.9-1.1 10.8.3 14.6 3.9 3.8 3.7 5.7 10.3 5.7 19.8l-.4 95.7c0 8.3 1.5 14.2 4.7 17.9s7.5 5.5 13.1 5.6l.1 13.3c-4.4 1.4-7.9 3.3-10.6 5.6s-4.5 5.4-5.6 9.2-1.7 8.9-1.9 15.4l-.3 100.5zm5.3-100.6-.3 100.7c-.1 7.6-1.9 14.3-5.6 19.8-4.1 6.1-10.8 9.5-19 10.9L61.7 437.6c-7.3 1.3-13.8-.3-19-5.2-5.3-5.1-7.2-13.5-7.2-23.4l.4-95.7c0-7.9-1.5-12.3-3.5-14.6-2.1-2.4-5-3.8-9.4-3.8h-4.9L18 273l3.3-1.2c4.1-1.5 7-3.2 9-4.9 1.8-1.6 3.2-3.9 4.2-7 1-3.2 1.6-7.6 1.6-13.6l.3-100.7c.1-7.6 1.9-14.3 5.8-19.9 4.1-6 10.7-9.4 18.8-10.9l565.3-99.4c7.3-1.3 13.8.3 19 5.2 5.3 5.1 7.2 13.5 7.2 23.4l-.4 95.7c0 7.9 1.5 12.3 3.5 14.6 2.1 2.4 5 3.8 9.4 3.8h4.9l.1 21.9-3.5 1.1c-3.9 1.3-6.8 2.8-8.8 4.6-1.8 1.6-3.2 3.8-4.1 6.8-.9 3.4-1.5 8-1.7 14.2z' style='fill-rule:evenodd;clip-rule:evenodd;fill:#ffd200' /><path d='M264.9 288.8v108M646.8 221.6 41.2 328.4M664.4 170.5l-640.8 113' style={{ stroke: '#ccc', strokeDasharray: 8 }} /></svg>
	)
}

declare global {
	interface Window {
		Atropos: typeof Atropos
	}
}

const DEFAULT_USER_NAME = 'Aquí tu Maravilloso Nombre'
const DEFAULT_USER_USERNAME = 'tu_username'
const DEFAULT_USER_IMAGE = 'https://avatarfiles.alphacoders.com/235/thumb-235557.png'

let el: AtroposInstance

export function TicketUser () {
	const width = useWidth()
	const [date, setDate] = useState<string>('')
	const { user } = useUser()

	const isUserLogged = !!user

	const name = user?.name ?? DEFAULT_USER_NAME
	const image = user?.avatar ?? DEFAULT_USER_IMAGE
	const userName = user?.username ?? DEFAULT_USER_USERNAME

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

	useEffect(() => {
		if (isUserLogged) {
			el = window.Atropos({
				el: '#user-ticket',
				activeOffset: 120,
				shadowScale: 5
			})

			return
		}

		el?.destroy()
	}, [isUserLogged])

	return (
		<div id='user-ticket' class='atropos relative'>
			<div class='atropos-scale'>
				<div class='atropos-rotate'>
					<div class={`atropos-inner relative ${isUserLogged ? '' : 'blur-[2px]'}`}>
						{
							width > 720
								? (
									<>
										<TicketLayout />
										<div data-atropos-offset='5' class='absolute inset-0 w-full flex justify-center top-[88px]'>
											<TicketLogo />
										</div>
									</>
								)
								: (
									<>
										<TicketLayoutMobile />
										<div data-atropos-offset='5' class='absolute inset-0 w-full flex justify-center top-[65px]'>
											<TicketLogoMobile />
										</div>
									</>
								)
						}

						<div class='italic absolute inset-0 -top-[31px] tablet:top-[235px] max-w-[230px] tablet:max-w-full text-sm tablet:text-base mx-auto flex-col tablet:flex-row text-center flex gap-x-2 justify-center -rotate-[10deg] [&>*]:before:mr-2 [&>*]:before:font-bold [&>span]:before:content-["·"]'>
							<strong data-atropos-offset='2'>21 y 22 marzo</strong>
							<span data-atropos-offset='2' class='opacity-70'>
								{date}
							</span>
							<span data-atropos-offset='2' class='opacity-70'>
								Streaming en
								<a
									class='font-semibold text-purple-400 hover:underline ml-1'
									href='https://twitch.tv/midudev'
								>
									twitch.tv/midudev
								</a>
							</span>
						</div>
						<div class='-rotate-[10deg] italic absolute left-2/4 tablet:left-20 -translate-x-2/4 bottom-[193px] tablet:bottom-16 tablet:translate-x-0 mobile:bottom-[200px] flex tablet:flex-col justify-center text-center gap-1 items-center'>
							<span data-atropos-offset='10' class='opacity-70 text-sm tablet:text-base'>
								Ticket number
							</span>
							<strong data-atropos-offset='10' class='tablet:text-2xl'>
								{isUserLogged ? '#00001' : '#00000'}
							</strong>
						</div>
						<div class='italic absolute left-2/4 -translate-x-2/4 bottom-[50px] tablet:top-[200px] tablet:translate-x-0 tablet:left-[234px] w-[75%] mobile:w-[400px] mx-auto flex flex-col tablet:flex-row items-center justify-center text-center tablet:text-right -rotate-[10deg] gap-x-4'>
							<div class='flex flex-col text-center tablet:text-right max-w-[180px] tablet:max-w-full'>
								<span data-atropos-offset='2' class='opacity-70 text-sm tablet:text-base'>
									{name}
								</span>
								<strong data-atropos-offset='2' class='font-semibold'>
									@{userName}
								</strong>
							</div>
							<figure class='rotate-[10deg] -skew-x-6 border border-white rounded-full w-14 h-14 overflow-hidden'>
								<img data-atropos-offset='2' class='skew-x-6' src={image} />
							</figure>
						</div>
					</div>
				</div>
			</div>
			{
				!isUserLogged && <div class='absolute flex inset-0 justify-center items-center'>
					<TicketAnonymous />
				</div>
			}
		</div>
	)
}

import { useRemainingTime } from '@hooks/useRemainingTime'

type CountdownProps = {
	targetDate: Date;
};

export const Countdown = ({ targetDate }: CountdownProps) => {
	const { days, hours, minutes, seconds, countdownEnded } =
		useRemainingTime(targetDate)
	const time = [
		{ label: 'Días', value: days },
		{ label: 'Horas', value: hours },
		{ label: 'Minutos', value: minutes },
		{ label: 'Segundos', value: seconds }
	]

	return (
		<>
			{countdownEnded && (
				<div class='mb-2 font-bold'>
					Empieza la MiduFest 🎊
				</div>)
			}

			<section class='flex'>
				{time.map(({ label, value }, index) => {
					const isLast = index === time.length - 1

					return (
						<div class='flex-col w-16 lg:w-28 text-center'>
							<div class={`text-3xl lg:text-5xl text-white font-bold relative ${!isLast && 'after:ml-2 lg:after:ml-5 after:font-bold after:text-white after:content-[":"] after:absolute'}`}>{value}</div>
							{label && <span class='text-white/80 text-xs lg:text-base'>{label}</span>}
						</div>
					)
				})}
			</section>
		</>
	)
}

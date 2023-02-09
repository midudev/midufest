import type { ComponentChildren } from 'preact'

export const Button = (
	{ className, children, onClick, type, href } :
	{ className?: string, children: ComponentChildren, onClick?: () => void, type?: string, href?: string }
) => {
	const buttonClasses = type === 'twitter'
		? 'text-white border-[#1da1f2]/80 bg-[#1da1f2] hover:bg-[#1da1f2]/60 hover:bg-[#1da1f2]/90 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50'
		: 'text-primary hover:border-primary border-white/10 bg-zinc-900/90'

	const defaultClass = 'text-sm transition inline-flex items-center  font-semibold border rounded-lg px-6 py-3'

	const ElementToRender = href ? 'a' : 'button'

	return (
		<ElementToRender
			href={href}
			class={`${className} ${buttonClasses} ${defaultClass}`}
			onClick={onClick}
		>
			{children}
		</ElementToRender>
	)
}

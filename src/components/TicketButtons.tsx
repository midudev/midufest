import { useUser } from "@hooks/useUser";
import { atcb_action } from "add-to-calendar-button";
import { Icons } from "@components/Icons";

const TWITTER_TEXT = `¡Ya tengo mi ENTRADA para la #MiduFest!
Conferencia de Desarrollo y Programación Web.

¡Consigue el tuyo totalmente gratis! ⇩ https://midufest.com/ticket/midudev`

const TWITTER_URL = `https://twitter.com/intent/tweet?text=${encodeURIComponent(TWITTER_TEXT)}`

const Button = ({ children, onClick }: { children: string, onClick: any}) => {

	return (
		<button
			class="text-primary text-sm transition bg-zinc-900/90 font-semibold border hover:border-primary border-white/10 rounded-lg px-6 py-3"
			onClick={onClick}
		>
			{children}
		</button>
	);
};

const TwitterButton = ({
	children,
	onClick,
}: {
	children: string;
	onClick: any;
}) => {
	return (
		<button
			class="text-white bg-[#1da1f2] hover:bg-[#1da1f2]/90 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 font-medium rounded-lg text-sm px-6 py-3 text-center inline-flex items-center"
			onClick={onClick}
		>
			{children}
		</button>
	);
};

export function TicketButtons () {
	const { user } = useUser()

	const handleAddCalendar = (e) => {
		const config = {
			name: "miduFest - Conferencia de programación y desarrollo",
			description:
				"Entra a https://twitch.tv/midudev para disfrutar totalmente gratis de la conferencia.",
			startDate: "2023-03-21",
			startTime: "17:00",
			endDate: "2023-03-21",
			endTime: "22:00",
			timeZone: "Europe/Madrid",
			location: "https://midufest.com",
			buttonStyle: "round",
			language: "es",
			options: ["Google", "Apple", "iCal"],
		};

		atcb_action(config, e.target);
	};

	const handleCopyLink = () => {
		if (user?.username) {
			navigator.clipboard.writeText(
				`https://midufest.com/ticket/${user.username}`
			);
			import("https://cdn.skypack.dev/wc-toast").then(({ toast }) =>
				toast("Enlace copiado al portapapeles", {
					duration: 2000,
					icon: {
						type: "success",
					},
				})
			);
		}
	};

	const handleTwitterShare = () => {
		window.open(TWITTER_URL)
	}

	if (!user) return null;

	return (
		<footer class="flex justify-center items-center mt-10 gap-x-2">
			<Button onClick={handleAddCalendar}>Añadir al calendario</Button>
			<Button onClick={handleCopyLink}>Copiar enlace</Button>
			<TwitterButton onClick={handleTwitterShare}>
				<Icons.twitter class="w-4 h-4 mr-2 -ml-1" /> Compartir en Twitter
			</TwitterButton>
		</footer>
	);
}

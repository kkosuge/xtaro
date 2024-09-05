import { ImageResponse } from "@cloudflare/pages-plugin-vercel-og/api";

export const onRequest: PagesFunction = async (context) => {
	const url = context.request.url;
	const search = new URL(url).searchParams;
	const t = search.get("t") || "大きな文字でXに\nポストしてみませんか";

	const lines = t?.split("\n");

	const blocks = lines.map((line, index) => {
		let paddingTop = 630 / 2 - 64 * lines.length;

		if (index > 0 && lines[index - 1].length > 10) {
			paddingTop = paddingTop + 120;
		}

		return (
			<div
				key={line}
				style={{
					position: "absolute",
					top: `${paddingTop + index * 120}px`,
					lineHeight: "100px",
					padding: "0 100px",
				}}
			>
				{line}
			</div>
		);
	});

	return new ImageResponse(
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				fontSize: "100px",
				gap: "10px",
				background: "#FFF",
				width: "100%",
				height: "100%",
				position: "relative",
			}}
		>
			{blocks}
		</div>,
		{
			width: 1200,
			height: 630,
		},
	);
};

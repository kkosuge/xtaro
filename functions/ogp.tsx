import { ImageResponse } from "@cloudflare/pages-plugin-vercel-og/api";

export const onRequest: PagesFunction = async (context) => {
  const url = new URL(context.request.url);
  const search = url.searchParams;
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

  const fontData = await fetch(
    new URL(`${url.protocol}//${url.host}/fonts/NotoSansJP-ExtraBold.ttf`),
  ).then((res) => res.arrayBuffer());

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
        fontFamily: "Noto Sans JP",
      }}
    >
      {blocks}
    </div>,
    {
      width: 1200,
      height: 630,
      emoji: "twimoji",
      fonts: [
        {
          name: "Noto Sans JP",
          data: fontData,
          style: "bold",
        },
      ],
    },
  );
};

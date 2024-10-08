import type { LoaderFunction } from "@remix-run/cloudflare";
import type { MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { useWindowSize } from "~/hooks/use-window-size";

const defaultText = "大きな文字でXに\nポストしてみませんか";
const baseURL = "https://xtaro.kksg.net";

export const meta: MetaFunction = (context) => {
  const search = context.location.search;
  const t = new URLSearchParams(search).get("t") || defaultText;

  return [
    { title: "大きな文字でXにポストしてみませんか" },
    { name: "description", content: "大きな文字でXにポストしてみませんか" },
    {
      name: "og:image",
      content: `${baseURL}/ogp?t=${encodeURIComponent(t)}`,
    },
    {
      name: "twitter:card",
      content: "summary_large_image",
    },
    {
      name: "twitter:site",
      content: "@9m",
    },
    {
      name: "og:url",
      content: `${baseURL}/?t=${encodeURIComponent(t)}`,
    },
    {
      name: "og:title",
      content: "大きな文字でXにポストしてみませんか",
    },
  ];
};

type LoaderData = {
  t: string;
};

export const loader: LoaderFunction = async ({ request }) => {
  const search = new URL(request.url).searchParams;
  const t = search.get("t") || defaultText;

  return { t } satisfies LoaderData;
};

export default function Index() {
  const { t } = useLoaderData<LoaderData>();
  const [w] = useWindowSize();
  const [text, setText] = useState(t);

  let cardWidth = w - 16 * 4 - 2;
  if (cardWidth > 360) {
    cardWidth = 360;
  }
  const cardHeight = (630 / 1200) * cardWidth;
  const fontSize = 36 * (cardWidth / 460);

  const lines = text.split("\n");

  const blocks = lines.map((line, index) => {
    let paddingTop = cardHeight / 2 - (fontSize / 2 + 4) * lines.length;

    if (index > 0 && lines[index - 1].length > 10) {
      paddingTop = paddingTop + fontSize;
    }

    return (
      <div
        key={line}
        style={{
          position: "absolute",
          top: `${paddingTop + index * (fontSize + 4)}px`,
          lineHeight: `${fontSize}px`,
          padding: "0 4px",
        }}
      >
        {line}
      </div>
    );
  });

  const intentUrl = `https://twitter.com/intent/tweet?hashtags=${encodeURIComponent("X太郎")}&text=${encodeURI(`${baseURL}/?t=${encodeURIComponent(text)}`)}`;
  const imageUrl = `${baseURL}/ogp?t=${encodeURIComponent(text)}`;

  return (
    <div className="font-sans pt-16 pb-0 h-full">
      <div className="flex flex-col gap-4 h-full">
        <div className="flex flex-col gap-4 border rounded p-4 max-w-[426px] mx-auto shadow">
          <div className="flex gap-2">
            <img
              src="/icon.webp"
              alt="User Icon"
              className="w-[50px] h-[50px] rounded-full"
            />
            <div className="flex flex-col">
              <div className="flex gap-1">
                <h3 className="font-bold">X太郎</h3>
                <div className="flex items-center align-center">
                  <img src="/blue.webp" alt="blue mark" className="w-4 h-4" />
                </div>
              </div>
              <div className="text-gray-500">@xxxxxxtaro</div>
            </div>
          </div>
          <div
            className="border rounded p-8 relative font-bold select-none"
            style={{
              width: `${cardWidth}px`,
              height: `${cardHeight}px`,
              fontSize: `${fontSize}px`,
            }}
          >
            {blocks}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <a
            href={imageUrl}
            target="_blank"
            rel="noreferrer"
            className="bg-white text-black border border-black font-bold text-xl w-full block rounded text-center py-2 hover:opacity-80 max-w-[394px] mx-auto"
          >
            画像を保存する
          </a>
          <a
            href={intentUrl}
            target="_blank"
            rel="noreferrer"
            className="bg-black text-white font-bold border border-black text-xl w-full block rounded text-center py-2 hover:bg-gray-800 max-w-[394px] mx-auto"
          >
            𝕏 にポストする
          </a>
        </div>

        <div className="flex flex-col max-w-[394px] mx-auto  bg-gray-200 rounded p-4 pt-2 w-full gap-1 border border-gray-200">
          <div className="w-full text-gray-800 text-xs">文面を編集する</div>
          <TextareaAutosize
            className="w-full h-[100px] border rounded px-6 py-4 resize-none text-xl text-gray-600 w-full border-gray-100"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>

        <a
          href="https://x.com/9m"
          target="_blank"
          className="text-center mt-auto bg-black text-white text-xs hover:bg-gray-800 py-2"
          rel="noreferrer"
        >
          𝕏 @9m
        </a>
      </div>
    </div>
  );
}

import type { MetaFunction } from "@remix-run/node";
import { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";

export const meta: MetaFunction = () => {
	return [{ title: "X Taro" }, { name: "description", content: "X Taro" }];
};

export default function Index() {
	const [text, setText] = useState("大きな画像で\nXに主張を投稿してみませんか");

	const displayText = text.split("\n").map((line) => <p key={line}>{line}</p>);

	return (
		<div className="font-sans p-4 md:w-[500px] mx-auto">
			<div className="flex flex-col gap-4 border rounded p-4">
				<div className="flex gap-2">
					<img
						src="/icon.webp"
						alt="User Icon"
						className="w-[50px] h-[50px] rounded-full"
					/>
					<div className="flex flex-col">
						<h3 className="font-bold">X太郎</h3>
						<div className="text-gray-500">@xxxxxxtaro</div>
					</div>
				</div>
				<div className="border rounded p-8">
					<p className="text-4xl font-bold">{displayText}</p>
				</div>
			</div>
			<TextareaAutosize
				className="w-full h-[100px] border rounded px-6 py-4 mt-4"
				value={text}
				onChange={(e) => setText(e.target.value)}
			/>
		</div>
	);
}

import Renderer from "./renderer/index.js";
import Client from "./client/index.js";
import { Socket } from "./handler/index.js";

const init = async () => {
	const socket = new Socket("ws://192.168.1.113:1234/");

	socket.on("error", console.error);
	socket.on("join", ({ entities }) => {
		const renderer = new Renderer({
			width: 640,
			height: 480,
			fixedEntities: entities
		});

		renderer.init();

		socket.on("render", renderer.paint);
	});

	await socket.init();

	const client = new Client(Math.floor(Math.random() * 100000));
	client.init(socket);
};

init();

//var socket = new WebSocket("ws://192.168.1.113:1234/");
// socket.onmessage = function({ data: json }) {
// 	const { type, data } = JSON.parse(json);

// 	switch (type) {
// 		case "render":
// 			render({ data, context });
// 			break;
// 		case "error":
// 			console.error(data);
// 			break;
// 		default:
// 			console.error("Type not recognised.");
// 	}
// };

import Renderer from "./renderer/index.js.js";
import SoundEngine from "./soundEngine/index.js.js";
import Client from "./client/index.js.js";
import { Socket } from "./handler/index.js.js";

const init = async () => {
	const soundEngine = new SoundEngine();
	await soundEngine.init();

	//const socket = new Socket("ws://192.168.1.113:1234/");
	const socket = new Socket("ws://127.0.0.1:1234");

	socket.on("error", console.error);
	socket.on("join", ({ entities }) => {
		soundEngine.loopSound("soundtrack");

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

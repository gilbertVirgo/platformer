import Renderer from "./renderer/index.js";
import SoundEngine from "./soundEngine/index.js";
import Client from "./client/index.js";
import { Socket } from "./handler/index.js";

const init = async () => {
	console.log("before");
	const soundEngine = new SoundEngine();
	await soundEngine.init();
	console.log("afta");

	//const socket = new Socket("ws://192.168.1.113:1234/");
	const socket = new Socket("ws://127.0.0.1:1234");

	socket.on("error", console.error);
	socket.on("join", ({ entities }) => {
		//soundEngine.loopSound("soundtrack");

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

import render from "./render.js";

const init = () => {
	const canvas = document.getElementById("main");
	canvas.width = 480;
	canvas.height = 640;

	const context = canvas.getContext("2d");

	var socket = new WebSocket("ws://192.168.1.113:1234/");
	socket.onmessage = function({ data: json }) {
		const { type, data } = JSON.parse(json);

		console.log(json);

		switch (type) {
			case "render":
				render({ data, context });
				break;
			case "error":
				console.error(data);
				break;
			default:
				console.error("Type not recognised.");
		}
	};

	// window.onkeydown = function(e) {
	// 	socket.send(e.which);
	// };

	document.body.appendChild(messages);
};

init();

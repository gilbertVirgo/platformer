import { Controls } from "../interfaces/index.js";
import { KeyPress } from "../handlers/index.js";

export function Client(id) {
	this.id = id;
	this.controls;

	this.init = function(socket) {
		this.controls = new Controls({});

		socket.send({
			id: this.id
		});

		new KeyPress(window).init({
			controls: this.controls,
			onProfileChange: profile => {
				socket.send({
					id: this.id,
					profile
				});
			}
		});
	};
}

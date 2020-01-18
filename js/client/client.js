import { Controls } from "../interface/index.js";
import { KeyPress } from "../handler/index.js";

export function Client(id) {
	this.id = id;
	this.controls;

	this.init = function(socket) {
		// Send socket server client ID
		socket.send({
			id: this.id
		});

		// Initiate default controls
		this.controls = new Controls({});

		// KeyPress handler
		new KeyPress(window).init({
			controls: this.controls,
			onProfileChange: profile => {
				// When the key profile changes, send the new profile with the client ID.

				socket.send({
					id: this.id,
					profile
				});
			}
		});
	};
}

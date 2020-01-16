export function Socket(socketURL) {
	this.socket = null;
	this.socketURL = socketURL;
	this.types = {};

	this.on = function(type, cb) {
		this.types[type] = cb;
	};

	this.send = function(data) {
		this.socket.send(JSON.stringify({ data }));
	};

	this.init = function() {
		this.socket = new WebSocket(socketURL);

		this.socket.addEventListener("message", ({ data: json }) => {
			const { type, data } = JSON.parse(json);

			if (this.types.hasOwnProperty(type)) {
				this.types[type](data);
			}
		});

		return new Promise(res => this.socket.addEventListener("open", res));
	};
}

export function Socket(socketURL) {
	this.socket = null;
	this.socketURL = socketURL;

	// Events to listen for stored here
	this.types = {};

	this.on = function(type, cb) {
		// Add a listener of name `type` with a resulting callback `cb`
		this.types[type] = cb;
	};

	this.send = function(data) {
		// Stringify data
		const dataString = JSON.stringify({ data });

		// Send data to socket server
		this.socket.send(dataString);
	};

	this.init = function() {
		// Initiate new WebSocket client
		this.socket = new WebSocket(socketURL);

		// Initiate WebSocket message handler
		this.socket.addEventListener("message", ({ data: json }) => {
			const { type, data } = JSON.parse(json);

			// If there is a listener for this event...
			if (this.types.hasOwnProperty(type)) {
				// Fire the callback and give it the data recieved
				this.types[type](data);
			}
		});

		// Force the client to wait until the socket is open before moving on
		return new Promise(res => this.socket.addEventListener("open", res));
	};
}

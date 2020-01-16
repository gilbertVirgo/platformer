export function Renderer({ width, height }) {
	this.width = width;
	this.height = height;
	this.context = null;

	this.paint = ({ entities }) => {
		if (this.context) {
			this.context.clearRect(0, 0, width, height);

			entities.forEach(({ x, y, right, bottom }) => {
				this.context.fillRect(x, y, right - x, bottom - y);
			});
		} else {
			console.warn("No context provided!");
		}
	};

	this.init = function() {
		const canvas = document.createElement("canvas");
		canvas.width = this.width;
		canvas.height = this.height;

		this.context = canvas.getContext("2d");

		console.log(canvas, this.context);

		document.body.appendChild(canvas);
	};
}

import constants from "./constants.js";

export const Texture = function({
	map,
	frames,
	fixed = false,
	tile = false,
	sWidth,
	sHeight
}) {
	this.index = 0;
	this.map = map;
	this.frames = frames;
	this.fixed = fixed;
	this.tile = tile;
	this.loaded = false;
	this.sWidth = sWidth;
	this.sHeight = sHeight;

	this.next = function() {
		this.index = this.index < this.frames.length ? this.index + 1 : 0;
	};

	this.paint = function({ context, dx, dy, dWidth, dHeight }) {
		if (!this.fixed) this.next();

		const [sx, sy] = this.frames[this.index];
		const { sWidth, sHeight } = this;

		if (!this.tile) {
			context.drawImage(
				this.map,
				sx,
				sy,
				sWidth,
				sHeight,
				dx,
				dy,
				dWidth,
				dHeight
			);
		} else {
			const { TILE_SIZE } = constants;

			let lim =
				Math.ceil((dWidth * height) / Math.pow(TILE_SIZE, 2)) +
				height / TILE_SIZE;
			let x = 0,
				y = 0;
			for (let i = 0; i < lim; i += TILE_SIZE) {
				if (x < dWidth) x += TILE_SIZE;
				else {
					x = 0;
					y += TILE_SIZE;
				}

				context.drawImage(
					this.map,
					sx,
					sy,
					sWidth,
					sHeight,
					x,
					y,
					TILE_SIZE,
					TILE_SIZE
				);
			}
		}
	};
};

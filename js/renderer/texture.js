import constants from "./constants.js";

export const Texture = function({
	uid,
	map,
	frames,
	fixed = false,
	tile = false,
	sWidth,
	sHeight
}) {
	this.index = 0;
	this.uid = uid;
	this.map = map;
	this.frames = frames;
	this.fixed = fixed;
	this.tile = tile;
	this.loaded = false;
	this.sWidth = sWidth;
	this.sHeight = sHeight;

	this.next = function() {
		this.index = this.index < this.frames.length - 1 ? this.index + 1 : 0;
	};

	this.paint = ({ context, dx, dy, dWidth, dHeight }) => {
		if (!this.fixed) this.next();

		const [sx, sy, sWidth, sHeight] = this.frames[this.index];

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

			let lim = Math.ceil((dWidth * dHeight) / Math.pow(TILE_SIZE, 1));

			let x = 0,
				y = 0;
			for (let i = 0; i < lim; i += TILE_SIZE) {
				context.drawImage(
					this.map,
					sx,
					sy,
					sWidth,
					sHeight,
					dx + x,
					dy + y,
					TILE_SIZE,
					TILE_SIZE
				);

				if (x + TILE_SIZE < dWidth) x += TILE_SIZE;
				else {
					x = 0;
					y += TILE_SIZE;
				}
			}
		}

		context.strokeRect(dx, dy, dWidth, dHeight);
	};
};

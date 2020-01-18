import constants from "./constants.js";

export const Texture = function({
	uid,
	map,
	frames,
	fixed = false,
	tile = false
}) {
	// Frame index
	this.index = 0;

	this.uid = uid;
	this.map = map;
	this.frames = frames;

	// Does the texture tile?
	this.tile = tile;

	this.paint = ({ context, dx, dy, dWidth, dHeight }) => {
		this.index =
			typeof this.frames[this.index + 1] !== "undefined"
				? this.index + 1
				: 0;

		console.log("(paint) Typeof next", typeof this.frames[this.index]);

		// Get the source position and bounds of the given frame
		const [sx, sy, sWidth, sHeight] = this.frames[this.index]; // || this.frames[0];

		if (!this.tile) {
			// For non-tiling textures...

			context.drawImage(
				this.map, // map source file
				sx, // source x
				sy, // source y
				sWidth, // source width
				sHeight, // source height
				dx, // destination x
				dy, // destination y
				dWidth, // destination width
				dHeight // destination height
			);
		} else {
			// For tiling textures...

			const { TILE_SIZE } = constants;

			// Tile count limit = destination area / tile size
			let lim = Math.ceil((dWidth * dHeight) / TILE_SIZE);

			// Place tiles
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

		// Debug: draw bounds of all textures
		//context.strokeRect(dx, dy, dWidth, dHeight);
	};
};

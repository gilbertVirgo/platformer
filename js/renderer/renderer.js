import { Texture } from "./texture.js";
import mapData from "./mapData.js";

export function Renderer({ width, height, fixedEntities }) {
	this.width = width;
	this.height = height;
	this.context = null;
	this.fixedEntities = fixedEntities;
	this.textures = [];

	this.findTexture = uid => {
		return this.textures.find(({ uid: desired }) => uid === desired);
	};

	this.paint = ({ entities }) => {
		if (this.context) {
			//this.context.clearRect(0, 0, width, height);
			this.context.drawImage(document.getElementById("background"), 0, 0);

			const z = {
				platform: 1,
				player: 2
			};

			const combinedEntities = [...entities, ...this.fixedEntities].sort(
				(a, b) => z[a.type] - z[b.type]
			);

			// Texture check
			combinedEntities.forEach(
				({
					uid,
					x: dx,
					y: dy,
					size: [dWidth, dHeight],
					sprite,
					type
				}) => {
					const { tile, fixed, frames } = mapData.find(
						({ sprite: desired }) => sprite === desired
					);

					if (typeof this.findTexture(uid) === "undefined") {
						const map = document.getElementById(`tm-${type}`);

						const texture = new Texture({
							uid,
							map,
							frames,
							tile,
							fixed
						});

						texture.paint({
							context: this.context,
							dx,
							dy,
							dWidth,
							dHeight
						});

						this.textures.push(texture);
					} else {
						const texture = this.findTexture(uid);
						texture.frames = frames;
						texture.paint({
							context: this.context,
							dx,
							dy,
							dWidth,
							dHeight
						});
					}
				}
			);
		} else {
			console.warn("No context provided!");
		}
	};

	this.init = function() {
		const canvas = document.createElement("canvas");

		// Adjust for retina
		canvas.width = this.width * 2;
		canvas.height = this.height * 2;
		canvas.style.width = `${this.width}px`;
		canvas.style.height = `${this.height}px`;

		this.context = canvas.getContext("2d");
		this.context.scale(2, 2);

		document.body.appendChild(canvas);
	};
}

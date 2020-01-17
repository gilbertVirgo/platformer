import { Texture } from "./texture.js";
import mapData from "./mapData.js";

export function Renderer({ width, height, fixedEntities }) {
	this.width = width;
	this.height = height;
	this.context = null;
	this.fixedEntities = fixedEntities;

	this.paint = ({ entities }) => {
		if (this.context) {
			this.context.clearRect(0, 0, width, height);

			const z = {
				wall: 0,
				platform: 1,
				player: 2
			};

			const combinedEntities = [entities, ...this.fixedEntities].sort(
				(a, b) => z[a.type] - z[b.type]
			);

			console.log({ mapData });

			try {
				combinedEntities.forEach(
					({ x: dx, y: dy, size: [dWidth, dHeight], name }) => {
						const map = document.getElementById(`tm-${name}`);

						const {
							tile,
							fixed,
							frames,
							width: sWidth,
							height: sHeight
						} = mapData.find(
							({ name: textureName }) => textureName === name
						)[0];

						new Texture({
							map,
							frames,
							tile,
							fixed,
							sWidth,
							sHeight
						}).paint({
							context: this.context,
							dx,
							dy,
							dWidth,
							dHeight
						});
					}
				);
			} catch (ex) {
				console.log(combinedEntities);
			}
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

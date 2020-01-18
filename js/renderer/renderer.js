import { Texture } from "./texture.js";
import mapData from "./mapData.js";

// Z rules (layering order)
const z = {
	platform: 1,
	player: 2
};

export function Renderer({ width, height, fixedEntities }) {
	this.width = width;
	this.height = height;
	this.context = null;

	// Recieved when game is joined
	this.fixedEntities = fixedEntities;

	// Unique active textures
	this.textures = [];

	// Return texture of id `uid`
	this.findTexture = uid => {
		return this.textures.find(({ uid: desired }) => uid === desired);
	};

	// Paint all entities
	this.paint = ({ entities }) => {
		// If the canvas context is loaded...
		if (this.context) {
			// Draw the background
			this.context.drawImage(document.getElementById("background"), 0, 0);

			// Combine the level entities with the player entities and sort
			// according to the Z rules
			const combinedEntities = [...entities, ...this.fixedEntities].sort(
				(a, b) => z[a.type] - z[b.type]
			);

			// Check if textures for each entity have been loaded into
			// `this.entities` array
			combinedEntities.forEach(
				({
					uid,
					x: dx,
					y: dy,
					size: [dWidth, dHeight],
					sprite,
					type
				}) => {
					if (["platform", "player"].includes(type)) {
						// For entities of type "player" or "platform"...

						// Get info of texture of id `uid` from texture map
						const { tile, fixed, frames } = mapData.find(
							({ sprite: desired }) => sprite === desired
						);

						if (typeof this.findTexture(uid) === "undefined") {
							// For entities which don't have their textures loaded
							// into the `this.textures` array

							// Get the map file
							const map = document.getElementById(`tm-${type}`);

							// Load the new `Texture` instance with the given
							// parameters
							const texture = new Texture({
								uid,
								map,
								frames,
								tile,
								fixed
							});

							// Paint the new texture
							texture.paint({
								context: this.context,
								dx,
								dy,
								dWidth,
								dHeight
							});

							// Add the new texture to the `this.textures` array
							this.textures.push(texture);
						} else {
							// For entities that do have textures loaded into
							// `this.textures` array...

							// Load the texture
							const texture = this.findTexture(uid);

							// Reset its frames
							texture.frames = frames;

							// Paint the texture
							texture.paint({
								context: this.context,
								dx,
								dy,
								dWidth,
								dHeight
							});
						}
					} else {
						// For entities of unknown type...

						// Draw the border of the given entity
						this.context.strokeRect(dx, dy, dWidth, dHeight);
					}
				}
			);
		} else {
			console.warn("No context provided!");
		}
	};

	this.init = function() {
		const canvas = document.createElement("canvas");

		// Adjust size for retina displays
		canvas.width = this.width * 2;
		canvas.height = this.height * 2;
		canvas.style.width = `${this.width}px`;
		canvas.style.height = `${this.height}px`;

		this.context = canvas.getContext("2d");
		this.context.scale(2, 2);

		// Put the new canvas into the HTML body
		document.body.appendChild(canvas);
	};
}

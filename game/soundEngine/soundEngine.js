import sounds from "./sounds.js.js";

export function SoundEngine() {
	this.sounds = [];
	this.getSound = function(soundName) {
		const { inst } = this.sounds.find(({ name }) => name === soundName);
		return inst;
	};
	this.playSound = function(soundName) {
		const inst = this.getSound(soundName);
		if (inst.currentTime > 0) {
			inst.cloneNode(false).play();
		} else {
			inst.play();
		}
	};
	this.loopSound = function(soundName) {
		const inst = this.getSound(soundName);
		inst.loop = true;
		inst.play();
	};
	this.init = async () => {
		return new Promise(async onFinish => {
			for (const { name, file } of sounds) {
				const inst = new Audio(`../assets/sounds/${file}`);
				this.sounds.push({ name, inst });
				await new Promise(onImageLoad =>
					inst.addEventListener("loadeddata", onImageLoad)
				);
			}

			onFinish(this);
		});
	};
}

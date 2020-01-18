import sounds from "./sounds.js";

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
		for (const { name, file } of sounds) {
			const inst = new Audio(`../assets/sounds/${file}`);
			await new Promise(res => inst.addEventListener("loadeddata", res));
			this.sounds.push[{ name, inst }];
		}
		return this;
	};
}

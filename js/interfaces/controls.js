export const Defaults = {
	left: 65,
	right: 68,
	down: 83,
	jump: 87,
	attack: 74,
	interact: 75
};

export function Controls({ keyMap = Defaults }) {
	this.keyMap = keyMap;
	this.profile = {
		left: false,
		right: false,
		down: false,
		jump: false,
		attack: false,
		interact: false
	};

	// SYNTAX: controls.setProfile({left: true}).
	this.setProfile = function(newProfile) {
		Object.keys(newProfile).forEach(key => {
			this.profile[key] = newProfile[key];
		});
	};

	this.getProfile = function() {
		return this.profile;
	};

	this.apply = function(code, state) {
		let dirty = false;

		Object.keys(this.keyMap).forEach(key => {
			if (this.keyMap[key] === code) {
				this.setProfile({ [key]: state });
				dirty = true;
			}
		});

		return dirty;
	};
}

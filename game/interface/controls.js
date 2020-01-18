export const Defaults = {
	left: 65, // "a" key
	right: 68, // "d" key
	down: 83, // "s" key
	jump: 87, // "w" key
	attack: 74, // "j" key
	interact: 75 // "k" key
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

	// Non-destructively set properties of the profile object
	this.setProfile = function(newProfile) {
		Object.keys(newProfile).forEach(key => {
			this.profile[key] = newProfile[key];
		});
	};

	// Return the profile
	this.getProfile = function() {
		return this.profile;
	};

	// Apply a key code to the profile
	// Returns `true` when the profile is changed
	this.apply = function(code, state) {
		let dirty = false;

		Object.keys(this.keyMap).forEach(key => {
			// If the key will potentially change the profile, change the profile
			// otherwise, do nothing
			if (this.keyMap[key] === code && this.profile[key] !== state) {
				this.setProfile({ [key]: state });
				dirty = true;
			}
		});

		return dirty;
	};
}

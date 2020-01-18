export function KeyPress(target) {
	// Target element
	this.target = target;

	this.onKeyDown = ({ which, keyCode }, controls, onProfileChange) => {
		// Apply key code to controls and see if the profile changes

		if (controls.apply(which || keyCode, true)) {
			onProfileChange(controls.getProfile());
		}
	};

	this.onKeyUp = ({ which, keyCode }, controls, onProfileChange) => {
		// Apply key code to controls and see if the profile changes

		if (controls.apply(which || keyCode, false)) {
			onProfileChange(controls.getProfile());
		}
	};

	this.init = function({ controls, onProfileChange }) {
		// Initiate listeners

		target.addEventListener("keydown", event =>
			this.onKeyDown(event, controls, onProfileChange)
		);
		target.addEventListener("keyup", event =>
			this.onKeyUp(event, controls, onProfileChange)
		);
	};
}

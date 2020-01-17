export function KeyPress(target) {
	this.target = target;

	this.onKeyDown = ({ which, keyCode }, controls, onProfileChange) => {
		if (controls.apply(which || keyCode, true)) {
			onProfileChange(controls.getProfile());
		}
	};

	this.onKeyUp = ({ which, keyCode }, controls, onProfileChange) => {
		if (controls.apply(which || keyCode, false)) {
			onProfileChange(controls.getProfile());
		}
	};

	this.init = function({ controls, onProfileChange }) {
		target.addEventListener("keydown", event =>
			this.onKeyDown(event, controls, onProfileChange)
		);
		target.addEventListener("keyup", event =>
			this.onKeyUp(event, controls, onProfileChange)
		);
	};
}

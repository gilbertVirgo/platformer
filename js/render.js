const render = ({ data: entities, context }) => {
	const { width, height } = context.canvas;

	context.clearRect(0, 0, width, height);

	entities.forEach(({ x, y, right, bottom }) => {
		context.fillRect(x, y, right - x, bottom - y);
	});
};

export default render;

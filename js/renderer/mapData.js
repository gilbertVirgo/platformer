export default [
	{
		map: "assets/platform/map.png",
		name: "caution",
		fixed: true,
		tile: true,
		frames: [[0, 0, 200, 200]]
	},
	{
		map: "assets/platform/map.png",
		name: "grass",
		fixed: true,
		tile: true,
		frames: [[200, 0, 200, 200]]
	},
	{
		map: "assets/platform/map.png",
		name: "stone",
		fixed: true,
		tile: true,
		frames: [[400, 0, 200, 200]]
	},
	{
		map: "assets/player/map.png",
		name: "still",
		frames: [[0, 0, 125, 250]]
	},
	{
		map: "assets/player/map.png",
		name: "walking-unarmed",
		frames: [
			[125, 0, 125, 250],
			[250, 0, 125, 250],
			[375, 0, 125, 250],
			[500, 0, 125, 250]
		]
	},
	{
		map: "assets/player/map.png",
		name: "walking-armed",
		frames: [
			[1125, 0, 125, 250],
			[1250, 0, 125, 250],
			[1375, 0, 125, 250],
			[1500, 0, 125, 250]
		]
	}
];

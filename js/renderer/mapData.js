export default [
	{
		map: "assets/platform/map.png",
		type: "platform",
		sprite: "caution",
		fixed: true,
		tile: true,
		frames: [[0, 0, 200, 200]]
	},
	{
		map: "assets/platform/map.png",
		type: "platform",
		sprite: "grass",
		fixed: true,
		tile: true,
		frames: [[200, 0, 200, 200]]
	},
	{
		map: "assets/platform/map.png",
		type: "platform",
		sprite: "stone",
		fixed: true,
		tile: true,
		frames: [[400, 0, 200, 200]]
	},
	{
		map: "assets/player/map.png",
		type: "player",
		sprite: "stillUnarmed",
		tile: false,
		fixed: false,
		frames: [[0, 0, 200, 300]]
	},
	{
		map: "assets/player/map-.png",
		type: "player",
		sprite: "walkingRightUnarmed",
		tile: false,
		fixed: false,
		frames: [
			[200, 0, 200, 300],
			[400, 0, 200, 300],
			[600, 0, 200, 300],
			[800, 0, 200, 300],
			[1000, 0, 200, 300],
			[1200, 0, 200, 300],
			[1400, 0, 200, 300],
			[1600, 0, 200, 300],
			[1800, 0, 200, 300],
			[2000, 0, 200, 300],
			[2200, 0, 200, 300]
		]
	},
	{
		map: "assets/player/map-.png",
		type: "player",
		sprite: "walkingLeftUnarmed",
		tile: false,
		fixed: false,
		frames: [
			[200, 300, 200, 300],
			[400, 300, 200, 300],
			[600, 300, 200, 300],
			[800, 300, 200, 300],
			[1000, 300, 200, 300],
			[1200, 300, 200, 300],
			[1400, 300, 200, 300],
			[1600, 300, 200, 300],
			[1800, 300, 200, 300],
			[2000, 300, 200, 300],
			[2200, 300, 200, 300]
		]
	},
	{
		map: "assets/player/map.png",
		type: "player",
		sprite: "walkingRightArmed",
		tile: false,
		fixed: false,
		frames: [
			[200, 300, 200, 300],
			[400, 300, 200, 300],
			[600, 300, 200, 300],
			[800, 300, 200, 300],
			[1000, 300, 200, 300],
			[1200, 300, 200, 300],
			[1400, 300, 200, 300],
			[1600, 300, 200, 300],
			[1800, 300, 200, 300],
			[2000, 300, 200, 300],
			[2200, 300, 200, 300]
		]
	},
	{
		map: "assets/player/map.png",
		type: "player",
		sprite: "walkingLeftArmed",
		tile: false,
		fixed: false,
		frames: [
			[1625, 0, 125, 250],
			[1750, 0, 125, 250],
			[1875, 0, 125, 250],
			[2000, 0, 125, 250]
		]
	}
];

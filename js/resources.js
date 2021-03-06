game.resources = [

	/* Graphics. 
	 * @example
	 * {name: "example", type:"image", src: "data/img/example.png"},
	 */
	{name: "background-tiles", type:"image", src: "data/img/background-tiles.png"}, //resource tiles
	{name: "meta-tiles", type:"image", src: "data/img/meta-tiles.png"}, //resource meta tiles?
	{name: "player", type:"image", src: "data/img/orcSpear.png"}, //added player resource orcSpear
	{name: "tower", type:"image", src: "data/img/tower_round.svg.png"}, //resource for bases img
	{name: "creep1", type:"image", src: "data/img/brainmonster.png"}, //resource from enemy creep
	{name: "creep2", type:"image", src: "data/img/gloop.png"}, //resource from teamate creep
	{name: "title-screen", type:"image", src: "data/img/title.png"}, //resource that load title screen img
	{name: "exp-screen", type:"image", src: "data/img/loadpic.png"}, //resource that loads exp screen pic
	{name: "gold-screen", type:"image", src: "data/img/spend.png"}, //resource that loads exp screen pic
	{name: "load-screen", type:"image", src: "data/img/loadpic.png"}, //resource that loads exp screen pic, but for continue
	{name: "new-screen", type:"image", src: "data/img/newpic.png"}, // resource loads pic for new profile
	{name: "spear", type:"image", src: "data/img/spear.png"}, //adds spear resourec
	{name: "minimap", type:"image", src: "data/img/miniMap.png"}, //adds minimap pic into game
    {name: "background-tiles-items", type:"image", src: "data/img/item-spritesheet.png"},

	/* Atlases 
	 * @example
	 * {name: "example_tps", type: "tps", src: "data/img/example_tps.json"},
	 */
		
	/* Maps. 
	 * @example
	 * {name: "example01", type: "tmx", src: "data/map/example01.tmx"},
	 * {name: "example01", type: "tmx", src: "data/map/example01.json"},
 	 */
 	{name: "level1", type: "tmx", src: "data/map/level1.tmx"}, //test map
 	{name: "level2", type: "tmx", src: "data/map/level2.tmx"}, //better map

	/* Background music. 
	 * @example
	 * {name: "example_bgm", type: "audio", src: "data/bgm/"},
	 */	

	/* Sound effects. 
	 * @example
	 * {name: "example_sfx", type: "audio", src: "data/sfx/"}
	 */
];

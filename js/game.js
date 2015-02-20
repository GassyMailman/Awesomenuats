
/* Game namespace */
var game = {

	// an object where to store game information
	data : {
		// score
		score : 0
	},
	
	
	// Run on page load.
	"onload" : function () {
	// Initialize the video.
	//sets the height and width of the screen
	if (!me.video.init("screen",  me.video.CANVAS, 1067, 600, true, '1.0')) {
		alert("Your browser does not support HTML5 canvas.");
		return;
	}

	// add "#debug" to the URL to enable the debug Panel
	if (document.location.hash === "#debug") {
		window.onReady(function () {
			me.plugin.register.defer(this, debugPanel, "debug");
		});
	}

	// Initialize the audio.
	me.audio.init("mp3,ogg");

	// Set a callback to run when loading is complete.
	me.loader.onload = this.loaded.bind(this);

	// Load the resources.
	me.loader.preload(game.resources);

	// Initialize melonJS and display a loading screen.
	me.state.change(me.state.LOADING);
},

	// Run on game resources loaded.
	"loaded" : function () {
		//adds player to pool
		me.pool.register("player", game.PlayerEntity, true);
		//loading the PlayerBase entity in game.js
		me.pool.register("PlayerBase", game.PlayerBaseEntity);
		//loading the EnemyBase entity
		me.pool.register("EnemyBase", game.EnemyBaseEntity);
		//loading the EnemyCreep entity
		me.pool.register("EnemyCreep", game.EnemyCreep, true);
		//loading Jumptrigger entity
		me.pool.register("JumpTrigger", game.JumpTrigger);
		//GameManager for things like timers
		me.pool.register("GameManager", game.GameManager);
		

		me.state.set(me.state.MENU, new game.TitleScreen());
		me.state.set(me.state.PLAY, new game.PlayScreen());

		// Start the game.
		me.state.change(me.state.MENU);
	}
};



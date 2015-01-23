game.PlayScreen = me.ScreenObject.extend({
	
	onResetEvent: function() {
		
		game.data.score = 0;



		me.levelDirector.loadLevel("level01");
	
		var player = me.pool.pull("player", 0, 420, {});
	
		me.game.world.addChild(player, 5);

		
		this.HUD = new game.HUD.Container();
		me.game.world.addChild(this.HUD);
	},


	
	onDestroyEvent: function() {
	
		me.game.world.removeChild(this.HUD);
	}
});

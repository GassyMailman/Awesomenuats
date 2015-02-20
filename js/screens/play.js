game.PlayScreen = me.ScreenObject.extend({
	/**
	 *  action to perform on state change
	 */
	onResetEvent: function() {
		// reset the score
		score : 0,
		enemyBaseHealth: 10, 
		playerBaseHealth: 10,
		enemyCreepHealth: 10,
		playerHealth: 10,
		enemyCreepAttack: 1,
		playerAttack: 1,
		playerAttackTimer: 1000,
		creepAttackTimer: 500,
		playerMoveSpeed: 5,
		creepMoveSpeed: 5,
		gameManager: "",
		player: "" 


		//loads level
		me.levelDirector.loadLevel("level01");
		//pulls the player entity from the pool
		var player = me.pool.pull("player", 0, 420, {});
		//adds him to the game and sets his layer-level
		me.game.world.addChild(player, 5);

		var gamemanager = me.pool.pull("GameManager", 0, 0, {});
		me.game.world.addChild(gamemanager, 0);

		//binding right to be able to perform action
		me.input.bindKey(me.input.KEY.RIGHT, "right");
		//binding left to be able to perform action
		me.input.bindKey(me.input.KEY.LEFT, "left");
		//binding a key for attacking w/ player
		me.input.bindKey(me.input.KEY.Z, "attack");
		me.input.bindKey(me.input.KEY.SPACE, "jump");

		// add our HUD to the game world
		this.HUD = new game.HUD.Container();
		me.game.world.addChild(this.HUD);
	},


	/**
	 *  action to perform when leaving this screen (state change)
	 */
	onDestroyEvent: function() {
		// remove the HUD from the game world
		me.game.world.removeChild(this.HUD);
	}
});

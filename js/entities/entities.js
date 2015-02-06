// TODO
// player's class
game.PlayerEntity = me.Entity.extend ({
	//constructor function 
	init: function(x, y, settings){
		//reachers the constructor function for enitity
		this._super(me.Entity, 'init', [x, y, {
			//settings. shoes the player
			image: "player",
			//sets aside a width of 64 pixels for the sprite
			width: 64,
			//sets aside a height of 64 pixels for the sprite
			height: 64,
			//gives the sprite a width of 64. 
			spritewidth : "64",
			//gives the sprite a width of 64
			spriteheight: "64",
			getShape: function(){
				//returns a rectangle of what the player walks into
				return(new me.Rect(0, 0, 64, 64)).toPolygon();
			}
		}]);

		//tells movement of player when moved
		this.body.setVelocity(5, 0);
	},
		//current postion changes by setVelocity() 
		//me.timer.tick keeps movement smooth
	update: function(delta) {
		if(me.input.isKeyPressed("right")) {
			this.body.vel.x += this.body.accel.x * me.timer.tick;
		}
		else {
			//if not pressing, no change in velocity
			this.body.vel.x = 0;
		}

		//lets game know to update screen
		this.body.update(delta);
		return true;
 	
});
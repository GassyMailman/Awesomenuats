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
		this.body.setVelocity(5, 20);

		this.renderable.addAnimation("idle", [78]);
		this.renderable.addAnimation("walk", [117, 118, 119, 120, 121, 122, 123, 124, 125], 80);

		this.renderable.setCurrentAnimation("idle");
	},
		//current postion changes by setVelocity() 
		//me.timer.tick keeps movement smooth
	update: function(delta) {
		if(me.input.isKeyPressed("right")) {
			this.body.vel.x += this.body.accel.x * me.timer.tick;
			this.flipX(true);
		}
		//current postion changes by setVelocity() 
		//me.timer.tick keeps movement smooth
		else if(me.input.isKeyPressed("left")) {
			this.body.vel.x -= this.body.accel.x * me.timer.tick;
			this.flipX(false);
		}
		else {
			//if not pressing, no change in velocity
			this.body.vel.x = 0;
		}

		if(this.body.vel.x !== 0){
			if(!this.renderable.isCurrentAnimation("walk")) {
				this.renderable.setCurrentAnimation("walk");
			}
		}
		else {
			this.renderable.setCurrentAnimation("idle");
		}

		//lets game know to update screen
		this.body.update(delta);
		this._super(me.Entity, "update", [delta]);
		return true;
 	
});
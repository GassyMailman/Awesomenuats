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
		//setting an idle image	
		this.renderable.addAnimation("idle", [78]);
		//creating a walk animation using orcSpear img
		this.renderable.addAnimation("walk", [117, 118, 119, 120, 121, 122, 123, 124, 125], 80);
		//sets current animation to the idle
		this.renderable.setCurrentAnimation("idle");
	},
		//current postion changes by setVelocity() 
		//me.timer.tick keeps movement smooth
	update: function(delta) {
		if(me.input.isKeyPressed("right")) {
			this.body.vel.x += this.body.accel.x * me.timer.tick;
			//flips the animation for right movement
			this.flipX(true);
		}
		//current postion changes by setVelocity() 
		//me.timer.tick keeps movement smooth
		else if(me.input.isKeyPressed("left")) {
			this.body.vel.x -= this.body.accel.x * me.timer.tick;
			//stops animation from flipping to right when moving left
			this.flipX(false);
		}
		else {
			//if not pressing, no change in velocity
			this.body.vel.x = 0;
		}

		if(this.body.vel.x !== 0){
			if(!this.renderable.isCurrentAnimation("walk")) {
				//makes walk animation occur when moving
				//does so if not already walk animation
				this.renderable.setCurrentAnimation("walk");
			}
		}
		//adds if statement for movement
		else {
			//makes sure to switch back to idle animation
			this.renderable.setCurrentAnimation("idle");
		}

		//lets game know to update screen
		this.body.update(delta);
		//updates in real time
		this._super(me.Entity, "update", [delta]);
		return true;
	}
 	
});
		game.PlayerBaseEntity = me.Entity.extend({
			init: function(x, y, settings) {
				this._super(me.Entity, 'init', [x, y, {
					image: "tower", //img for entity
					width: 100, //width of base
					height: 100, //height of base 
					spritewidth: "100", //similar to width
					spriteheight: "100", //similar to height
					getShape: function() {
						return (new me.Rect(0, 0, 100, 100)).toPolygon();
					}
					//getShape function for use
				}]); 
				//build constructor by calling super
		
				this.broken = false; //tower not destroyed
				this.health = 10; //health of the tower
				this.alwaysUpdate = true; //update if not on screen 
				this.body.onCollision = this.onCollision.bind(this); //able to collide w/ tower
		
				this.type = "PlayerBaseEntity"; //later for other collisions
			}, 
			//init function for initialize
		
			update: function(delta) {
				if(this.health <= 0) {
					this.broken = true;
				}
				//if health <= 0 then tower broken 
				this.body.update(delta); //update for this
		
				this._super(me.Entity, "update", [delta]); //have to call super
				return true;
			},
			//update function to update
		
			onCollision: function() {
				//empty onCollision function for later
			}
		}); 
		//base entity similar to player

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

		this.type = "PlayerEntity";
		this.health = 100;

		//tells movement of player when moved
		this.body.setVelocity(5, 20);
		this.facing = "right";

		this.now = new Date().getTime();
		//sets variable to current date/time
		this.lastHit = this.now;
		//finds the date when your last hit player 
		this.lastAttack = new Date();
		//havent used this yet

		me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
		//makes screen follow player movement

		//setting an idle image	
		this.renderable.addAnimation("idle", [65]);
		//creating a walk animation using orcSpear img
		this.renderable.addAnimation("walk", [117, 118, 119, 120, 121, 122, 123, 124, 125], 80);
		//creating an animationg for attacking
		this.renderable.addAnimation("attack", [65, 66, 67, 68, 69, 70, 71, 72, 71], 80);
		//sets current animation to the idle
		this.renderable.setCurrentAnimation("idle");
	},
		//current postion changes by setVelocity() 
		//me.timer.tick keeps movement smooth
	update: function(delta) {
		this.now = new Date().getTime();

		if(me.input.isKeyPressed("right")) {
			this.body.vel.x += this.body.accel.x * me.timer.tick;
			//flips the animation for right movement
			this.flipX(true);
			this.facing = "right";
		}
		//current postion changes by setVelocity() 
		//me.timer.tick keeps movement smooth
		else if(me.input.isKeyPressed("left")) {
			this.body.vel.x -= this.body.accel.x * me.timer.tick;
			//stops animation from flipping to right when moving left
			this.flipX(false);
			this.facing = "left";
		}
		else {
			//if not pressing, no change in velocity
			this.body.vel.x = 0;
		}

		if(me.input.isKeyPressed("jump") && !this.body.jumping && !this.body.falling) {
			this.body.jumping = true;
			//sets precreated jumping var to true
			this.body.vel.y -= this.body.accel.y * me.timer.tick;
			//causes jump to actually happen
		}
		//allows for jumping when key is pressed, 
		//and if not jumping/falling already

		if(me.input.isKeyPressed("attack")) {
			if(!this.renderable.isCurrentAnimation("attack")) {
				this.renderable.setCurrentAnimation("attack", "idle");
				//sets current animation then switches over
				this.renderable.setAnimationFrame();
				//begins animation from beginning not 
				//from left off
			}
			//uses animation if not already in use
		}
		//shows action on attacking
		else if(this.body.vel.x !== 0 && !this.renderable.isCurrentAnimation("attack")){
			if(!this.renderable.isCurrentAnimation("walk")) {
				//makes walk animation occur when moving
				//does so if not already walk animation
				this.renderable.setCurrentAnimation("walk");
			}
		}
		//adds if statement for movement
		else if(!this.renderable.isCurrentAnimation("attack")) {
			//makes sure to switch back to idle animation
			this.renderable.setCurrentAnimation("idle");
		}

		me.collision.check(this, true, this.collideHandler.bind(this), true);
		//lets game know to update screen
		this.body.update(delta);
		//updates in real time
		this._super(me.Entity, "update", [delta]);
		return true;
		},

		collideHandler : function(response) {
			if(response.b.type === 'EnemyBaseEntity') {
				var ydif = this.pos.y - response.b.pos.y;
				var xdif = this.pos.x - response.b.pos.x;
	
				if(ydif < -40 && xdif < 70 && xdif > -35) /* only checking if necaessary */ {
				this.body.falling = false;
				//stops player from fallng into base
				this.body.vel.y = - 1;
				//pushes player up from top
			}
				//need to check ydif first
				else if(xdif > -35 /* xdif relation to found number */ && 
				this.facing === 'right'  /* need to know which way facing */ && 
				(xdif < 0)) {
					this.body.vel.x = 0;
					//stop player from moving
					this.pos.x = this.pos.x - 1;
					//slightly move player backwards
				}
				else if(xdif < 70 /* xdif relation to found number */ && 
				this.facing === 'left' /* need to know which way facing */ && 
				xdif > 0) {
					this.body.vel.x = 0;
					//stop player movement
					this.pos.x = this.pos.x + 1;
					//move player away slightly
				}

				if(this.renderable.isCurrentAnimation("attack") && this.now - this.lastHit >= 1000) {
				this.lastHit = this.now;
				response.b.loseHealth();
			  }
			}

			else if (response.b.type === 'EnemyCreep')  {
				var xdif = this.pos.x - response.b.pos.x; //sets xdif to x position
				var ydif = this.pos.y - response.b.pos.y; //sets ydif to y position

			if(xdif > 0) {
				this.pos.x = this.pos.x + 1;
				if (this.facing === "left") {
					this.body.vel.x = 0;
				}
				//prevents left movement with creep
			}
			else {
				this.pos.x = this.pos.x - 1;
				if (this.facing === "right") {
					this.body.vel.x = 0;
				}
				//prevents right movement with creep
			}

			if(this.renderable.isCurrentAnimation("attack") && this.now - this.lastHit >= 1000 
				(((xdif > 0) && this.facing === "left") || ((xdif < 0) && this.facing === "right"))) {
				&& (Math.abs(ydif) <= 40) && 
				this.health = this.now; //makes current health health
				response.b.loseHealth(1); //lose 1 health
			}
			//function activates attack based on ...
		}
	},
 	//collideHandler function creates collsision for player w/ objects
	loseHealth : function(damage) {
		this.health = this.health - damage;
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
						return (new me.Rect(0, 0, 100, 70)).toPolygon();
					}
					//getShape function for use
				}]); 
				//build constructor by calling super
		
				this.broken = false; //tower not destroyed
				this.health = 10; //health of the tower
				this.alwaysUpdate = true; //update if not on screen 
				this.body.onCollision = this.onCollision.bind(this); //able to collide w/ tower
		
				this.type = "PlayerBase"; //later for other collisions
				//add animation for unbroken tower
				this.renderable.addAnimation("idle", [0]);
				//add animation for broken tower
				this.renderable.addAnimation("broken", [1]);
				//sets the current animation to idle
				this.renderable.setCurrentAnimation("idle");
			}, 
			//init function for initialize
		
			update: function(delta) {
				if(this.health <= 0) {
					this.broken = true;
					//sets the current animation to broken
					this.renderable.setCurrentAnimation("broken");
				}
				//if health <= 0 then tower broken 
				this.body.update(delta); //update for this
		
				this._super(me.Entity, "update", [delta]); //have to call super
				return true;
			},
			//update function to update
		
			onCollision: function() {
				//empty onCollision function for later
			},

			loseHealth: function(damage) {
			this.health = this.health - damage;
			}
		}); 
		//base entity similar to player
				game.EnemyBaseEntity = me.Entity.extend({
			init: function(x, y, settings) {
				this._super(me.Entity, 'init', [x, y, {
					image: "tower", //img for entity
					width: 100, //width of base
					height: 100, //height of base 
					spritewidth: "100", //similar to width
					spriteheight: "100", //similar to height
					getShape: function() {
						return (new me.Rect(0, 0, 100, 70)).toPolygon();
					}
					//getShape function for use
				}]); 
				//build constructor by calling super
		
				this.broken = false; //tower not destroyed
				this.health = 10; //health of the tower
				this.alwaysUpdate = true; //update if not on screen 
				this.body.onCollision = this.onCollision.bind(this); //able to collide w/ tower
		
				this.type = "EnemyBaseEntity"; //later for other collisions
				//add animation for unbroken tower
				this.renderable.addAnimation("idle", [0]);
				//add animation for broken tower
				this.renderable.addAnimation("broken", [1]);
				//sets the current animation to idle
				this.renderable.setCurrentAnimation("idle");
			}, 
			//init function for initialize
		
			update: function(delta) {
				if(this.health <= 0) {
					this.broken = true;
					//sets the current animation to broken
					this.renderable.setCurrentAnimation("broken");
				}
				//if health <= 0 then tower broken 
				this.body.update(delta); //update for this
		
				this._super(me.Entity, "update", [delta]); //have to call super
				return true;
			},
			//update function to update
		
			onCollision: function() {
				//empty onCollision function for later
			},

			loseHealth: function() {
				this.health--;
	}
});

			game.EnemyCreep = me.Entity.extend({
				init : function(x, y, settings) {
					this._super(me.Entity, 'init', [x, y, {
						image: "creep1",
						width: 32,
						height: 64,
						spritewidth: "32",
						spriteheight: "64",
						getShape: function() {
							return (new me.Rect(0, 0, 32, 64)).toPolygon();
						}
					}]);
			
					this.health = 10;
					this.alwaysUpdate = true;
			
					this.facing = 'left';

					this.attacking = false;

					this.lastAttacking = new Date().getTime();
					this.lastHit = new Date().getTime();
					this.now = new Date().getTime();

					this.body.setVelocity(3, 20);
			
					this.type="EnemyCreep";
			
					this.renderable.addAnimation("walk", [3, 4, 5], 80);
					this.renderable.setCurrentAnimation("walk");
				},

				loseHealth: function(damage) {
					//losehealth function to take damage
					this.health = this.health - damage;
				},
			
				update : function(delta) {
					if(this.health <= 0) {
						me.game.world.removeChild(this);
					}
						this.now = new Date().getTime();
			//causes creep to move
			this.body.vel.x -= this.body.accel.x * me.timer.tick;

			me.collision.check(this, true, this.collideHandler.bind(this), true);

			this.body.update(delta);

			this._super(me.Entity, "update", [delta]);
			return true;

	},

			collideHandler: function(response) {
			if(response.b.type === 'PlayerBase') {
				this.attacking = true;
				this.lastAttacking = this.now;
				this.body.vel.x = 0;
				this.pos.x = this.pos.x + 1;
				if(this.now - this.lastHit >= 1000) {
					this.lastHit = this.now;
					response.b.loseHealth(1);
				}
					} //if the creep hits player base
			else if (response.b.type === 'PlayerEntity') {
				var xdif = this.pos.x - response.b.pos.x;

				this.attacking = true;
				this.lastAttacking = this.now;
				this.body.vel.x = 0;
				//stops movement

				if(xdif > 0) {
					console.log(xdif);
					this.pos.x = this.pos.x + 1; 
					//keeps moving creep to right to maintain its position
					this.body.vel.x = 0;
				}	

				if ((this.now - this.lastHit >= 1000) && xdif > 0) {
					this.lastHit = this.now;
					//reset?
					response.b.loseHealth(1);
					//calls loseHealth function with one damage
				}
				//times out the hits
			}
			else if (response.b.type === 'JumpTrigger') {
			var xdif = this.pos.x - response.b.pos.x;

			if (xdif < 61) {
				this.body.jumping = true;
				this.body.vel.y -= this.body.accel.y * me.timer.tick;
			}
		}
	},	
});
						game.JumpTrigger = me.Entity.extend({
			init : function(x, y, settings) {
				this._super(me.Entity, 'init', [x, y, {
					width: 64, //sets width to 32
					height: 32, //sets height to 64
					spritewidth: "64", //same as width
					spriteheight: "32", //same as height
					getShape: function() {
						return (new me.Rect(0, 0, 64, 32)).toPolygon();
					}
					//getShape function creates rectangle for enemy
			}]);
		
				console.log("hello");
		
				this.type = "JumpTrigger";
		
				this.alwaysUpdate = true; //update if not on screen 
				// this.body.onCollision = this.onCollision.bind(this);
		},
		
			update: function(delta) {
				this.body.update(delta); //update for this
		
				this._super(me.Entity, "update", [delta]); //have to call super
				return true;
		},
});

				game.GameManager = Object.extend({
					init : function(x, y, settings) {
						this.now = new Date().getTime();
						this.lastCreep = new Date().getTime();
				
						this.alwaysUpdate = true;
					},
				
					update: function() {
						this.now = new Date().getTime();
				
						if(Math.round(this.now/1000) % 10 === 0 && (this.now - this.lastCreep >= 1000)) {
							this.lastCreep = this.now;
							var creepe = me.pool.pull("EnemyCreep", 1000, 0, {});
							me.game.world.addChild(creepe, 5);
						}
				
						return true;
	},
});

ig.module(
	'game.entities.dooroutside'
)
.requires(
	'impact.entity',
	'impact.entity-pool'
)
.defines(function(){

EntityDooroutside = ig.Entity.extend({

	type: ig.Entity.TYPE.NONE, 
	checkAgainst: ig.Entity.TYPE.A,
	collides: ig.Entity.COLLIDES.NONE,
		

	size: {x: 96, y:128},
	offset: {x: 0, y: 0},
	
	doorNum: false,
	zIndex: -10000,
	animSheet: new ig.AnimationSheet( 'media/tile-work/city-door-01.png', 96, 128 ),
	
	lockLvl: false,
	opening: false,
	open: false,
	openCheckDone: false,
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		//Timers
		this.openingTimer = new ig.Timer(0);
		
		//Anim
		this.addAnim( 'closed', 1, [0], true );
		this.addAnim( 'open', 1, [1], true );
		
		if (!ig.global.wm){
			//this.openCheck();
		}
	},
	reset: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		this.opening = false;
		this.open = false;

	},
	removeCollisionTiles: function(){
		var xTiles = 0;
		var xPos = 0;
		var yTiles = 0;
		//this.offset.y = 0;
		
		while (xTiles < 12){
			ig.game.collisionMap.setTile( this.pos.x + xPos, this.pos.y - 8, 0 );	
			ig.game.collisionMap.setTile( this.pos.x + xPos, this.pos.y - 16, 0 );	
			ig.game.collisionMap.setTile( this.pos.x + xPos, this.pos.y - 24, 0 );	
			ig.game.collisionMap.setTile( this.pos.x + xPos, this.pos.y - 32, 0 );
			ig.game.collisionMap.setTile( this.pos.x + xPos, this.pos.y - 40, 0 );	
			ig.game.collisionMap.setTile( this.pos.x + xPos, this.pos.y - 48, 0 );	
			ig.game.collisionMap.setTile( this.pos.x + xPos, this.pos.y, 0 );	
			ig.game.collisionMap.setTile( this.pos.x + xPos, this.pos.y + 8, 0 );	
			ig.game.collisionMap.setTile( this.pos.x + xPos, this.pos.y + 16, 0 );	
			ig.game.collisionMap.setTile( this.pos.x + xPos, this.pos.y + 24, 0 );	
			ig.game.collisionMap.setTile( this.pos.x + xPos, this.pos.y + 32, 0 );
			ig.game.collisionMap.setTile( this.pos.x + xPos, this.pos.y + 40, 0 );	
			ig.game.collisionMap.setTile( this.pos.x + xPos, this.pos.y + 48, 0 );	
			ig.game.collisionMap.setTile( this.pos.x + xPos, this.pos.y + 56, 0 );	
			ig.game.collisionMap.setTile( this.pos.x + xPos, this.pos.y + 64, 0 );
			ig.game.collisionMap.setTile( this.pos.x + xPos, this.pos.y + 72, 0 );	
			ig.game.collisionMap.setTile( this.pos.x + xPos, this.pos.y + 80, 0 );	
			ig.game.collisionMap.setTile( this.pos.x + xPos, this.pos.y + 88, 0 );	
			ig.game.collisionMap.setTile( this.pos.x + xPos, this.pos.y + 95, 0 );
	
			xPos += 8;
			xTiles++;
		}
	},

	openThisDoor: function(){
		this.open = true;
		this.removeCollisionTiles();
		ig.game.spawnEntity( EntityDoorwaytopcity, this.pos.x, this.pos.y);
		ig.game.playDoorOpenSound2();
	},

	update: function() {
		this.parent(); 

		
		this.animMe();
	},

	animMe: function(){
		if (this.open){
			this.currentAnim = this.anims.open;
		}
		else{
			this.currentAnim = this.anims.closed;
		}
	},
	check:function(other){
		if( other instanceof EntityPlayer ) {
			
			if (ig.input.released('action') && ig.game.clickDelayTimer.delta() > 0 || ig.input.released('click') && ig.game.clickDelayTimer.delta() > 0 ) {
				if (!this.open){
					//Door is locked
					if (ig.game.clickDelayTimer.delta() > 0){
						this.openThisDoor();
					}
				}
			}
			
		}
	}

});
ig.EntityPool.enableFor( EntityDooroutside );
});

	

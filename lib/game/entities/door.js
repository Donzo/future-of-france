ig.module(
	'game.entities.door'
)
.requires(
	'impact.entity',
	'impact.entity-pool'
)
.defines(function(){

EntityDoor = ig.Entity.extend({

	type: ig.Entity.TYPE.NONE, 
	checkAgainst: ig.Entity.TYPE.A,
	collides: ig.Entity.COLLIDES.NONE,
		

	size: {x: 96, y:96},
	offset: {x: 0, y: 0},
	
	doorNum: false,
	zIndex: -10000,
	animSheet: new ig.AnimationSheet( 'media/tile-work/door-01.png', 96, 96 ),
	
	opening: false,
	open: false,
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		//Timers
		this.openingTimer = new ig.Timer(0);
		
		//Anim
		this.addAnim( 'closed', 1, [0], true );
		this.addAnim( 'open', 1, [3], true );
		this.addAnim( 'opening', .2, [0,1,2,3], true );

	},
	reset: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		this.opening = false;
		this.open = false;
		
		if (!ig.global.wm){
			//Outside WM
		}
	},
	removeCollisionTiles: function(){
		var xTiles = 0;
		var xPos = 0;
		var yTiles = 0;
		//this.offset.y = 0;
		
		while (xTiles < 12){
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
		/*
		while (xTiles < 10){
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
		*/
	},
	openThisDoor: function(){
		this.opening = true;
		this.anims.opening.rewind();
		this.openingTimer.set(.8);
		this.removeCollisionTiles();	
	},

	update: function() {
		this.parent(); 
		
		if (this.opening && this.openingTimer.delta() > 0){
			this.opening = false;
			this.open = true;
			ig.game.spawnEntity( EntityDoorwaytoptwo, this.pos.x, this.pos.y );	
			
		}
		
		this.animMe();
	},

	animMe: function(){
		if (this.open){
			this.currentAnim = this.anims.open;
		}
		else if (this.opening){
			this.currentAnim = this.anims.opening;
		}
		else{
			this.currentAnim = this.anims.closed;
		}
	},
	check:function(other){
		if( other instanceof EntityPlayer ) {
			
			if (ig.input.released('action') && ig.game.clickDelayTimer.delta() > 0 || ig.input.released('click') && ig.game.clickDelayTimer.delta() > 0 ) {
				if (!this.open && !this.opening){
					//Door is locked
					if (ig.game.clickDelayTimer.delta() > 0){
						ig.game.inspObjTxt = "This door is locked.";
						ig.game.objBoxOpen = ig.game.objBoxOpen ? false : true;
					}
				}
			}
			
		}
	}

});
ig.EntityPool.enableFor( EntityDoor );
});

	

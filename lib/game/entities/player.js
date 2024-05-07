ig.module(
	'game.entities.player'
)
.requires(
	'impact.entity',
	'impact.entity-pool'
)
.defines(function(){

EntityPlayer = ig.Entity.extend({

	type: ig.Entity.TYPE.A, 
	checkAgainst: ig.Entity.TYPE.NONE,
	collides: ig.Entity.COLLIDES.LITE,
	
	name:"player",
	
	
	maxVel: {x: 100, y: 200},
	friction: {x: 600, y: 0},
	
	size: {x: 64, y:64},
	offset: {x: 0, y: 0},
	mySpeed: 150,
	
	backSpawn: false,
	
	health: 20,
	
	animSheets: {
		player: new ig.AnimationSheet( 'media/player.png', 64, 64 ),
	},
	
	facingDir: "south",
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		//Move this entity to back?
		if (!ig.global.wm){
			this.teleportCheck();
		}
		
		//Timers
		this.passifyTimer = new ig.Timer(0);
		
		//Anim
		this.anims.idleN = new ig.Animation( this.animSheets.player, 1, [13], true );
		this.anims.idleE = new ig.Animation( this.animSheets.player, 1, [4], true );
		this.anims.idleS = new ig.Animation( this.animSheets.player, 1, [0], true );
		this.anims.idleW = new ig.Animation( this.animSheets.player, 1, [8], true );
		this.anims.walkN = new ig.Animation( this.animSheets.player, .15, [12,13,14,13]);
		this.anims.walkE = new ig.Animation( this.animSheets.player, .15, [4,5,7,6]);
		this.anims.walkS = new ig.Animation( this.animSheets.player, .15, [1,2,3,2]);
		this.anims.walkW = new ig.Animation( this.animSheets.player, .15, [8,9,11,10]);

	},
	reset: function( x, y, settings ) {
		this.parent( x, y, settings );
		//Do Things
		
		if (!ig.global.wm){
			this.teleportCheck();
		}
	},
	teleportCheck: function(){
		//Kill me if I am not supposed to spawn in this location
		if (ig.game.playerSpawnsBack && !this.backSpawn || !ig.game.playerSpawnsBack  && this.backSpawn){
			this.teleport();
		}
	},
	teleport: function(){
		if (ig.game.getEntityByName("tpPlayer")){
			var tpPlayer = ig.game.getEntityByName("tpPlayer");
			this.pos.x = tpPlayer.pos.x;
			this.pos.y = tpPlayer.pos.y;
		}
		else{
			console.log("I cant find the teleporter and im supposed to teleport.")
		}
	},
	update: function() {
		this.parent(); 
		
		this.zIndex = this.pos.y;
		if (!ig.game.dBoxUp && 
			!ig.game.objBoxOpen && 
			!ig.game.promptBoxOpen && 
			!ig.game.gettingPlayerInput && 
			!ig.game.sentChatResponse && 
			!ig.game.showingChatResponse && 
			!ig.game.computerOn &&
			!ig.game.pause ){
			this.freeToMove = true;	
		}
		else{
			this.freeToMove = false;	
		}
		this.checkCond();
		this.movements();
		this.animMe();
	},
	checkCond: function(){
		if (this.collides == ig.Entity.COLLIDES.PASSIVE && this.passifyTimer.delta() > 0){
			this.collides = ig.Entity.COLLIDES.LITE;
			console.log('player LITE')
		}
	},
	movements: function(){
		//X Movements
		if (!this.freeToMove){
			this.vel.x = 0;	
		}
		else if( ig.input.pressed('left') || ig.input.state('left') ){
			this.facingDir = "west";
			this.vel.x = -this.mySpeed;
		}
		else if(ig.input.pressed('right') || ig.input.state('right') ){
			this.facingDir = "east";
			this.vel.x = this.mySpeed;
		}
		else{
			this.vel.x = 0;	
		}
		//Y Movements
		if (!this.freeToMove){
			this.vel.y = 0;
		}
		else if( ig.input.pressed('up') || ig.input.state('up') ){
			this.facingDir = "north";
			this.vel.y = -this.mySpeed;
		}
		else if(ig.input.pressed('down') || ig.input.state('down') ){
			this.facingDir = "south";
			this.vel.y = this.mySpeed;
		}
		else{
			this.vel.y = 0;
		}
	},
	animMe: function(){
		if (this.facingDir == "north"){
			this.currentAnim = this.vel.y < 0 ? this.anims.walkN :this.anims.idleN; 
		}
		else if (this.facingDir == "east"){
			this.currentAnim = this.vel.x > 0 ? this.anims.walkE :this.anims.idleE; 
		}
		else if (this.facingDir == "south"){
			this.currentAnim = this.vel.y > 0 ? this.anims.walkS :this.anims.idleS; 
		}
		else if (this.facingDir == "west"){
			this.currentAnim = this.vel.x < 0 ? this.anims.walkW :this.anims.idleW; 
		}
	},
	passifyMe: function(){
		this.passifyTimer.set(.1);
		this.collides = ig.Entity.COLLIDES.PASSIVE;
		console.log('player passified');
	},
	handleMovementTrace: function( res ) {
		this.parent(res); 
	}

});
ig.EntityPool.enableFor( EntityPlayer );
});

	

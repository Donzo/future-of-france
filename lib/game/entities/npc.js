ig.module(
	'game.entities.npc'
)
.requires(
	'impact.entity',
	'impact.entity-pool'
)
.defines(function(){
   
EntityNpc = ig.Entity.extend({
	_wmDrawBox: true,
	_wmBoxColor: 'rgba(255,250,205,0.6)',
	_wmScalable: true,
	size:{x:96,y:96},
	maxVel: {x: 500, y: 500},
	offset: {x: 0, y: 0},
	
	//NPC Definition Variables
	who: false,
	mover: true, //This determines if NPC moves and should be set when placed in WM.
	passMe: false,
	
	//Movement Variables
	moving: false,
	moveTime: 1,
	
	idle: true,
	idleTime: 1,
	speed: 80,
	hitWall: false,
	facingDir: false,
	stepCount: 0,
	stepLimit: 3,
	anchorX: false,
	anchorY: false,
	range: 640,
	comfortRange: 420,
	discomfortX: false,
	discomfortY: false,
	unnamed: true,
	talking: false,
	bumped: false,
	bumpTime: .5,
	minLvlOrKill: 1,
	dontKillMe: false,
	
	checkAgainst: ig.Entity.TYPE.BOTH,
	type: ig.Entity.TYPE.NONE, // No Group
	collides: ig.Entity.COLLIDES.NEVER,
   
	animSheets: {
		person01: new ig.AnimationSheet( 'media/person-01.png', 64, 64 ),
		person02: new ig.AnimationSheet( 'media/person-02.png', 64, 64 ),
		person03: new ig.AnimationSheet( 'media/person-03.png', 64, 64 ),
		person04: new ig.AnimationSheet( 'media/person-04.png', 64, 64 ),
		robot01: new ig.AnimationSheet( 'media/robot-guard-01.png', 64, 64 ),
		robot02: new ig.AnimationSheet( 'media/robot-guard-02.png', 64, 64 ),
		robot03: new ig.AnimationSheet( 'media/robot-guard-03.png', 64, 64 ),
		robot04: new ig.AnimationSheet( 'media/robot-guard-04.png', 64, 64 ),
		robot05: new ig.AnimationSheet( 'media/robot-guard-05.png', 64, 64 ),
		scientist01: new ig.AnimationSheet( 'media/scientist-01.png', 64, 64 ),
		scientist02: new ig.AnimationSheet( 'media/scientist-02.png', 64, 64 ),
		scientist03: new ig.AnimationSheet( 'media/scientist-03.png', 64, 64 ),
		scientist04: new ig.AnimationSheet( 'media/scientist-04.png', 64, 64 ),
		scientist05: new ig.AnimationSheet( 'media/scientist-05.png', 64, 64 ),
		scientist06: new ig.AnimationSheet( 'media/scientist-06.png', 64, 64 ),
		soldier01: new ig.AnimationSheet( 'media/soldier-01.png', 64, 64 ),
		soldier02: new ig.AnimationSheet( 'media/soldier-02.png', 64, 64 ),
		soldier03: new ig.AnimationSheet( 'media/soldier-03.png', 64, 64 ),
		soldier04: new ig.AnimationSheet( 'media/soldier-04.png', 64, 64 ),
		youngwoman01: new ig.AnimationSheet( 'media/young-woman-01.png', 64, 64 ),
		youngwoman02: new ig.AnimationSheet( 'media/young-woman-02.png', 64, 64 ),
		youngwoman03: new ig.AnimationSheet( 'media/young-woman-03.png', 64, 64 ),
		businesswoman01: new ig.AnimationSheet( 'media/business-woman-01.png', 64, 64 ),
		businesswoman02: new ig.AnimationSheet( 'media/business-woman-02.png', 64, 64 ),
		businesswoman03: new ig.AnimationSheet( 'media/business-woman-03.png', 64, 64 ),
		youngman01: new ig.AnimationSheet( 'media/young-man-01.png', 64, 64 ),
		youngman02: new ig.AnimationSheet( 'media/young-man-02.png', 64, 64 ),
		oldman01: new ig.AnimationSheet( 'media/old-man-01.png', 64, 64 ),
	},
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		
		//Randomize movements so all characters dont move at exactly the same time
		var randomIdleTime = Math.floor((Math.random() * 300) + 100) / 100;
		this.moveTimer = new ig.Timer(0);
		this.idleTimer = new ig.Timer(randomIdleTime);
		this.bumpTimer = new ig.Timer(0);
		
		if (!ig.global.wm){
			this.deathCheck();
			if (this.mover){
				this.facingDir = "south";
				this.setAnchor();			
				this.setAnimSheet();
				this.setOffset();
			}
			this.nameMe();
		}
	},
	
	reset: function( x, y, settings ) {
	
		this.parent( x, y, settings );
		this.deathCheck();
		if (this.mover){
			this.facingDir = "south";
			this.setAnchor();			
			this.setAnimSheet();
			this.setOffset();
			var randomIdleTime = Math.floor((Math.random() * 300) + 100) / 100;
			this.idleTimer.set(randomIdleTime)
		}
		this.nameMe();
		
	},
	nameMe: function(){
		if (this.who && !this.passMe){
			this.name = "npc" + this.who;
			ig.game.spawnEntity( EntityCollisionobj, 0, 0, { following: this.name });
		}
		else{
			this.name = "npc" + this.who;
		}
	},
	setAnimSheet: function(){
	
		var animSheet = this.animSheets.person01;
		
		if (this.who == 1){
			animSheet = this.animSheets.person01;
		}
		else if (this.who == 2){
			animSheet = this.animSheets.person02;
		}
		else if (this.who == 3){
			animSheet = this.animSheets.person03;
		}
		else if (this.who == 4){
			animSheet = this.animSheets.person04;
		}
		else if (this.who == 5){
			animSheet = this.animSheets.scientist01;
		}
		else if (this.who == 6){
			animSheet = this.animSheets.scientist02;
		}
		else if (this.who == 7){
			animSheet = this.animSheets.scientist03;
		}
		else if (this.who == 8){
			animSheet = this.animSheets.scientist04;
		}
		else if (this.who == 9){
			animSheet = this.animSheets.robot01;
		}
		else if (this.who == 10){
			animSheet = this.animSheets.robot03;
		}
		else if (this.who == 11){
			animSheet = this.animSheets.robot04;
		}
		else if (this.who == 12){
			animSheet = this.animSheets.scientist05;
		}
		else if (this.who == 13){
			animSheet = this.animSheets.soldier01;
		}
		else if (this.who == 14){
			animSheet = this.animSheets.robot02;
		}
		else if (this.who == 15){
			animSheet = this.animSheets.soldier02;
		}
		else if (this.who == 16){
			animSheet = this.animSheets.soldier03;
		}
		else if (this.who == 17){
			animSheet = this.animSheets.soldier04;
		}
		else if (this.who == 18){
			animSheet = this.animSheets.robot05;
		}
		else if (this.who == 19){
			animSheet = this.animSheets.scientist06;
		}
		else if (this.who == 20){
			animSheet = this.animSheets.youngwoman01;
		}
		else if (this.who == 21){
			animSheet = this.animSheets.businesswoman01;
		}
		else if (this.who == 22){
			animSheet = this.animSheets.youngwoman02;
		}
		else if (this.who == 23){
			animSheet = this.animSheets.youngman01;
		}
		else if (this.who == 24){
			animSheet = this.animSheets.youngman02;
		}
		else if (this.who == 25){
			animSheet = this.animSheets.businesswoman02;
		}
		else if (this.who == 26){
			animSheet = this.animSheets.youngwoman03;
		}
		else if (this.who == 27){
			animSheet = this.animSheets.oldman01;
		}
		else if (this.who == 28){
			animSheet = this.animSheets.businesswoman03;
		}
		//Anim
		this.anims.idleN = new ig.Animation( animSheet, 1, [13], true );
		this.anims.idleE = new ig.Animation( animSheet, 1, [4], true );
		this.anims.idleS = new ig.Animation( animSheet, 1, [0], true );
		this.anims.idleW = new ig.Animation( animSheet, 1, [8], true );
		this.anims.walkN = new ig.Animation( animSheet, .1, [12,13,14,13]);
		this.anims.walkE = new ig.Animation( animSheet, .1, [4,6,7,5]);
		this.anims.walkS = new ig.Animation( animSheet, .1, [1,2,3,2]);
		this.anims.walkW = new ig.Animation( animSheet, .1, [8,10,11,9]);
	},
	deathCheck: function(){
		//Kill Entity if the Player Hasn't Passed a Certain Level
		if (this.minLvlOrKill > ig.game.madeItToLvl && !this.dontKillMe){
			this.passMe = true;
			this.kill();
		}
	},
	setAnchor: function(){
		this.anchorX = this.pos.x;
		this.anchorY = this.pos.y;
	},
	setOffset: function(){
		this.offset.x = -16;
		this.offset.y = -16;
	},
	update: function() {
		
		if (this.mover){
			this.checkCond();
			this.movement();
			//Set Animation
			this.animMe();
		}
		
		this.parent();
	},
	checkCond: function(){
		this.zIndex = this.pos.y;
		//Stop idle and Start Moving
		if (this.idle && this.idleTimer.delta() > 0){
			this.idle = false;
			this.moving = true;
			this.moveTimer.set(this.moveTime);
		}
		//Stop Moving and Start Idle
		if (this.moving && this.moveTimer.delta() > 0){
			this.moving = false;
			this.idle = true;
			this.idleTimer.set(this.idleTime);
			this.stepCount++;
		}
		
		//Become uncomfortable if out of range
		if (this.pos.x > this.anchorX + this.range || this.pos.x < this.anchorX - this.range){
			this.discomfortX = true;
		}
		if (this.pos.y > this.anchorY + this.range || this.pos.y < this.anchorY - this.range){
			this.discomfortY = true;
		}
		
		//Become comfortable if in range
		if (this.discomfortX && this.pos.x < this.anchorX + this.comfortRange && this.pos.x < this.anchorX - this.comfortRange){
			this.discomfortX = false;
		}
		if (this.discomfortY && this.pos.y < this.anchorY + this.comfortRange && this.pos.y < this.anchorY - this.comfortRange){
			this.discomfortY = false;
		}
		//End Bump
		if (this.bumped && this.bumpTimer.delta() > 0){
			this.bumped = false;
		}
		
	},
	setDirection: function(){
		if (this.stepCount > this.stepLimit){
			//Reset Step Counter and Set Limit
			this.stepCount = 0;
			this.stepLimit = Math.floor(Math.random() * 4) + 1;
			
			//Reset Wall Hit Var
			this.hitWall = false;
			
			
			//Choose Random Direction
			var randomDir = Math.floor(Math.random() * 1000) + 1;
			if (this.discomfortX){
				if (randomDir > 333){
					this.facingDir = this.pos.x > this.anchorX ? "west" : "east";
				}
				else{
					this.facingDir = this.pos.y > this.anchorY ? "south" : "north";
				}
			}
			else if (this.discomfortY){
				if (randomDir > 333){
					this.facingDir = this.pos.x > this.anchorX ? "west" : "east";
				}
				else{
					this.facingDir = this.pos.y > this.anchorY ? "south" : "north";
				}
			}
			else{
				if (randomDir >= 750){
					this.facingDir = "north";
				}
				else if (randomDir >= 500){
					this.facingDir = "east";
				}
				else if (randomDir >= 250){
					this.facingDir = "south";
				}
				else{
					this.facingDir = "west";
				}
			}
		}

	},
	movement: function(){
		
		if (!this.talking && !ig.game.pause){
			this.setDirection();
		}	
		if (this.idle || this.talking || ig.game.pause || this.bumped ){
			this.vel.x = 0;
			this.vel.y = 0;
		}
		else if (this.moving){
			
			if (this.facingDir == "north"){
				this.vel.x = 0;
				this.vel.y = -this.speed;
			}
			else if (this.facingDir == "east"){
				this.vel.x = this.speed;
				this.vel.y = 0;
			}
			else if (this.facingDir == "south"){
				this.vel.x = 0;
				this.vel.y = this.speed;
			}
			else if (this.facingDir == "west"){
				this.vel.x = -this.speed;
				this.vel.y = 0;
			}
			
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
	turnAround: function(){
		this.idle = false;
		this.moving = true;
		this.stepCount = 1;
		this.moveTimer.set(this.moveTime);
		
		if (this.facingDir == "north"){
			this.facingDir = "south";
		}
		else if (this.facingDir == "south"){
				this.facingDir = "north";
		}
		else if (this.facingDir == "east"){
			this.facingDir = "west";
		}
		else if (this.facingDir == "west"){
			this.facingDir = "east";
		}
	},
	turnRandomDirection: function() {
		this.idle = false;
		this.moving = true;
		this.stepCount = 1;
		this.moveTimer.set(this.moveTime);
		
		//All possible directions
		const directions = ["north", "south", "east", "west"];

		//Filter out the current facing direction to ensure the new direction is different
		let possibleDirections = directions.filter(dir => dir !== this.facingDir);

		//Randomly select from the remaining directions
		let randomIndex = Math.floor(Math.random() * possibleDirections.length);
		this.facingDir = possibleDirections[randomIndex];

	},
	facePlayer: function() {
		var player = ig.game.getEntityByName("player");

		var pCenPosX = player.pos.x + (player.size.x / 2);
		var pCenPosY = player.pos.y + (player.size.y / 2);

		var myCenterPosX = this.pos.x + (this.size.x / 2);
		var myCenterPosY = this.pos.y + (this.size.y / 2);

		//Calculate differences
		var dx = pCenPosX - myCenterPosX;
		var dy = pCenPosY - myCenterPosY;

		//Determine which axis has a greater difference
		if (Math.abs(dx) > Math.abs(dy)) {
			// Horizontal distance is greater than vertical distance
			if (dx > 0) {
				player.facingDir = "west"; // Player needs to face east
			}
			else{
				player.facingDir = "east"; // Player needs to face west
			}
		}
		else{
			// Vertical distance is greater or they are the same
			if (dy > 0) {
				player.facingDir = "north"; // Player needs to face south
			}
			else{
				player.facingDir = "south"; // Player needs to face north
			}
		}
	},
	faceNPC: function() {
		var player = ig.game.getEntityByName("player");

		var pCenPosX = player.pos.x + (player.size.x / 2);
		var pCenPosY = player.pos.y + (player.size.y / 2);

		var myCenterPosX = this.pos.x + (this.size.x / 2);
		var myCenterPosY = this.pos.y + (this.size.y / 2);

		//Calculate differences
		var dx = pCenPosX - myCenterPosX;
		var dy = pCenPosY - myCenterPosY;

		//Determine which axis has a greater difference
		if (Math.abs(dx) > Math.abs(dy)) {
			// Horizontal distance is greater than vertical distance
			if (dx > 0) {
				this.facingDir = "east";
			}
			else{
				this.facingDir = "west"; 
			}
		}
		else{
			// Vertical distance is greater or they are the same
			if (dy > 0) {
				this.facingDir = "south"; 
			}
			else{
				this.facingDir = "north"; 
			}
		}
	},
	bumpedPlayer: function(){
		if (!this.bumped){
			this.bumped = true;
			this.vel.x = 0;
			this.vel.y = 0;
			this.bumpTimer.set(this.bumpTime);
			this.turnRandomDirection();
		}
		
	},
	handleMovementTrace: function( res ) {
		var ranNum = Math.floor(Math.random() * 11) + 1;
		//Turn Around if I Hit a Wall
		if( res.collision.y){
			if (ranNum > 7){
				this.turnRandomDirection();
			}
			else if (this.facingDir == "north"){
				this.facingDir = "south";
			}
			else if (this.facingDir == "south"){
				this.facingDir = "north";
			}
		}

		if( res.collision.x){
			if (ranNum > 7){
				this.turnRandomDirection();
			}
			else if (this.facingDir == "east"){
				this.facingDir = "west";
			}
			else if (this.facingDir == "west"){
				this.facingDir = "east";
			}
		}
		
		this.parent(res); 
	},
	check:function(other){
		if( other instanceof EntityPlayer ) {
			if (ig.input.released('action') && ig.game.clickDelayTimer.delta() > 0 || ig.input.released('click') && ig.game.clickDelayTimer.delta() > 0) {
				//To measure text chunks
				var ctx = ig.system.context;
				
				if (this.who){
					if (!ig.game.dBoxUp) {
						ig.game.dBoxUp = true;
						ig.game.qCancelled = false;  
						//console.log('I am talking to ' + this.who)
						//Dynamically construct NPC key, padding only if this.who is less than 10
						var npcKey = 'npc' + (this.who < 10 ? this.who.toString().padStart(2, '0') : this.who);
						var npcData = ig.game.chatTxt[npcKey]; // Access the NPC data dynamically

						//Set NPC's name and prompt
						ig.game.curNpcName = npcData.name;
						//this.name = npcData.name;
						ig.game.npcAgentPrompt = npcData.agentPrompt;

						// Toggle between NPC text entries
						if (npcData.txt03){
							if (this.lastTxt == 1){
								ig.game.npcTxt = npcData.txt02;
								this.lastTxt = 2;
							}
							else if (this.lastTxt == 2){
								ig.game.npcTxt = npcData.txt03;
								this.lastTxt = 3;
							}
							else{
								ig.game.npcTxt = npcData.txt01;
								this.lastTxt = 1;
							}
						}
						else if (npcData.txt02){
							if (this.lastTxt == 1){
								ig.game.npcTxt = npcData.txt02;
								this.lastTxt = 2;
							}
							else{
								ig.game.npcTxt = npcData.txt01;
								this.lastTxt = 1;
							}
						}
						else{
							ig.game.npcTxt = npcData.txt01;
						}
						//Show chat prompt unless NPC doesnt chat
						if (!npcData.dontChat){
							if (npcData.conditional){
								ig.game.npcConditional = true;
							}
							ig.game.chatPrompt = true;
						}
						this.talking = true;
						ig.game.talkingTo = this.name;
						ig.game.playTalkingSound();
					}
					else{
						if (!ig.game.showChatPrompt){
							ig.game.advanceDialogue();
						}
					}

				}
				else if (!this.who){
					alert("I dont know who I am.")
				}
				//Give Chat Prompt if Prompting
				if (ig.game.chatPrompt ){
					//Check if this text will fit on a single slide.
					ig.game.oneSlideTxt = ig.game.dTool.measureText(ctx, ig.game.npcTxt, ig.game.DlBxWidth - (ig.game.DlBxMarginX * 2), ig.game.DlBxHeight - ( ig.game.DlBxMarginY * 2), ig.game.defaultLineHeight);
					if (ig.game.oneSlideTxt || ig.game.chatPrompt && (ig.game.dialogueNum + 1) == ig.game.dTool.textChunks.length){
						var dn =  (ig.game.dialogueNum + 1);
						ig.game.showChatPrompt = true;
						if (ig.game.npcConditional){
							console.log('has conditional')
							ig.game.spawnEntity( EntityConfirm, 0, 0, { name: "yes", cType: "npcConditional", cName: this.name  });	
							ig.game.spawnEntity( EntityConfirm, 0, 0, { name: "no",  cType: "npcConditional", cName: this.name  });
						}
						else{
							ig.game.spawnEntity( EntityConfirm, 0, 0, { name: "yes", cType: "chatResp", cName: this.name  });	
							ig.game.spawnEntity( EntityConfirm, 0, 0, { name: "no",  cType: "chatResp", cName: this.name  });		
						}
					}
				}
				//Face Player to NPC
				this.facePlayer();
				if (this.mover){
					this.faceNPC(); //Face NPC to Player
				}
				
				//Prevent Reopening Unintentional
				ig.game.clickDelayTimer.set(.33);
			}
			else if (ig.input.released('left') && ig.game.clickDelayTimer.delta() > 0){
				ig.game.rewindDialogue();
			}
		}
	}
});
EntityCollisionobj = ig.Entity.extend({
	size: {x: 14, y: 20},
	offset: {x: 0, y: 0},
	maxVel: {x: 0, y: 0},
	bounciness: 0, 
	dieTime: .6,
	type: ig.Entity.TYPE.NONE,
	checkAgainst: ig.Entity.TYPE.BOTH,
	collides: ig.Entity.COLLIDES.ACTIVE,
	
	following: false,

	init: function( x, y, settings ) {
		this.parent( x, y, settings );
	},
	reset: function( x, y, settings ) {

		this.parent( x, y, settings );
		//Put things here
	},

	update: function() {
		
		if (ig.game.getEntityByName(this.following)){
			var npc = ig.game.getEntityByName(this.following);
			var sizeBuffer = 38;
			this.pos.x = npc.pos.x + sizeBuffer + 3;
			this.pos.y = npc.pos.y + sizeBuffer;
		}
		if (ig.game.dBoxUp ){
			this.collides = ig.Entity.COLLIDES.NEVER;
		}
		else{
			this.collides = ig.Entity.COLLIDES.ACTIVE;
		}
		this.parent();
	},

	handleMovementTrace: function( res ) {
		this.pos.x += this.vel.x * ig.system.tick;
			this.pos.y += this.vel.y * ig.system.tick;
	},
	
	check: function( other ) {
		
		if (ig.game.getEntityByName('player') && this.following){
			if (ig.game.getEntityByName(this.following)){
				var npc = ig.game.getEntityByName(this.following);
				if (npc.vel.x != 0 || npc.vel.y != 0){
					npc.bumpedPlayer();									
					ig.game.sortEntitiesDeferred();
					
				}
			}
			
		}
	}
});
EntityThoughtbubble = ig.Entity.extend({

	size:{x:32,y:42},
	maxVel: {x: 0, y: 0},
	offset: {x: 0, y: 0},
	
	
	checkAgainst: ig.Entity.TYPE.NONE,
	type: ig.Entity.TYPE.NONE, // No Group
	collides: ig.Entity.COLLIDES.NEVER,
   
	animSheets: {
		thoughtBubble: new ig.AnimationSheet( 'media/thought-bubble.png', 32, 42 ),
	},
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		this.anims.thinking = new ig.Animation( this.animSheets.thoughtBubble, .35, [0,1,2,3,4,5,6,3,4,5,6,3,4,5,6,3,4,5,6,3,4,5,6,3,4,5,6,3,4,5,6,3,4,5,6,3,4,5,6,3,4,5,6,3,4,5,6,3,4,5,6] );
	},
	
	reset: function( x, y, settings ) {
		this.parent( x, y, settings );
		
	},

	update: function() {
		if (ig.game.chatResponseReceived){
			this.kill();
		}
		this.currentAnim = this.anims.thinking; 
		this.parent();
	},

	handleMovementTrace: function( res ) {	
		//No Collisions
		this.pos.x += this.vel.x * ig.system.tick;
		this.pos.y += this.vel.y * ig.system.tick;
	}
});
	ig.EntityPool.enableFor( EntityNpc );
	ig.EntityPool.enableFor( EntityCollisionobj );
	ig.EntityPool.enableFor( EntityThoughtbubble );
});
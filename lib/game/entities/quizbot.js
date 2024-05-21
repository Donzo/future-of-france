ig.module(
	'game.entities.quizbot'
)
.requires(
	'impact.entity',
	'impact.entity-pool'
)
.defines(function(){
   
EntityQuizbot = ig.Entity.extend({
	_wmDrawBox: true,
	_wmBoxColor: 'rgba(255,250,205,0.6)',
	size:{x:80,y:80},
	maxVel: {x: 0, y: 0},
	offset: {x: -8, y: -8},
	
	//Quizbot Definition Variables
	who: false,
	myQbFieldName: false,
	
	checkAgainst: ig.Entity.TYPE.BOTH,
	type: ig.Entity.TYPE.NONE, // No Group
	collides: ig.Entity.COLLIDES.FIXED,
   
	animSheets: {
		quizBot01: new ig.AnimationSheet( 'media/robot-guard-01.png', 64, 64 ),
		quizBot02: new ig.AnimationSheet( 'media/robot-guard-02.png', 64, 64 ),
		quizBot03: new ig.AnimationSheet( 'media/robot-guard-03.png', 64, 64 ),
		quizBot04: new ig.AnimationSheet( 'media/robot-guard-04.png', 64, 64 ),
		quizBot05: new ig.AnimationSheet( 'media/robot-guard-05.png', 64, 64 ),
	},
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		if (!ig.global.wm){
			this.deathCheck();
		}	
	},
	reset: function( x, y, settings ) {
		this.parent( x, y, settings );
		this.deathCheck();
	},
	deathCheck: function(){
		if (ig.game.madeItToLvl > ig.game.currentLvl){
			
			this.kill();
		}
		else{
			this.nameMe();
			this.setAnimSheet();
			this.setAnchorPoint();
		}
	},
	nameMe: function(){
		this.name = "quizBot" + this.who;
		var qbFieldName = "qbField" + this.who;
		this.myQbFieldName = qbFieldName;
		ig.game.spawnEntity( EntityQuizbotfield, this.pos.x, this.pos.y, { following: this.name, name: qbFieldName });	
	},
	setAnimSheet: function(){
	
		var animSheet = this.animSheets.quizBot01;
		
		if (this.who == 1){
			animSheet = this.animSheets.quizBot01;
		}
		else if (this.who == 2){
			animSheet = this.animSheets.quizBot03;
		}
		else if (this.who == 3){
			animSheet = this.animSheets.quizBot04;
		}
		else if (this.who == 4){
			animSheet = this.animSheets.quizBot02;
		}

		//Anim
		this.anims.idleS = new ig.Animation( animSheet, 1, [0], true );
		
	},
	setAnchorPoint: function(){
		this.anchorX = this.pos.x;
		this.anchorY = this.pos.y;
	},
	update: function() {
		
		this.checkCond();
		this.currentAnim = this.anims.idleS;
		
		//Lock me in place at anchor point so player cant push me around.
		this.pos.x = this.anchorX;
		this.pos.y = this.anchorY;
		
		this.parent();
	},
	checkCond: function(){
		this.zIndex = this.pos.y;	
	},
	letPlayerPass: function(){
		if (ig.game.getEntityByName(this.myQbFieldName)){
			var qbf = ig.game.getEntityByName(this.myQbFieldName);
			qbf.kill();
			//Spawn Which NPC (should be identical to me but not a quizbot)
			if (this.who == 1){
				ig.game.spawnEntity( EntityNpc, this.pos.x - 8, this.pos.y - 8, {who: 9, passMe: true, mover: true, dontKillMe: true}); 
				//passMe makes the entity not have collision field so that it cannot interfere with player's movement
				//dontKillMe prevents the death check from instantly killing this new NPC.
			}
			else if (this.who == 2){
				ig.game.spawnEntity( EntityNpc, this.pos.x - 8, this.pos.y - 8, {who: 10, passMe: true, mover: true, dontKillMe: true}); 
			}
			else if (this.who == 3){
				ig.game.spawnEntity( EntityNpc, this.pos.x - 8, this.pos.y - 8, {who: 11, passMe: true, mover: true, dontKillMe: true}); 
			}
			else if (this.who == 4){
				ig.game.spawnEntity( EntityNpc, this.pos.x - 8, this.pos.y - 8, {who: 14, passMe: true, mover: true, dontKillMe: true}); 
			}
			ig.game.turnOffMessageWithoutMe = true; //Robot will wander away and player may get stuck on msg.
			
			this.kill();
		}
		else{
			console.log('cant find my field (I am a quizbot) looking for '  + this.myQbFieldName);
		}
		
	},

	handleMovementTrace: function( res ) {

		
		this.parent(res); 
	},
	check:function(other){
		if( other instanceof EntityPlayer ) {
			
			var player = ig.game.getEntityByName('player');
			player.passifyMe();
			
		}

	}
});
EntityQuizbotfield = ig.Entity.extend({
	_wmDrawBox: true,
	_wmBoxColor: 'rgba(255,250,205,0.6)',
	size:{x:96,y:96},
	maxVel: {x: 0, y: 0},
	offset: {x: 0, y: 0},
	
	checkAgainst: ig.Entity.TYPE.BOTH,
	type: ig.Entity.TYPE.NONE, // No Group
	collides: ig.Entity.COLLIDES.NEVER,

	init: function( x, y, settings ) {
		this.parent( x, y, settings );
	},
	
	reset: function( x, y, settings ) {
	
		this.parent( x, y, settings );

	},


	update: function() {
		if (ig.game.getEntityByName(this.following)){
			var quizBot = ig.game.getEntityByName(this.following);
			var sizeBuffer = 8;
			this.pos.x = quizBot.pos.x - sizeBuffer;
			this.pos.y = quizBot.pos.y - sizeBuffer;
		}
		this.parent();
	},

	check:function(other){
		if( other instanceof EntityPlayer ) {
			if (ig.input.released('action') && ig.game.clickDelayTimer.delta() > 0 || ig.input.released('click') && ig.game.clickDelayTimer.delta() > 0) {
				//To measure text chunks
				var ctx = ig.system.context;
				
				if (ig.game.getEntityByName(this.following)){
					var quizBot = ig.game.getEntityByName(this.following);
					if (quizBot.who){
						if (!ig.game.dBoxUp) {
							ig.game.dBoxUp = true;   

							//Dynamically construct NPC key, padding only if this.who is less than 10
							var npcKey = 'quizBot' + (quizBot.who < 10 ? quizBot.who.toString().padStart(2, '0') : quizBot.who);
							var npcData = ig.game.quizBots[npcKey]; // Access the NPC data dynamically
							//Set NPC's name and prompt
							ig.game.curNpcName = npcData.name;
							//this.name = npcData.name;
							ig.game.npcAgentPrompt = npcData.agentPrompt;
							console.log('ig.game.npcAgentPrompt = ' + ig.game.npcAgentPrompt);

							ig.game.npcTxt = npcData.q01;

							ig.game.chatPrompt = true;
							quizBot.talking = true;
						}
						else{
							if (!ig.game.showChatPrompt){
								ig.game.advanceDialogue();
							}
						}

					}
					else{
						console.log('I dont know who Im with')
					}

				}
				else if (!quizBot.who){
					alert("I dont know who my quizbot is.")
				}
				//Give Chat Prompt if Prompting
				if (ig.game.chatPrompt ){
					//Check if this text will fit on a single slide.
					ig.game.oneSlideTxt = ig.game.dTool.measureText(ctx, ig.game.npcTxt, ig.game.DlBxWidth - (ig.game.DlBxMarginX * 2), ig.game.DlBxHeight - ( ig.game.DlBxMarginY * 2), ig.game.defaultLineHeight);
					if (ig.game.oneSlideTxt || ig.game.chatPrompt && (ig.game.dialogueNum + 1) == ig.game.dTool.textChunks.length){
						var dn =  (ig.game.dialogueNum + 1);
						ig.game.showChatPrompt = true;
						ig.game.spawnEntity( EntityConfirm, 0, 0, { name: "yes", cType: "chatResp" });	
						ig.game.spawnEntity( EntityConfirm, 0, 0, { name: "no",  cType: "chatResp", cName: this.name  });		
					}
				}

				//Prevent Reopening Unintentional
				ig.game.clickDelayTimer.set(.33);
			}
			else if (ig.input.released('left') && ig.game.clickDelayTimer.delta() > 0){
				ig.game.rewindDialogue();
			}
		}
		else if (other.mover){
			other.bumpedPlayer(); //Use this instead of turnaround because it has a timer to limit calls.
		}
	}
});
	ig.EntityPool.enableFor( EntityQuizbot );
	ig.EntityPool.enableFor( EntityQuizbotfield );
});
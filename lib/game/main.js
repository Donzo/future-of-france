ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',
	'game.entities.button',
	'game.entities.computerbutton',
	'game.entities.confirm',
	'game.entities.door',
	'game.entities.doorwaytop',
	'game.entities.levelchange',
	'game.entities.mutebutton',
	'game.entities.object',
	'game.entities.player',
	'game.entities.quizbot',
	'game.entities.teleportplayer',
	'game.levels.l1',
	'game.levels.l2',
	'game.levels.l3',
	'plugins.camera',
	'plugins.dialogue-tool',
	'plugins.npc-chat',
	'plugins.objects-txt',
	'plugins.quiz-bots',
	'impact.debug.debug',
)
.defines(function(){

	MyGame = ig.Game.extend({
	
		// Load a font
		font: new ig.Font( 'media/04b03.font.png' ),
		
		dBoxUp: false,
		objBoxOpen: false,
		dialogueNum: 0,
		chatBotResponse: false,
		curNpcName: false,
		sortAllEntitiesTime: 2,
		currentLvl: 1,
		madeItToLvl: 1,
		playerSpawnsBack: false,
		dontChat: false,
		
		color1: "#0047AB",
		color2: "#FF2136",
		color3: "#F8F8FF",
		color4: "#8A2BE2",
		color5: "#39FF14",
		color6: "#383838",
		color7: "#191970",
		color8: "#FF8C00",
		fadeColor: this.color3,
		slideColor: this.color3,
		
		fontClr1: "#FF8C00",
		strokeClr1: "#191970",
		fontClr2: "#F8F8FF",
		storkeClr2: "#191970",
		defaultFontSize: 40,
		defaultFontFace: "Sans-serif",
		defaultLineHeight: 44,
		defaultStrokeWidth: 4,
		cursorBlinkRate: .5,
		cursorVisible: true,
		
		atTitleScreen: true,
		introOn: false,
		pause: true,
		
		//Cut Txt Vars
		cutScreenOn: false,
		cutTxtCount: 1,
		cutTxtEndCount: 2,
		endCutTxt: false,
		
		//Music Vars
		muteGame: false,
		musicLevel: .25,
	
		//Mute Buttons
		buttonMute: new ig.Image( 'media/buttons-and-logos/button-mute.png' ),
		buttonMuted: new ig.Image( 'media/buttons-and-logos/button-muted.png' ),
	
		cutTxt: {
			"ct1":"foo",
			"ct2":"bar",
		},
		//Preloaded Songs
		songs: {
			l1: new ig.Sound('media/music/fathoms.*', false ),
			l2: new ig.Sound('media/music/gandalf.*', false ),
			l3: new ig.Sound('media/music/thorn.*', false ),
			l4: new ig.Sound('media/music/entities.*', false ),
			l5: new ig.Sound('media/music/zod.*', false ),
			l6: new ig.Sound('media/music/intro.*', false )
		},
		init: function() {

			ig.input.bind(ig.KEY.MOUSE1, 'click');
			ig.input.bind( ig.KEY.UP_ARROW, 'up' );
			ig.input.bind( ig.KEY.DOWN_ARROW, 'down' );
			ig.input.bind( ig.KEY.LEFT_ARROW, 'left' );
			ig.input.bind( ig.KEY.RIGHT_ARROW, 'right' );
			ig.input.bind( ig.KEY.SPACE, 'action' );
			
			//Load Title Screen images into impact
			this.loadTSImages();
			
			this.transitionTimer = new ig.Timer(0);
			this.clickDelayTimer = new ig.Timer(0);
			this.sortEntitiesTimer = new ig.Timer(5);
			this.blinkTimer = new ig.Timer(this.cursorBlinkRate);
			
			//Call for Dialogue Tool
			this.dTool = new DialogueTool();
			
			//this.loadLevel(LevelL1);
			
			this.getAndLoadCurrentLevel();
			
			//Load Level
			//this.LoadLevelBro(1);
			
			ig.game.spawnEntity( EntityButton, 0, 0, { name: "start" });	
			ig.game.spawnEntity( EntityButton, 0, 0, { name: "continue" });
			ig.game.spawnEntity( EntityMutebutton, 0, 0);
			
			//Instantiate Camera
			this.setupCamera();
			
			//Call for Chat Text
			this.chatTxt = new NpcChat();
			
			//Call for Object Text
			this.objTxt = new ObjectsTxt();
			
			//Call for Quiz Bots
			this.quizBots = new QuizBots();
			
			//MUSIC
			ig.music.add (this.songs.l1, 01, ["l1"] );
			ig.music.add (this.songs.l2, 02, ["l2"] );
			ig.music.add (this.songs.l3, 03, ["l3"] );
			ig.music.add (this.songs.l4, 04, ["l4"] );
			ig.music.add (this.songs.l5, 05, ["l5"] );
			ig.music.add (this.songs.l6, 06, ["l6"] );
			
			ig.music.loop = true;
			ig.music.volume = this.musicLevel;	
			
			//Dialog Box Vars
			this.setDialogBoxVars();
			
			checkMyConnection();
		},
		getAndLoadCurrentLevel: function(){
			console.log('check for progress here.')
		},
		
		playMusicBro: function(which){
			//Stop any sounds that might be playing when music is called
			//ig.game.deadSound.stop();
			ig.music.stop();	
			
			if(which == 1){
				this.songs.l1.loop = true;
				this.songs.l1.volume = .25;
				this.songs.l1.play();
			}	
			else if(which == 2){
				ig.game.musicLevel = .25;
				ig.music.play(02);	
			}
			else if(which == 3){
				ig.game.musicLevel = .25;
				ig.music.play(03);	
			}
			else if(which == 4){
				ig.game.musicLevel = .3;
				ig.music.play(04);	
			}
			else if(which == 5){
				ig.game.musicLevel = .25;
				ig.music.play(05);	
			}
			else if(which == 6){
				ig.game.musicLevel = .25;
				ig.music.play(06);	
			}
		
			if (!ig.game.muteGame){
				ig.music.volume = ig.game.musicLevel;
			}
			else{
				ig.music.volume = 0;
			}	
		},
		connectToSite: function(){
			if (window['userAccountNumber']){ //Player is already connected to the site
				ig.game.inspObjTxt = "Your wallet is already connected. Opening door...";
				ig.game.promptBoxOpen = false;
				ig.game.objBoxOpen = true;
				ig.game.openThisDoor = 1; //Open Door 1
				ig.game.killThisObject = true; //Kill Terminal Interaction Object
			}
			else{ //Initiate First Connect Procedure (connect wallet and input user in database)
				firstConnection = true;
				connectMyWallet();
			}
		},
		openDoor: function(doorNum){
			var name = "door" + doorNum;
			if (ig.game.getEntityByName(name)){
				var door = ig.game.getEntityByName(name);
				door.openThisDoor();
			}
			else{
				console.log('cant find entity by name ' + name);
			}
		},
		LoadLevelBro: function(currentLvlNum){
			this.currentLvl = currentLvlNum;
			//Get level string
			var whichLvl =  parseInt(currentLvlNum);
			//Turn string into object reference
			var lvlStr = eval("LevelL" + whichLvl);
	
			this.loadLevel( lvlStr );
			this.entitiesSorted = false;
			this.sortEntitiesTimer.set(3);
			this.setupCamera();
			ig.game.spawnEntity( EntityMutebutton, 0, 0);
		},
		setupCamera: function() {
			// Set up the camera. The camera's center is at a third of the screen
			// size, i.e. somewhat shift left and up. Damping is set to 3px.		
			this.camera = new Camera( ig.system.width/2, ig.system.height/2, 5 );		
			this.camera.trap.size.x = ig.system.width/4;
	   		this.camera.trap.size.y = ig.system.height/4;
	   		this.camera.lookAhead.x = 0;
		
			// Set camera's screen bounds and reposition the trap on the player
    		this.camera.max.x = this.collisionMap.pxWidth - ig.system.width;
    		this.camera.max.y = this.collisionMap.pxHeight - ig.system.height;
			
			if (ig.game.getEntityByName('player')){
				var player = ig.game.getEntityByName('player');
				this.camera.set( player );
			}
		},
		
		update: function() {
			// Update all entities and backgroundMaps
			this.parent();
			
			//Cut Screen
			if (this.cutScreenOn){
				//Advance Cut Screen Text
				if ( ig.input.pressed('action') || ig.input.released('click')){
					this.handleCutTxtSeq();
				}
			}
			
			if (ig.game.turnOffMessageWithoutMe && ig.input.released('click')){
				ig.game.turnOffMessageWithoutMe = false;
				ig.game.objBoxOpen = false;
				ig.game.chatPrompt = false;
				ig.game.dBoxUp = false;
			}
			
			if (ig.game.getEntityByName('player')){
				var player = ig.game.getEntityByName('player');
				this.camera.follow( this.player );
			}
			//Sort Entites
			if (this.sortEntitiesTimer.delta() > 0){
				ig.game.sortEntitiesDeferred();
				this.sortEntitiesTimer.set(this.sortAllEntitiesTime)
			}
		},
		
		draw: function() {
			// Draw all entities and backgroundMaps
			this.parent();
			
			if (ig.game.computerOn){
				this.drawComputerScreen();
			}
			else if (ig.game.gettingPlayerInput){
				this.drawChatBox();
			}
			else if (this.dBoxUp){
				this.drawDialogueBox();
			}
			else if (this.promptBoxOpen){
				this.drawPromptBox();
			}
			else if (this.objBoxOpen){
				this.drawObjBox();
			}
			else if (window['userAccountNumber']){
				this.font.draw("Connected As: " + window['userAccountNumber'], ig.system.width - 276, 5, ig.Font.ALIGN.LEFT );
				this.drawMuteButton();
			}
			if (this.cutScreenOn){
				this.drawCutTxt()
			}
			if (this.atTitleScreen){
				this.drawTitleScreen();
			}
			
			if (this.transition){
				this.drawTransition();
			}
		},
		passQuizBot: function(){
			if (this.currentLvl == 1){
				//Get robot by name and call his transform function.
				"quizBot" + this.who;
				if (ig.game.getEntityByName("quizBot1")){
					var qb = ig.game.getEntityByName("quizBot1");
					qb.letPlayerPass();
					
				}
				else{
					console.log('cant find quizBot1 what the hell is it?');
				}
			}
		},
		drawMuteButton: function(){
			var bRight = ig.system.width - 42;
			var bTop = 15;
			
			if (this.muteGame){
				bRight = ig.system.width - 42;
				this.buttonMuted.draw(bRight, bTop);	
			}
			else{
				bRight = ig.system.width - 42;
				this.buttonMute.draw(bRight, bTop);	
			}
		},
		drawDialogueBox: function(){
			var ctx = ig.system.context;
			
			this.setDialogBoxVars();
			
			var txtX = ig.game.DlBxL + ig.game.DlBxMarginX;
			var txtY = ig.game.DlBxT + ig.game.DlBxMarginY + this.defaultLineHeight;
			var txtBxWidth = ig.game.ObjBxWidth - (ig.game.DlBxMarginX  * 2);
			
			//Draw Prompt Box if Prompted to Chat.
			if (!ig.game.showChatPrompt){																		//Frame Clr		  //BoxBG
				this.drawABox(ig.game.DlBxL, ig.game.DlBxR, ig.game.DlBxT, ig.game.DlBxB, 4, "#F8F8FF", true, "#383838", 1, .6 );
				// prepareTextChunks: function(context, text, maxWidth, maxHeight, lineHeight) {
			}
			else{
				this.drawPromptBox();
			}
			this.dTool.prepareTextChunks(ctx, ig.game.npcTxt, ig.game.DlBxWidth - (ig.game.DlBxMarginX * 2), ig.game.DlBxHeight - ( ig.game.DlBxMarginY * 2), this.defaultLineHeight);
	   		this.showDialogue(ig.game.dialogueNum);	   		

		},
		setDialogBoxVars: function(){
			//Make sure dialogue box variables are initialized
			ig.game.DlBxWidth = ig.system.width * .9;
			ig.game.DlBxHeight = ig.system.height *.35;
			ig.game.DlBxL = ig.system.width * .05;
			ig.game.DlBxR = ig.game.DlBxL + ig.game.DlBxWidth;
			ig.game.DlBxT = ig.system.height *.05;
			ig.game.DlBxB = ig.game.DlBxT + ig.game.DlBxHeight;
			ig.game.DlBxMarginX = ig.system.width *.02;
			ig.game.DlBxMarginY = ig.system.height *.02;
		},
		drawObjBox: function(){
			var ctx = ig.system.context;
			
			ig.game.ObjBxWidth = ig.system.width * .9;
			ig.game.ObjBxHeight = ig.system.height *.35;
			ig.game.ObjBxL = ig.system.width * .05;
			ig.game.ObjBxR = ig.game.ObjBxL + ig.game.ObjBxWidth;
			ig.game.ObjBxT = ig.system.height *.05;
			ig.game.ObjBxB = ig.game.ObjBxT + ig.game.ObjBxHeight;
			ig.game.ObjBxMarginX = ig.system.width *.02;
			ig.game.ObjBxMarginY = ig.system.height *.02;
			
			var txtX = ig.game.ObjBxL + ig.game.ObjBxMarginX;
			var txtY = ig.game.ObjBxT + ig.game.ObjBxMarginY + this.defaultLineHeight;
			var txtBxWidth = ig.game.ObjBxWidth - (ig.game.ObjBxMarginX  * 2);
																									//Frame Clr		  //BoxBG
			this.drawABox(ig.game.ObjBxL, ig.game.ObjBxR, ig.game.ObjBxT, ig.game.ObjBxB, 4, "#F8F8FF", true, "#383838", 1, .6 );
			this.wordWrap(ig.game.inspObjTxt, 40, "#FF8C00", txtX, txtY, txtBxWidth, this.defaultLineHeight, true, "#191970", this.defaultStrokeWidth ); //FF8C00 191970
				//wordWrap: function(text, fontpx, fontColor, x, y, maxWidth, varLineHeight, stroke, strokeColor, strokeWidth) {		
		},
		setObjBoxParams: function(){
			ig.game.ObjBxWidth = ig.system.width * .9;
			ig.game.ObjBxHeight = ig.system.height *.35;
			ig.game.ObjBxL = ig.system.width * .05;
			ig.game.ObjBxR = ig.game.ObjBxL + ig.game.ObjBxWidth;
			ig.game.ObjBxT = ig.system.height *.05;
			ig.game.ObjBxB = ig.game.ObjBxT + ig.game.ObjBxHeight;
			ig.game.ObjBxMarginX = ig.system.width *.02;
			ig.game.ObjBxMarginY = ig.system.height *.02;
		},
		
		setPromptBoxParams: function(){
			//Prompt Box Responses
			ig.game.promptRespBoxWidth = (ig.game.ObjBxWidth - ig.game.ObjBxMarginX) / 2;
			ig.game.promptBoxHeight = ig.system.height *.12;
			ig.game.promptRespYesX = ig.game.ObjBxL;
			ig.game.promptRespNoX = ig.game.ObjBxR - ig.game.promptRespBoxWidth;
			ig.game.promptRespY = ig.game.ObjBxB + ig.game.ObjBxMarginY;
		},
		drawPromptBox: function(){
			var ctx = ig.system.context;
			
			this.setObjBoxParams();
			this.setPromptBoxParams();
			
			var txtX = ig.game.ObjBxL + ig.game.ObjBxMarginX;
			var txtY = ig.game.ObjBxT + ig.game.ObjBxMarginY + this.defaultLineHeight;
			var txtBxWidth = ig.game.ObjBxWidth - (ig.game.ObjBxMarginX  * 2);
			
			var frameClr =  "#F8F8FF";
			var bxBgClr = "#383838";
			var hoverBxBgClrY = "#39FF14";
			var hoverBxBgClrN = "#FF2136";
								
																						//Frame Clr		  //BoxBG
			this.drawABox(ig.game.ObjBxL, ig.game.ObjBxR, ig.game.ObjBxT, ig.game.ObjBxB, 4, frameClr, true, bxBgClr, 1, .6 );
			
			//If Using This For Chat Don't Word Wrap
			if (!ig.game.showChatPrompt){
				this.wordWrap(ig.game.inspObjTxt, 40, "#FF8C00", txtX, txtY, txtBxWidth, this.defaultLineHeight, true, "#191970", this.defaultStrokeWidth ); //FF8C00 191970
				//wordWrap: function(text, fontpx, fontColor, x, y, maxWidth, varLineHeight, stroke, strokeColor, strokeWidth) {		
			}
			var rFontSz = 30;
			
			//Yes
			if (ig.game.yesPromptHover){
				this.drawABox(ig.game.promptRespYesX, ig.game.promptRespYesX + ig.game.promptRespBoxWidth, ig.game.promptRespY, ig.game.promptRespY + ig.game.promptBoxHeight, 4, frameClr, true, hoverBxBgClrY, 1, .6 );
			}
			else{
				this.drawABox(ig.game.promptRespYesX, ig.game.promptRespYesX + ig.game.promptRespBoxWidth, ig.game.promptRespY, ig.game.promptRespY + ig.game.promptBoxHeight, 4, frameClr, true, bxBgClr, 1, .6 );
			}
			var yTxt = "Yes";
			if (ig.game.showingChatResponse){
				yTxt = "Say Something Else";
			}
			
			var myFontFace = this.defaultFontFace;
			ctx.font = `30px '${myFontFace}', sans-serif`; // Lock in Font Face and Size for Measuring 
			var yTxtCen = ig.game.promptRespYesX + (ig.game.promptRespBoxWidth / 2);
			var myTxtWidth = ctx.measureText(yTxt).width;
			var yTxtX = yTxtCen - (myTxtWidth /2);
			
			var ynTxtY = ig.game.promptRespY + (ig.game.promptBoxHeight / 2) + (30 / 2);
			
			//No
			if (ig.game.noPromptHover){
				this.drawABox(ig.game.promptRespNoX, ig.game.promptRespNoX + ig.game.promptRespBoxWidth, ig.game.promptRespY, ig.game.promptRespY + ig.game.promptBoxHeight, 4, frameClr, true, hoverBxBgClrN, 1, .6 );
			}
			else{
				this.drawABox(ig.game.promptRespNoX, ig.game.promptRespNoX + ig.game.promptRespBoxWidth, ig.game.promptRespY, ig.game.promptRespY + ig.game.promptBoxHeight, 4, frameClr, true, bxBgClr, 1, .6 );
			}
			var nTxt = "No";
			if (ig.game.showingChatResponse){
				nTxt = "End Conversation";
			}
			var nTxtCen = ig.game.promptRespNoX + (ig.game.promptRespBoxWidth / 2);
			myTxtWidth = ctx.measureText(nTxt).width;
			var nTxtX = nTxtCen - (myTxtWidth /2);
			
			
			
			//Write Words on Buttons
			this.wordWrap(yTxt, rFontSz, "#FF8C00", yTxtX, ynTxtY, txtBxWidth, rFontSz * 1.1, true, "#191970", rFontSz * .1 );
			this.wordWrap(nTxt, rFontSz, "#FF8C00", nTxtX, ynTxtY, txtBxWidth, rFontSz * 1.1, true, "#191970", rFontSz * .1 );
			
		},
		drawComputerScreen: function(){
			var ctx = ig.system.context;
			var outerFrameClr = "#D3D3D3";
			var frameClr = "#808080";
			var bgClr = "#008000";
			var frameWidth = 40;
			var fMargin = frameWidth / 2;
			this.drawABoxOld(0, ig.system.width, 0, ig.system.height, 1, outerFrameClr, true, outerFrameClr);
			this.drawABoxOld(frameWidth, ig.system.width - frameWidth, frameWidth, ig.system.height - frameWidth, frameWidth, frameClr, true, bgClr);
			
			this.drawComputerDisplay(1);
		},
		drawComputerDisplay: function(which){
			var frameWidth = 40;
			
			var ctx = ig.system.context;
			//Wallet Install Display
			if (which == 1){
				//This can be set in other places
				ig.game.csTitleTxt = " Install a Browser Wallet";
				var tTxtSize = 40;
				var fontF = "Jersey 10 Charted";
				//Change Font to Measure Correctly
				ctx.font = `${tTxtSize}px '${fontF}', sans-serif`; 
				var myTxtWidth = ctx.measureText(ig.game.csTitleTxt).width;
				var tTxtX = (ig.system.width / 2) - (myTxtWidth /2);
				var tTxtY = 110;
			
				//Title Text
				this.wordWrap(ig.game.csTitleTxt, tTxtSize, "#F8F8FF", tTxtX, tTxtY, ig.system.width - frameWidth * 2, tTxtSize * 1.1, false, "#383838", tTxtSize * .1, fontF);
			

				//Icon Parameters
				ig.game.icnButHeight = 100;
				ig.game.icnButWidth = ig.game.icnButHeight;
				var iconTxtSize = 18;
				fontF = "Jersey 10"
				//Change Font Again to Measure Correctly
				ctx.font = `${iconTxtSize}px '${fontF}', sans-serif`; 
			
				//MetaMask Icon
				ig.game.icnMetaMaskX = 100;
				ig.game.icnMetaMaskY = 250;
				
				ig.game.icnPhantomX = ig.game.icnMetaMaskX + ig.game.icnButWidth * 2;
				ig.game.icnPhantomY = ig.game.icnMetaMaskY;
				//Logout Icon
				ig.game.icnLogOutX = ig.system.width - 200;
				ig.game.icnLogOutY = ig.system.height - 200;
				
				ctx.drawImage(this.iconMetaMask, ig.game.icnMetaMaskX, ig.game.icnMetaMaskY, ig.game.icnButWidth, ig.game.icnButHeight );
				ctx.drawImage(this.iconPhantom, ig.game.icnPhantomX, ig.game.icnPhantomY, ig.game.icnButWidth, ig.game.icnButHeight );
				ctx.drawImage(this.iconLogOut, ig.game.icnLogOutX, ig.game.icnLogOutY, ig.game.icnButWidth, ig.game.icnButHeight );
				
				var mmIconTxt = "MetaMask";
				var mmIconTxtWidth = ctx.measureText(mmIconTxt).width;
				var mmIcnTxtX = (ig.game.icnMetaMaskX + ig.game.icnButWidth / 2) - (mmIconTxtWidth / 2);
				var mmIcnTxtY = ig.game.icnMetaMaskY + ig.game.icnButHeight + iconTxtSize * 1.1;
			
				var phIconTxt = "Phantom";
				var phIconTxtWidth = ctx.measureText(phIconTxt).width;
				var phIcnTxtX = (ig.game.icnPhantomX + ig.game.icnButWidth / 2) - (mmIconTxtWidth / 2);
				var phIcnTxtY = ig.game.icnMetaMaskY + ig.game.icnButHeight + iconTxtSize * 1.1;

				var loIconTxt = "Log Out";
				var loIconTxtWidth = ctx.measureText(loIconTxt).width;
				var loIcnTxtX = (ig.game.icnLogOutX + ig.game.icnButWidth / 2) - (loIconTxtWidth / 2) - 10; //Minus more because it looks offcenter
				var loIcnTxtY = ig.game.icnLogOutY + ig.game.icnButHeight + iconTxtSize * 1.1;
			
			
			
				//MetaMask Icon Txt
				this.wordWrap(mmIconTxt, iconTxtSize, "#F8F8FF", mmIcnTxtX, mmIcnTxtY, ig.system.width - frameWidth * 2, ig.game.icnButWidth, false, "#383838", iconTxtSize * .1, fontF );
				//Phantom Icon Txt
				this.wordWrap(phIconTxt, iconTxtSize, "#F8F8FF", phIcnTxtX, phIcnTxtY, ig.system.width - frameWidth * 2, ig.game.icnButWidth, false, "#383838", iconTxtSize * .1, fontF );

				//Logout Icon Txt
				this.wordWrap(loIconTxt, iconTxtSize, "#F8F8FF", loIcnTxtX, loIcnTxtY, ig.system.width /2, ig.game.icnButWidth, false, "#383838", iconTxtSize * .1, "Jersey 10" );
			}			
			
		},
		drawChatBox: function(){
			var ctx = ig.system.context;
			
			
			this.setObjBoxParams();
			this.setPromptBoxParams();
			
			
			var txtX = ig.game.ObjBxL + ig.game.ObjBxMarginX;
			var txtY = ig.game.ObjBxT + ig.game.ObjBxMarginY + this.defaultLineHeight;
			var txtBxWidth = ig.game.ObjBxWidth - (ig.game.ObjBxMarginX  * 2);
			
			var frameClr =  "#F8F8FF";
			var bxBgClr = "#383838";
			var hoverBxBgClrY = "#FF8C00";
			var hoverBxBgClrN = "#191970";
								
																						//Frame Clr		  //BoxBG
			this.drawABox(ig.game.ObjBxL, ig.game.ObjBxR, ig.game.ObjBxT, ig.game.ObjBxB, 4, frameClr, true, bxBgClr, 1, .6 );
			
			
			//Player Input
			if (this.pInput){
				this.wordWrap("YOU: " + this.pInput, 40, "#39FF14", txtX, txtY, txtBxWidth, this.defaultLineHeight, true, "#8A2BE2", this.defaultStrokeWidth ); //FF8C00 191970
			}
			else if (this.playerLastInput){
				this.wordWrap("YOU: " + this.playerLastInput, 40, "#39FF14", txtX, txtY, txtBxWidth, this.defaultLineHeight, true, "#8A2BE2", this.defaultStrokeWidth ); //FF8C00 191970

			}
			else{
				this.wordWrap("YOU: ", 40, "#39FF14", txtX, txtY, txtBxWidth, this.defaultLineHeight, true, "#8A2BE2", this.defaultStrokeWidth ); //FF8C00 191970
			}
			
			//Blinking Cursor
			this.updateCursorBlink();
			
			if (this.cursorVisible){
				this.drawInputCursor();
			}	
				
			var rFontSz = 30;
			
			//Yes
			if (ig.game.yesPromptHover){
				this.drawABox(ig.game.promptRespYesX, ig.game.promptRespYesX + ig.game.promptRespBoxWidth, ig.game.promptRespY, ig.game.promptRespY + ig.game.promptBoxHeight, 4, frameClr, true, hoverBxBgClrY, 1, .6 );
			}
			else{
				this.drawABox(ig.game.promptRespYesX, ig.game.promptRespYesX + ig.game.promptRespBoxWidth, ig.game.promptRespY, ig.game.promptRespY + ig.game.promptBoxHeight, 4, frameClr, true, bxBgClr, 1, .6 );
			}
			var yTxt = "Yes";
			if (ig.game.gettingPlayerInput){
				var yTxt = "Say This";
			}
			var yTxtCen = ig.game.promptRespYesX + (ig.game.promptRespBoxWidth / 2);
			var myTxtWidth = ctx.measureText(yTxt).width;
			var yTxtX = yTxtCen - (myTxtWidth /2);
			
			var ynTxtY = ig.game.promptRespY + (ig.game.promptBoxHeight / 2) + (rFontSz / 2);
			
			//No
			if (ig.game.noPromptHover){
				this.drawABox(ig.game.promptRespNoX, ig.game.promptRespNoX + ig.game.promptRespBoxWidth, ig.game.promptRespY, ig.game.promptRespY + ig.game.promptBoxHeight, 4, frameClr, true, hoverBxBgClrN, 1, .6 );
			}
			else{
				this.drawABox(ig.game.promptRespNoX, ig.game.promptRespNoX + ig.game.promptRespBoxWidth, ig.game.promptRespY, ig.game.promptRespY + ig.game.promptBoxHeight, 4, frameClr, true, bxBgClr, 1, .6 );
			}
			var nTxt = "No";
			if (ig.game.gettingPlayerInput){
				var nTxt = "Nevermind";
			}
			var nTxtCen = ig.game.promptRespNoX + (ig.game.promptRespBoxWidth / 2);
			myTxtWidth = ctx.measureText(nTxt).width;
			var nTxtX = nTxtCen - (myTxtWidth /2);
			
			
			//Write Words on Buttons
			this.wordWrap(yTxt, rFontSz, "#FF8C00", yTxtX, ynTxtY, txtBxWidth, rFontSz * 1.1, true, "#191970", rFontSz * .1 );
			this.wordWrap(nTxt, rFontSz, "#FF8C00", nTxtX, ynTxtY, txtBxWidth, rFontSz * 1.1, true, "#191970", rFontSz * .1 );
			
		},
		updateCursorBlink: function(){
			if (this.blinkTimer.delta() > 0) {
				this.cursorVisible = !this.cursorVisible;
				this.blinkTimer.set(this.cursorBlinkRate);
			}
		},
		drawInputCursor: function(){
			var ctx = ig.system.context;
			var height = 40;
			var x = ig.game.lastCursorPosX + 10;
			var y = ig.game.lastCursorPosY;
			
			ctx.beginPath();
			ctx.moveTo(x, y);
			ctx.lineTo(x, y + height);
			//
			ctx.strokeStyle = "#0047AB";
			ctx.lineWidth = 30; // Adjust thickness of the cursor
			ctx.stroke();
		},
		showDialogue: function(which){
			var ctx = ig.system.context;
			
			var storedML = ctx.miterLimit;
			ctx.miterLimit = 2; // Keeps Some Letters from Getting Too Close
			
			//displayTextChunk: function(context, chunk, x, startY, lineHeight, stroke, strokeColor, strokeWidth) {
			this.dTool.displayTextChunk(ctx, this.dTool.textChunks[which], ig.game.DlBxL + ig.game.DlBxMarginX, ig.game.DlBxT + ig.game.DlBxMarginY + 40, this.defaultLineHeight, true, '#191970', this.defaultStrokeWidth);
			
			ctx.miterLimit = storedML;  // Restore original miter limit
		},
		resetTxtVars: function(){
			ig.game.promptBoxOpen = false;
			ig.game.showChatPrompt = false;
			ig.game.oneSlideTxt = false;
			ig.game.chatPrompt = false;
			ig.game.dBoxUp = false;
			ig.game.longObjTxt = false;
			ig.game.dialogueNum = 0;
			ig.game.dTool.textChunks.length = 0;
			ig.game.dTool.isItalic = false;
			ig.game.dTool.color2 = false;
			ig.game.dTool.color3 = false;
			ig.game.showingChatResponse = false;
			ig.game.sentChatResponse = false;
			ig.game.computerOn = false;
			ig.game.dontChat = false;
			ig.game.clickDelayTimer.set(.33);
		},
		advanceDialogue: function() {
			if (this.dTool.textChunks.length > (ig.game.dialogueNum + 1)){
				ig.game.dialogueNum++;
			}
			else{
				this.resetTxtVars();
			}
			if (this.dTool.currentChunkIndex < this.dTool.textChunks.length - 1) {
				this.dTool.currentChunkIndex++;
			}
		},
		rewindDialogue: function() {
			if (ig.game.dialogueNum > 0){
				ig.game.dialogueNum--;
				this.dTool.currentChunkIndex--;
				ig.game.showChatPrompt = false;
			}

		},
		
		drawABox: function(lx, rx, ty, by, lineWidth, lineColor, fill, fillcolor, opacityL, opacityF){
			var ctx = ig.system.context;
			
			ctx.globalAlpha = opacityL ? opacityL : 1;
			
			ctx.beginPath();	
			
			ctx.moveTo(lx, ty);
			ctx.lineTo(rx, ty);
			ctx.lineTo(rx, by);
			ctx.lineTo(lx, by);
			ctx.lineTo(lx, ty);
		
			ctx.closePath();
		
			if(lineWidth){
				ctx.lineWidth = lineWidth;
			}
			if (lineColor){
				ctx.strokeStyle = lineColor;
			}
			
			ctx.stroke();
			
			ctx.globalAlpha = opacityF ? opacityF : 1;
			
			if (fillcolor){
				ig.system.context.fillStyle = fillcolor;
			}
			if (fill == true){
				ctx.fill();	
			}
			//Restore Opacity
			ctx.globalAlpha = 1;
		},
		drawABoxOld: function(lx, rx, ty, by, lineWidth, lineColor, fill, fillcolor){
			var ctx = ig.system.context;
			ctx.beginPath();	
		
			ctx.moveTo(lx, ty);
			ctx.lineTo(rx, ty);
			ctx.lineTo(rx, by);
			ctx.lineTo(lx, by);
			ctx.lineTo(lx, ty);
		
			ctx.closePath();
		
			if(lineWidth){
				ctx.lineWidth = lineWidth;
			}
			if (lineColor){
				ctx.strokeStyle = lineColor;
			}
		
			ctx.stroke();
		
			if (fillcolor){
				ig.system.context.fillStyle = fillcolor;
			}
			if (fill == true){
				ctx.fill();	
			}
		},
		
		//This function is called when the script returns a chatbot response
		//After the player has submitted text.
		showChatBotResponse: function(){
			var ctx = ig.system.context;
			var charName = ig.game.curNpcName;
			var charNameUpperCase = charName.toUpperCase();
			var charNameFormatted = charNameUpperCase + ": ";
			
			var formattedResponse = ig.game.chatBotResponse
				.replace(/\s+/g, ' ')          // Replace multiple whitespace characters with a single space
				//.replace(/\.\s/g, '.\n')       // Ensure that periods are followed by newlines for clarity
				.trim();                       // Trim whitespace from start and end of the string

			// Combine character name with the cleaned up response
			ig.game.npcTxt = charNameFormatted + formattedResponse;
			ig.game.oneSlideTxt = ig.game.dTool.measureText(ctx, ig.game.npcTxt, ig.game.DlBxWidth - (ig.game.DlBxMarginX * 2), ig.game.DlBxHeight - ( ig.game.DlBxMarginY * 2), ig.game.defaultLineHeight);
			console.log('FROM MAIN ig.game.oneSlideTxt = ' + ig.game.oneSlideTxt)
			if (ig.game.oneSlideTxt && !ig.game.dontChat ){
				ig.game.showChatPrompt = true;
				ig.game.spawnEntity( EntityConfirm, 0, 0, { name: "yes", cType: "chatResp" });	
				ig.game.spawnEntity( EntityConfirm, 0, 0, { name: "no",  cType: "chatResp", cName: this.name  });		
			}
			ig.game.dBoxUp = true;   
			ig.game.chatPrompt = true;
			ig.game.showingChatResponse = true;
		},
		getPlayerInput: function() {
			var inputField = document.getElementById('playerInput');
			inputField.focus(); // Focus the hidden input field to capture input

			inputField.oninput = function() {
				this.handleInput(inputField.value); // Handle input dynamically as it's being typed
			}.bind(this);

			inputField.onblur = function() {
				var finalInput = inputField.value;
				this.submittedPInput = finalInput;
				//console.log('Player Input: ' + ig.game.submittedPInput);
				//console.log('ig.game.npcAgentPrompt = ' + ig.game.npcAgentPrompt);
				inputField.value = ''; // Clear the input field after focus is lost
				inputField.oninput = null; 
				ig.game.gettingPlayerInput = false;

				// Call the function to send data to the server
				//agentPrompt
				if (finalInput != ""){
					this.sendInputToServer(finalInput, ig.game.npcAgentPrompt);
				}
			}.bind(this);
		},
		handleInput: function(input) {
			// Update game state or UI with the input as it's being typed
			this.playerLastInput = input; // Save or process the input as needed
			ig.game.submittedPInput = input;
		},
		
		stopPlayerInput: function() {
			var inputField = document.getElementById('playerInput');
			this.pInput = inputField.value;
			inputField.blur();
		},
		sendInputToServer: function(userInput, botPrompt) {
		
			//Prevent Player From Moving Because We Just Sent Text to the Bot
			ig.game.sentChatResponse = true;
			
			fetch('/chat.php', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
				body: 'userInput=' + encodeURIComponent(userInput) + '&agentPrompt=' + encodeURIComponent(botPrompt)
			})
			.then(response => response.json())
			.then(data => {
				if (data.choices && data.choices.length > 0 && data.choices[0].message) {
					var resp = data.choices[0].message.content;
					console.log("Server response: " + resp);
					if (resp == "Well done. You may pass."){
						this.passQuizBot();
					}
					ig.game.chatBotResponse = resp;
					this.showChatBotResponse();
					//Try This (dont want to see buttons after answering)
					ig.game.showChatPrompt = false;
				}
				else{
					console.error("An unexpected error occurred.");
				}
			})
			.catch(error => {
				console.error('Error:', error);
				console.log("Error processing your request.");
			});
		},
		drawCutTxt: function(){
			//this.cutTxtCount
			//this.cutTxtEndCount
			var ctx = ig.system.context;
			this.drawABoxOld(0, ig.system.width, 0, ig.system.height, 0, this.slideColor, true, this.fadeColor);
			ctx.fillStyle = "#ff00ff";
			var longTxt = `The standard Lorem Ipsum passage, used since the 1500s "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum." Section 1.10.32 of "de Finibus Bonorum et Malorum", written by Cicero in 45 BC "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae onsequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?".`;
			this.dTool.prepareTextChunks(ctx, longTxt, ig.game.DlBxWidth - (ig.game.DlBxMarginX * 2), ig.game.DlBxHeight - ( ig.game.DlBxMarginY * 2), 36);
	   		
	   		var txtBoxWidth = ig.system.width * .6;
	   		var txtBoxMargin = ig.system.width * .2;
	   		var txtY = ig.system.height * .2;
	   		this.wordWrap(this.cutTxtToShow, 40, "#39FF14", txtBoxMargin, txtY, txtBoxWidth, 80, true, "#8A2BE2");
	   					//(text, fontpx, fontColor, x, y, maxWidth, stroke, strokeColor, strokeWidth)
		},
		fadeOutOldCutTxt: function(){
			ig.game.fadeOut(0, "#F8F8FF");
			ig.game.transitionReady = false;
		},
		fadeInNewCutTxt: function(){
			console.log('advancing cutTxtCount')
			this.cutTxtCount++;
			var currentCutTxt = 'ct' + this.cutTxtCount;
			this.cutTxtToShow = this.cutTxt[currentCutTxt];
			ig.game.fadeIn(0, "#F8F8FF");
			ig.game.transitionReady = false;
		},
		
		handleCutTxtSeq: function() {
			if (this.cutTxtCount < this.cutTxtEndCount) {
				this.fadeOutOldCutTxt(); 
			}
			else {
				this.endCutTxt = true;
				this.fadeOutOldCutTxt();
				ig.game.pause = false;
				ig.game.playMusicBro(1);
			}
		},
		setCutScreenTxt: function(which){
			
			//Intro Txt
			if (which == 1){
				this.cutTxtCount = 0;
				this.cutTxtEndCount = 5;
				
				this.cutTxt.ct1 = "The year was 2007. You were a visionary in the Web 2.0 era, pushing the boundaries of Internet technology.";
				this.cutTxt.ct2 = "As the financial system crumbled and threats loomed over humanity, you chose a drastic solution to survive... \nCryogenic preservation!";
				this.cutTxt.ct3 = "Many years have passed. A new era has awoken.\nYou now emerge into a world where blockchain technologies power the globe.";
				this.cutTxt.ct4 = "The facility into which you arise is eerily abandoned.\nThe key to understanding this new world lies in the blockchain records left behind.";
				this.cutTxt.ct5 = "It’s time to piece together history, navigate the present, and influence the world.\n\nWelcome to The Future of France.";
			}
			this.cutTxtToShow = this.cutTxt.ct1;
		},

		wordWrap: function(text, fontpx, fontColor, x, y, maxWidth, varLineHeight, stroke, strokeColor, strokeWidth, fontFace) {
			var ctx = ig.system.context;
	
			var fontSize = fontpx ? fontpx : this.defaultFontSize; // Set Font Size or Default
			var myFontFace = fontFace ? fontFace : this.defaultFontFace;
			ctx.font = `${fontSize}px '${myFontFace}', sans-serif`; // Lock in Font Face and Size
			var lineHeight = varLineHeight ? varLineHeight : fontpx * 1.1; // Set Line Height Based on Font Size
			var storedML = ctx.miterLimit;
			ctx.miterLimit = 2; // Keeps Some Letters from Getting Too Close
			ctx.strokeStyle = strokeColor ? strokeColor : "black"; // Set Outline Color
			ctx.lineWidth = strokeWidth ? strokeWidth : fontSize * .1; // Set Outline Size or Default to 10%
			ctx.fillStyle = fontColor ? fontColor : 'green'; // Set Text Color or Default
	
			var initialX = x; // Save initial x position for cursor calculation

			var paragraphs = text.split('\n');
			for (var p = 0; p < paragraphs.length; p++) {
				var words = paragraphs[p].split(' ');
				let line = '';
				x = initialX; // Reset x to initial x at the start of each paragraph

				for (let i = 0; i < words.length; i++) {
					var testLine = line + words[i] + ' ';
					var metrics = ctx.measureText(testLine);
					var testWidth = metrics.width;

					if (testWidth > maxWidth && i > 0) {
						if (stroke) {
							ctx.strokeText(line, x, y); // Stroke the text
						}
						ctx.fillText(line, x, y);   // Fill the text
						line = words[i] + ' ';
						x = initialX; // Reset x to initial x as we are moving to a new line
						y += lineHeight;
					}
					else{
						line = testLine;
					}
				}
				//Render the last line of the current paragraph
				if (stroke) {
					ctx.strokeText(line, x, y); // Stroke the text for the last line if Stroking
				}
				ctx.fillText(line, x, y);   // Fill the text for the last line
		
				// Update cursor position to the end of the last rendered line
				ig.game.lastCursorPosX = x + ctx.measureText(line).width;
				ig.game.lastCursorPosY = y - 34;
				y += lineHeight; // Move the cursor to the next line after a paragraph
			}
	
			ctx.miterLimit = storedML;  // Restore original miter limit
		},
		drawTitleScreen: function(){
			var ctx = ig.system.context;
			var xBuffer = ig.system.width * .2;
			var middleWdth = ig.system.width - (xBuffer * 2);
			
			//LeftColor (blue)
			this.drawABox(0, xBuffer, 0, ig.system.height, 0, this.color1, true, this.color1);
			//MiddleColor (white)
			this.drawABox(xBuffer, xBuffer + middleWdth, 0, ig.system.height, 0, this.color3, true, this.color3);
			//RightColor (red)
			this.drawABox(xBuffer + middleWdth, middleWdth + xBuffer * 2, 0, ig.system.height, 0, this.color2, true, this.color2);
			
			
			var logoWidth = ig.system.width * .8;
			var logoMargin = ig.system.width * .1;
			var logoHeight = logoWidth / 10;
		
			var tswWidth = 0;
			var tswHeight = 0;
			
			var butWidth = 0;
			var butHeight = 0;
		
			var tsWidth = ig.system.height * .2;
			var tsHeight = tsWidth;
			var tsImageX = ig.system.width - (tsWidth / 2);	
			var tsImageY = ig.system.height * .025;
		
			var buffer = ig.system.width * .025;
	
			
			//Draw Title Text Image (Portrait)
			tswHeight = ig.system.height * .65;
			tswWidth =tswHeight;
			
			//Draw Title Image Image
			tsWidth = tswHeight;
			tsHeight = tsWidth;
			tsImageX = ig.system.width / 2 - (tsWidth / 2);
			tsImageY = ig.system.height * .4;
			
			logoWidth = ig.system.height * .7; 
			logoHeight = logoWidth;
			
			butHeight = ig.system.width * .075;
			
			if (butHeight > 76){
				butHeight = 76;
			}
			
			butWidth = butHeight * 2.5;
			
			
			this.ngbX = (ig.system.width / 2) - (butWidth + buffer );
			this.ngbY = (logoHeight * .65); 
				
			this.ctbX = this.ngbX;

				
			this.ctbY = this.ngbY + (butHeight * 1.15);
		
		
			this.tsButtonWidth = butWidth;
			this.tsButtonHeight = butHeight;
			var tswImageX = ig.system.width / 2 - (tswWidth / 2);
			var tswImageY = ig.system.height * .05;
		
		
			imageX = (ig.system.width / 2) - (logoWidth / 2);
		
			ctx.drawImage(this.tsImage, tswImageX, tswImageY, tswWidth, tswHeight );
			ctx.drawImage(this.newGameButton, this.ngbX, this.ngbY, butWidth, butHeight );
			ctx.drawImage(this.continueButton, this.ctbX, this.ctbY, butWidth, butHeight );
		

		},
		
		loadTSImages: function(){
			this.tsImage = new Image();
			this.tsImage.src = window.tsImage.src;
		
			this.newGameButton = new Image();
			this.newGameButton.src = window.ngbut.src;
			
			this.continueButton = new Image();
			this.continueButton.src = window.conbut.src;
			
			this.iconLogOut = new Image();
			this.iconLogOut.src  = window.icnLogOut.src;
			
			this.iconMetaMask = new Image();
			this.iconMetaMask.src  = window.icnMetaMask.src;
			
			this.iconPhantom = new Image();
			this.iconPhantom.src  = window.icnPhantom.src;
			
		},
		drawTransition: function(){
			var ctx = ig.system.context;		
			//**************FadeIn*************
			if (this.transitionType == "fadeIn"){
				var curOpacity = 0;
				if (this.transitionTimer.delta() < 0){
					curOpacity = this.transitionTimer.delta() * -1;
				}
				//Prepare Transition for Clear
				if (this.transitionTimer.delta() > 0){
					this.transition = false;
					this.transitionReady = false;
					ig.game.pause = false;
				}
				ctx.globalAlpha = curOpacity;
				//this.drawABox(0, ig.system.width, 0, ig.system.height, 0, this.slideColor, true, this.fadeColor, curOpacity, curOpacity);
				this.drawABoxOld(0, ig.system.width, 0, ig.system.height, 0, this.slideColor, true, this.fadeColor);
			}
			//*************FadeOut*************
			if (this.transitionType == "fadeOut"){
				var curOpacity = 1;
				if (this.transitionTimer.delta() < 1){
					curOpacity = this.transitionTimer.delta();
				}
				//Level is Ready to Load
				if (this.transitionTimer.delta() > 1){
					this.readyToLoad = true;
					//Handle Cut Txt Sequencing
					if (this.endCutTxt){
						this.cutScreenOn = false;
						ig.game.fadeIn(0.5, "#F8F8FF");
						ig.game.transitionReady = false;
					}
					else if (this.cutScreenOn){
						console.log('call handle cut txt seq');
						this.fadeInNewCutTxt();
					}
					//Transition from Title Screen To Game
					//Set ZOOM changes resolutiong etc.
					if (ig.game.atTitleScreen){
						//Turn Off Title Screen
						ig.game.atTitleScreen = false;
						//Resize to Proper Game Art Zoom
						ig.game.resizeYo();
						//Show Intro Text
						if (this.introOn){
							this.cutScreenOn = true;
							this.endCutTxt = false;
						}
						else{
							ig.game.pause = false;
						}
					}
					else if (ig.game.changingLvl){
						this.LoadLevelBro(ig.game.goingToLvl);
						ig.game.changingLvl = false;
						ig.game.goingToLvl = this.goesTo;
						ig.game.fadeIn(0, "#F8F8FF");
					}
				}
				//Prepare Transition for Clear
				if (this.transitionTimer.delta() > 2){
					this.transitionReady = true;
					this.transition = false;
				}
				ctx.globalAlpha = curOpacity;
				//this.drawABox(0, ig.system.width, 0, ig.system.height, 0, this.slideColor, true, this.fadeColor, curOpacity, curOpacity);
				this.drawABoxOld(0, ig.system.width, 0, ig.system.height, 0, this.slideColor, true, this.fadeColor);
			}
			//Restore Alpha
			ctx.globalAlpha = 1;	
		},
		fadeIn: function(delay, color){
			if (!delay){
				ig.game.transitionTimer.set(1);
			}
			else{
				ig.game.transitionTimer.set(delay);	
			}
			ig.game.transitionType = "fadeIn";
			ig.game.transition = true;
			if (color){
				ig.game.fadeColor = color;	
			}
			else{
				ig.game.fadeColor =  this.color3;	
			}
		},
		fadeOut: function(delay, color){
			if (!delay){
				ig.game.transitionTimer.set(0);
			}
			else{
				ig.game.transitionTimer.set(delay);	
			}

			ig.game.transitionType = "fadeOut";
			ig.game.transition = true;	
			
			if (color){
				ig.game.fadeColor = color;	
			}
			else{
				ig.game.fadeColor =  this.color3;	
			}
		},
		openLinkInNewTab: function(url){
			window.open(url, '_blank').focus();
		},
		resizeYo: function(){
			//Look for ads
			var taHeight = 0;
			var saWidth = 0;
			var lsaWidth = 0;
		
			//Look Up
			if (document.getElementById("ad-unit")){
				if ( document.getElementById("ad-unit").clientHeight ){
					taHeight = document.getElementById("ad-unit").clientHeight;
				}
			}
			//Look Right
			if ( document.getElementById("side-ad-unit-container")){
				if ( document.getElementById("side-ad-unit-container").clientWidth ){
					saWidth = document.getElementById("side-ad-unit-container").clientWidth;
				}
			}
			//Look Left
			if (document.getElementById("left-side-ad-unit-container")){
				if ( document.getElementById("left-side-ad-unit-container").clientWidth ){
					lsaWidth = document.getElementById("left-side-ad-unit-container").clientWidth;
				}
			}
		
			var combinedSideColumnAdWidth = saWidth + lsaWidth;
			var theWidthToMeasure = window.innerWidth - combinedSideColumnAdWidth;
		
			var scale = .5;

			window.scale = scale;
		
			//Set Canvas Width Minus Ads
			this.cWidth = window.innerWidth - combinedSideColumnAdWidth;
			this.cHeight = window.innerHeight - taHeight;
		
			//Resize the canvas style and tell Impact to resize the canvas itself;
			canvas.style.width = this.cWidth + 'px';
			canvas.style.height = this.cHeight + 'px';
		
			ig.system.resize( this.cWidth * scale, this.cHeight * scale);
			
			this.setDialogBoxVars();
			//SET FONTS
			//ig.game.dTool.setVs();
		
			// Re-center the camera - it's dependend on the screen size.
			if( ig.game && ig.game.setupCamera ) {
				//SET CAMERA
				ig.game.setupCamera();
			}
		
		}
	});
	

	// Start the Game with 60fps, a resolution of 320x240, scaled
	// up by a factor of 2
	window.scale = 1;

	canvas.style.width = window.innerWidth + 'px';
	canvas.style.height =window.innerHeight+ 'px';
	
	//Listen for Resizes
	window.addEventListener('resize', function(){
		//If the game hasn't started yet, dont resize
	if( !ig.system ) { return; }
		if (ig.game){
			ig.game.resizeYo();
		}
	}, false);
	
	// Resize the canvas style and tell Impact to resize the canvas itself;
	var width = window.innerWidth * scale,
	height = window.innerHeight * scale;
	ig.main( '#canvas', MyGame, 60, width, height, 1 );


});

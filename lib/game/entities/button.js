ig.module(
	'game.entities.button'
)
.requires(
	'impact.entity',
	'impact.entity-pool'
)
.defines(function(){
	
EntityButton=ig.Entity.extend({
	size: {x: 1, y: 1},
	maxVel: {x: 000, y: 000},
	name: null,
	type: ig.Entity.TYPE.NONE,
	checkAgainst: ig.Entity.TYPE.NONE,
	collides: ig.Entity.COLLIDES.NEVER,
	
	clicked: false,
	
	_wmDrawBox: true,
	_wmBoxColor: 'rgba(245, 66, 212, 1)',
	
	//clickSound: new ig.Sound( 'media/sounds/new-game.*' ),
	
	init: function( x, y, settings ) {
		this.parent(x, y, settings);	
		this.giveMeASecond = new ig.Timer(.33);
	},
	reset: function( x, y, settings ) {
		this.parent( x, y, settings );
		this.giveMeASecond.set(.33);
		this.clicked = false;
			},
	
	update: function() {
		if (this.name == "start"){	
			this.size.x =  ig.game.tsButtonWidth ;
			this.size.y =  ig.game.tsButtonHeight; 
			this.pos.x =ig.game.ngbX + ig.game.screen.x;
			this.pos.y = ig.game.ngbY + ig.game.screen.y;
		}
		if (this.name == "continue"){
			this.size.x =  ig.game.tsButtonWidth;
			this.size.y =  ig.game.tsButtonHeight; 
			this.pos.x = ig.game.ctbX + ig.game.screen.x;
			this.pos.y = ig.game.ctbY + ig.game.screen.y;
		}
		if (this.name == "contact"){
			this.size.x = 200;
			this.size.y = 30;
			this.pos.x = ig.game.contactButX - 20 + ig.game.screen.x;
			this.pos.y = ig.game.contactButY - 10 + ig.game.screen.y;
		}
		if (!ig.game.atTitleScreen){
			this.kill();
		}
		//Click me
		if (ig.input.released('click') && this.inFocus() && this.giveMeASecond.delta() > 0 ) {
			
			//Click Start Button
			if (this.name == "start"){
				//ig.game.fadeIn(1.25, "#FFFFFF");
				ig.game.playGameStartSound();
				ig.game.LoadLevelBro(1);
				ig.game.fadeOut(0, "#F8F8FF");
				ig.game.transitionReady = false;
				if(ig.game.introOn){
					ig.game.startNewGame = true;
					ig.game.setCutScreenTxt(1);
					ig.game.playMusicBro(6);
				}
				else{
					ig.game.playMusicBro(1);
				}
				
			}
			//Click Continue Button
			else if (this.name == "continue"){
				ig.game.playGameLoadSound();
				loadSavedGame();
				//popAlert(1);
				//popConfirm(1);
				//popMiningBox(1, "0x0x0x0x0x0x")
				//popInputBox(1);
				
			}			
			else if (this.name == "contact"){
				var mailLink = document.createElement('a');
				mailLink.href = "mailto:contact@fofrance.com?subject=I%20Love%20Your%20Game";
				mailLink.target = '_blank';
				mailLink.click();
			}
		}
		this.parent();
	},
	resetGameData: function(){
		ig.game.pData.deaths = 0;
		ig.game.pData.qRight = 0;
		ig.game.pData.qWrong = 0;
		ig.game.pData.lvl = 1;
		ig.game.pData.tokens = 0;	
		ig.game.pData.tokensLT = 0;	
		ig.game.pData.tokensGT = 0;	
		ig.game.pData.timesPassed = 0;
		if (ig.game.quiz.usedQs){
			ig.game.quiz.usedQs.numbers.length = 0;
		}
	},
	kill: function(){
		this.parent();
	},
	inFocus: function() {
			return (
			   (this.pos.x <= (ig.input.mouse.x + ig.game.screen.x)) &&
			   ((ig.input.mouse.x + ig.game.screen.x) <= this.pos.x + this.size.x) &&
			   (this.pos.y <= (ig.input.mouse.y + ig.game.screen.y)) &&
			   ((ig.input.mouse.y + ig.game.screen.y) <= this.pos.y + this.size.y)
			);
 	}
		
});
ig.EntityPool.enableFor( EntityButton );
});
ig.module(
	'game.entities.levelchange'
)
.requires(
	'impact.entity',
	'impact.entity-pool'
)
.defines(function(){
   
EntityLevelchange = ig.Entity.extend({
	_wmDrawBox: true,
	_wmBoxColor: 'rgba(218,165,32,0.75)',
	_wmScalable: true,
	size:{x:8,y:8},
	maxVel: {x: 000, y: 000},
	goesTo: false,
	comeOut: 1,
	
	what: false,
	checkAgainst: ig.Entity.TYPE.BOTH,
   
   
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
	},
	reset: function( x, y, settings ) {
		this.parent( x, y, settings );
	},
	update: function() {
		this.parent();
	},

	check:function(other){
		if( other instanceof EntityPlayer ) {
			
			if (!ig.game.changingLvl) {
				
				ig.game.changingLvl = true;
				ig.game.goingToLvl = this.goesTo;
				if (ig.game.madeItToLvl < this.goesTo && this.goesTo < 9){
					ig.game.madeItToLvl = this.goesTo;
				}
				saveGame(window['userAccountNumber'], ig.game.goingToLvl, ig.game.madeItToLvl -1) //Save Progress in DB
				ig.game.playerSpawnsBack = ig.game.currentLvl < this.goesTo ? false : true;
				if (this.goesTo == 8){
					ig.game.playerNeedsTpNum = this.comeOut;
					
					console.log('ig.game.playerNeedsTpNum = ' + ig.game.playerNeedsTpNum)
					ig.game.playMusicBro(5);
				}
				else if (this.goesTo == 12){
					ig.game.playMusicBro(4);
				}
				else if (this.goesTo > 8){
					ig.game.playMusicBro(3);
				}
				ig.game.pause = true;
				ig.game.fadeOut(0, "#F8F8FF");
				ig.game.transitionReady = false;
			}
			
		}
	}
});
	ig.EntityPool.enableFor( EntityLevelchange );
});
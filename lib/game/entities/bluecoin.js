ig.module(
	'game.entities.bluecoin'
)
.requires(
	'impact.entity',
	'impact.entity-pool'
)
.defines(function(){
	
EntityBluecoin = ig.Entity.extend({
	size: {x: 22, y: 22},
	offset: {x: 0, y: 0},
	maxVel: {x: 0, y: 0},

	zIndex: -12,
	type: ig.Entity.TYPE.B, 
	checkAgainst: ig.Entity.TYPE.A, 
	collides: ig.Entity.COLLIDES.NEVER,
	name: "token",
	_wmDrawBox: true,
	_wmBoxColor: 'rgba(244, 66, 146, 1)',
	coinNumber: false,
	health: 3000,
	checkIfFound: false,
	
	tokenAnim: new ig.AnimationSheet( 'media/token.png', 22, 22 ),
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		//Anims
		this.anims.token = new ig.Animation( this.tokenAnim,  0.1, [0,0,0,0,0,0,0,0,0,1,2,3,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,2,3,4]);
		this.anims.tokenPaused = new ig.Animation( this.tokenAnim,  0.1, [0]);
		
	},
	
	reset: function( x, y, settings ) {
		this.parent( x, y, settings );
	},

			
	update: function() {
		this.animMe();
		
		if (!this.checkIfFound){
			if (ig.game.checkFoundCoin(this.coinNumber)){
				this.kill();
			}
			this.checkIfFound = true;
		}
		
		this.parent();
	},
	animMe: function(){
		//Paused
		if (ig.game.pause){
			this.currentAnim = this.anims.tokenPaused 
		}
		else{
			this.currentAnim = this.anims.token;
		}
	},
	check: function( other ) {
		if (ig.game.getEntityByName('player')){
			var player = ig.game.getEntityByName('player');
			if (other == player){
				//Increase token count
				//ig.game.pData.tokens++;
				//Increase level token count
				//ig.game.pData.tokensLT++;
				
				if (this.coinNumber){
					ig.game.tokenData.tokensHeld++;
					ig.game.tokenData.totalTokensFound++;
					collectCoin(this.coinNumber);
					var id = "c" + this.coinNumber;
					ig.game.coinsFound[id] = true;
				}
				else{
					console.log('collected coin has no coinNumber');
				}
				
				ig.game.playTokenSound();
				this.kill();
			}
		}
	}
});
ig.EntityPool.enableFor( EntityBluecoin );
});
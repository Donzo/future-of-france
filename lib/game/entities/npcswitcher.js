ig.module(
	'game.entities.npcswitcher'
)
.requires(
	'impact.entity',
	'impact.entity-pool'
)
.defines(function(){
   
EntityNpcswitcher = ig.Entity.extend({
	_wmDrawBox: true,
	_wmBoxColor: 'rgba(255,250,205,0.6)',
	_wmScalable: true,
	size:{x:96,y:96},
	maxVel: {x: 500, y: 500},
	offset: {x: 0, y: 0},
	task: false,
	//NPC Definition Variables
	which: false,
	
	checkAgainst: ig.Entity.TYPE.BOTH,
	type: ig.Entity.TYPE.NONE, // No Group
	collides: ig.Entity.COLLIDES.NEVER,
   
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		if (!ig.global.wm){
			this.fetchCommissonerTaskTime = new ig.Timer(0);
			this.loadTask();
		}
	},
	
	reset: function( x, y, settings ) {
		this.loadTask();
		this.parent( x, y, settings );

	},
	loadTask: function(){
		fetchCommissionerTask().then(task => {
			if (task) {

				this.task = task;
				
				if (ig.game.currentLvl == 11){ //NFT Building
					this.spawnNPC(47);
				}
				else if (ig.game.currentLvl == 14){ //DAO Hub
					this.spawnNPC(42);
				}
				else if (ig.game.currentLvl == 15){ //GameFi Center
					this.spawnNPC(45);
				}
				else if (ig.game.currentLvl == 16){ //Farmers Market
					this.spawnNPC(46);
				}
				else if (ig.game.currentLvl == 17){ //Uniswap Hub
					this.spawnNPC(43);
				}
				else if (ig.game.currentLvl == 18){
					this.spawnNPC(41);	//Construction Worker
				}
				else if (ig.game.currentLvl == 19){ //Yield Farms
					this.spawnNPC(44);
				}
				else if (this.task == 1){
					if (ig.game.currentLvl == 9){
						this.spawnNPC(32);	//Spawn Vanessa in the Bank
					}
					else if (ig.game.currentLvl == 10){
						this.spawnNPC(36);	//Spawn Chris in the CL Shop
					}
				}
				else if (this.task == 2){
					if (ig.game.currentLvl == 9){
						this.spawnNPC(31);	//Spawn Vanessa 2 in the Bank
					}
					else if (ig.game.currentLvl == 10){
						this.spawnNPC(37);	//Spawn Chris in the CL Shop
					}
				}
				else if (this.task == 3){
					if (ig.game.currentLvl == 9){
						this.spawnNPC(33);	//Spawn Vanessa 3 in the Bank
					}
					else if (ig.game.currentLvl == 10){
						this.spawnNPC(38);	//Spawn Chris in the CL Shop
					}
				}
				else if (this.task == 4){
					if (ig.game.currentLvl == 10){
						this.killNPC(38);
						this.spawnNPC(39); //Spawn Chris in the CL Shop
					}
				}
				else{
					if (ig.game.currentLvl == 9){
						this.spawnNPC(35);	//Spawn Vanessa 3 in the Bank
					}
					else if (ig.game.currentLvl == 10){
						this.spawnNPC(40);	///Spawn Chris in the CL Shop
					}
				}
				//
			}
		});
	},
	killNPC: function(which){
		var npcName = `npc{$which}`;
		if (ig.game.getEntityByName(npcName)){
			var NPC = ig.game.getEntityByName(npcName);
			NPC.kill();
		}
	},

	spawnNPC: function(which){
		ig.game.spawnEntity( EntityNpc, this.pos.x, this.pos.y, {who: which, passMe: true, mover: false});
	},

	update: function() {
		if (ig.game.charChange ){ //This is set to true when NPC must die and new one respawn with different text.
			this.loadTask();
			ig.game.charChange = false;
		}

		this.parent();
	}

});
	ig.EntityPool.enableFor( EntityNpcswitcher );
});
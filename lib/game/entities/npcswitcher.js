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
				if (this.task == 1){
					if (ig.game.currentLvl == 9){
						this.spawnNPC(32);	//Spawn Vanessa in the Bank
						console.log('spawn 32');
					}
					else if (ig.game.currentLvl == 10){
						this.spawnNPC(36);	//Spawn Chris in the CL Shop
						console.log('spawn 36');
					}
				}
				else if (this.task == 2){
					if (ig.game.currentLvl == 9){
						this.spawnNPC(31);	//Spawn Vanessa 2 in the Bank
						console.log('spawn 31');
					}
					else if (ig.game.currentLvl == 10){
						this.spawnNPC(37);	//Spawn Chris in the CL Shop
						console.log('spawn 37');
					}
				}
				else if (this.task == 3){
					if (ig.game.currentLvl == 9){
						this.spawnNPC(33);	//Spawn Vanessa 3 in the Bank
						console.log('spawn 33');
					}
					else if (ig.game.currentLvl == 10){
						this.spawnNPC(38);	//Spawn Chris in the CL Shop
						console.log('spawn 38');
					}
				}
				else{
					if (ig.game.currentLvl == 9){
						this.spawnNPC(35);	//Spawn Vanessa 3 in the Bank
						console.log('spawn 35');
					}
				}
				//
			}
		});
	},
	getTask: function(){
		fetchCommissionerTask().then(task => {
			if (task) {
				if (this.task != task){
					this.somethingChanged(task);
				}
				this.task = task;
			}
		});
	},
	spawnNPC: function(which){
		ig.game.spawnEntity( EntityNpc, this.pos.x, this.pos.y, {who: which, passMe: true, mover: false});
	},
	somethingChanged: function(newTask){
		/*
		if (this.task == 2 && newTask == 2 && !this.spawn31){
			var NPC = ig.game.getEntityByName("npc29");
			NPC.kill();
			this.spawnComissioner(2);
			this.spawn31 = true;
		}*/
		console.log('looking for changes...');
	},
	update: function() {
		if (ig.game.charChange ){
			this.getTask();
			ig.game.charChange = false;
		}
		/*
		if (this.fetchCommissonerTaskTime.delta() > 0){
			this.getTask();
			this.fetchCommissonerTaskTime.set(4);
		}*/
		this.parent();
	}

});
	ig.EntityPool.enableFor( EntityNpcswitcher );
});
ig.module(
	'game.entities.commissioner'
)
.requires(
	'impact.entity',
	'impact.entity-pool'
)
.defines(function(){
   
EntityCommissioner = ig.Entity.extend({
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
				this.spawnComissioner(this.task );	
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
	spawnComissioner: function(which){
		if (which == 1){
			ig.game.spawnEntity( EntityNpc, this.pos.x, this.pos.y, {who: 29, passMe: true, mover: false});
		}
		else if (which == 2){
			ig.game.spawnEntity( EntityNpc, this.pos.x, this.pos.y, {who: 30, passMe: true, mover: false});
		}
		else if (which == 3){
			ig.game.spawnEntity( EntityNpc, this.pos.x, this.pos.y, {who: 34, passMe: true, mover: false});
		}
	},
	somethingChanged: function(newTask){
		if (this.task == 1 && newTask == 2 && !this.spawn30){
			var NPC = ig.game.getEntityByName("npc29");
			NPC.kill();
			this.spawnComissioner(2);
			this.spawn30 = true;
		}
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
	ig.EntityPool.enableFor( EntityCommissioner );
});
ig.module(
	'game.entities.teleportplayer'
)
.requires(
	'impact.entity',
	'impact.entity-pool'
)
.defines(function(){
   
EntityTeleportplayer = ig.Entity.extend({
	_wmDrawBox: true,
	_wmBoxColor: 'rgba(220,20,60,0.75)',
	_wmScalable: false,
	size:{x:64,y:64},
	maxVel: {x: 000, y: 000},
	
	checkAgainst: ig.Entity.TYPE.BOTH,
	tpNum: "",
   
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		if (!ig.global.wm){
			this.nameMe();
		}
	},
	reset: function( x, y, settings ) {
		nameMe();
		this.parent( x, y, settings );
	},
	update: function() {
		this.parent();
	},
	nameMe: function(){
		this.name == "tpPlayer";
		if (ig.game.goingToLvl == 8){
			this.name = "tpPlayer" + this.tpNum;
		}
		else{
			this.name = "tpPlayer";
		}
	}
	
});
	ig.EntityPool.enableFor( EntityTeleportplayer );
});
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
	
	name: "tpPlayer",
	checkAgainst: ig.Entity.TYPE.BOTH,
   
   
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
	},
	reset: function( x, y, settings ) {
		this.parent( x, y, settings );
	},
	update: function() {
		this.parent();
	}

});
	ig.EntityPool.enableFor( EntityTeleportplayer );
});
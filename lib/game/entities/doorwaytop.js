ig.module(
	'game.entities.doorwaytop'
)
.requires(
	'impact.entity'
)
.defines(function(){
	
EntityDoorwaytop = ig.Entity.extend({
	size: {x: 96, y: 192},
	maxVel: {x: 0, y: 0},
	friction: {x: 0, y: 0},
	type: ig.Entity.TYPE.NONE, 
	checkAgainst: ig.Entity.TYPE.NONE, 
	collides: ig.Entity.COLLIDES.NEVER,
	health: 900000,	
	flip: false,
	gravity:0,
	gravityFactor:0,
	zIndex: 10000,
	_wmDrawBox: false,
    _wmBoxColor: 'rgba(250,0,205,0.0)',
	animSheet: new ig.AnimationSheet( 'media/tile-work/doorway-top-top.png', 96, 192 ),
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		this.addAnim( 'exist', 1, [0], true );
	},
			

});
EntityDoorwaytopcity = ig.Entity.extend({
	size: {x: 96, y: 128},
	maxVel: {x: 0, y: 0},
	friction: {x: 0, y: 0},
	type: ig.Entity.TYPE.NONE, 
	checkAgainst: ig.Entity.TYPE.NONE, 
	collides: ig.Entity.COLLIDES.NEVER,
	health: 900000,	
	flip: false,
	gravity:0,
	gravityFactor:0,
	zIndex: 10000,
	_wmDrawBox: false,
    _wmBoxColor: 'rgba(250,0,205,0.0)',
	animSheet: new ig.AnimationSheet( 'media/tile-work/city-door-01-overlay.png', 96, 128 ),
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		this.addAnim( 'exist', 1, [0], true );
	},
			

});

EntityDoorwaytopcitytwo = ig.Entity.extend({
	size: {x: 96, y: 75},
	maxVel: {x: 0, y: 0},
	friction: {x: 0, y: 0},
	type: ig.Entity.TYPE.NONE, 
	checkAgainst: ig.Entity.TYPE.NONE, 
	collides: ig.Entity.COLLIDES.NEVER,
	health: 900000,	
	flip: false,
	gravity:0,
	gravityFactor:0,
	zIndex: 10000,
	_wmDrawBox: false,
    _wmBoxColor: 'rgba(250,0,205,0.0)',
	animSheet: new ig.AnimationSheet( 'media/tile-work/city-door-03-overlay.png', 96, 75 ),
	
	init: function( x, y, settings ) {
		this.parent( x, y, settings );
		this.addAnim( 'exist', 1, [0], true );
	},
			

});

});
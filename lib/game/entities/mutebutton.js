ig.module(
	'game.entities.mutebutton'
)
.requires(
	'impact.entity',
	'impact.entity-pool'
)
.defines(function(){
	
EntityMutebutton=ig.Entity.extend({
	size: {x: 1, y: 1},
	maxVel: {x: 000, y: 000},
	name:'muteButton',
	type: ig.Entity.TYPE.NONE,
	checkAgainst: ig.Entity.TYPE.NONE,
	collides: ig.Entity.COLLIDES.NEVER,
	
	//muteSound: new ig.Sound( 'media/sounds/mute.*' ),
	
	init: function( x, y, settings ) {
		this.parent(x, y, settings);	
		ig.game.muteButtonAlive = true;
	},
	reset: function( x, y, settings ) {
        this.parent( x, y, settings );
		ig.game.muteButtonAlive = true;
    },
	
	
	update: function() {
		
		this.size.x =  64;
		this.size.y =  64;
	
		this.pos.x =  (ig.system.width - 42) + ig.game.screen.x;
		this.pos.y = 15 + ig.game.screen.y;
		
		//Click me
		if (ig.input.released('click') && this.inFocus() ) {
			
			if (ig.game.muteGame == true){
				ig.game.muteGame = false;	
				ig.music.volume = ig.game.musicLevel;
				console.log('unmute')
			}
			else{
				ig.game.muteGame = true;	
				ig.music.volume = 0;
				console.log('mute');
			}			
		}
		
		this.parent();
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
ig.EntityPool.enableFor( EntityMutebutton );
});
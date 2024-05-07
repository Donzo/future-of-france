ig.module( 
    'plugins.camera' 
)
.requires(
    'impact.impact'
)
.defines(function(){

Camera = ig.Class.extend({
    trap: {
        pos: { x: 0, y: 0},
        size: { x: 512, y: 512 }
    },
    max: { x: 0, y: 0 },
    offset: {x: 0, y:0},
    pos: {x: 0, y: 0},
    damping: 5,
    lookAhead: { x: 0, y: 8},
    currentLookAhead: { x: 0, y: 0},
    
    debug: true,
    

    init: function( offsetX, offsetY, damping ) {
        this.offset.x = offsetX;
        this.offset.y = offsetY;
        this.damping = damping;
    },
    
    
    set: function( entity ) {
		var entity = ig.game.getEntityByName('player');

		this.pos.x = entity.pos.x - this.offset.x;
		this.pos.y = entity.pos.y - this.offset.y;
		this.trap.pos.x = entity.pos.x - this.trap.size.x / 2;
		this.trap.pos.y = entity.pos.y - this.trap.size.y / 2;
    },
    
    
    follow: function( entity ) {
	    var entity = ig.game.getEntityByName('player');
	    	    
		var sizeX = entity.size.x;
		var sizeY = entity.size.y;
		/*
		if (ig.system.width < 400){
			sizeX = entity.size.x / 4;
			sizeY = entity.size.y / 4;
		}
		else if (ig.system.width < 600){
			sizeX = entity.size.x / 2;
			sizeY = entity.size.y / 2;
		}
		else if (ig.system.width < 800){
			sizeX = entity.size.x / 1.5;
			sizeY = entity.size.y / 1.5;
		}*/
		
        this.pos.x = this.move( 'x', entity.pos.x, sizeX );
        this.pos.y = this.move( 'y', entity.pos.y, sizeY );
        
        ig.game.screen.x = this.pos.x;
		
		//Adjust Camera Height Based on Mobile Buttons
        ig.game.screen.y = this.pos.y; // * ig.game.cameraHeightFactorY;
    },
    
    
    move: function( axis, pos, size ) {
        if( pos < this.trap.pos[axis] ) {
            this.trap.pos[axis] = pos;
            this.currentLookAhead[axis] = this.lookAhead[axis];
        }
        else if( pos + size > this.trap.pos[axis] + this.trap.size[axis] ) {
            this.trap.pos[axis] = pos + size - this.trap.size[axis];
            this.currentLookAhead[axis] = -this.lookAhead[axis];
        }
        
        return (
            this.pos[axis] - (
                this.pos[axis] - this.trap.pos[axis] + this.offset[axis]
                + this.currentLookAhead[axis]
            ) * ig.system.tick * this.damping
        ).limit( 0, this.max[axis] );
    },
    
    
    draw: function() {
        if( this.debug ) {
            ig.system.context.fillStyle = 'rgba(255,0,255,0.3)';
            ig.system.context.fillRect(
                (this.trap.pos.x - this.pos.x) * ig.system.scale,
                (this.trap.pos.y - this.pos.y) * ig.system.scale,
                this.trap.size.x * ig.system.scale,
                this.trap.size.y * ig.system.scale
            );
        }
    }
});
});
ig.module(
	'game.entities.computerbutton'
)
.requires(
	'impact.entity',
	'impact.entity-pool'
)
.defines(function(){
	
EntityComputerbutton=ig.Entity.extend({
	size: {x: 1, y: 1},
	maxVel: {x: 000, y: 000},
	name: null,
	type: ig.Entity.TYPE.NONE,
	checkAgainst: ig.Entity.TYPE.NONE,
	collides: ig.Entity.COLLIDES.NEVER,
	
	clicked: false,
	
	_wmDrawBox: true,
	_wmBoxColor: 'rgba(245, 66, 212, 1)',
	
	//clickSound: new ig.Sound( 'media/sounds/new-game.*' ),
	
	init: function( x, y, settings ) {
		this.parent(x, y, settings);	
		this.giveMeASecond = new ig.Timer(.33);
	},
	reset: function( x, y, settings ) {
		this.parent( x, y, settings );
		this.giveMeASecond.set(.33);
		this.clicked = false;
    },
	
	update: function() {

		var bMargin = 30;
		var hbMargin = bMargin / 2;
		this.size.x =  ig.game.icnButWidth + bMargin;
		this.size.y =  ig.game.icnButHeight + bMargin; 
		

		if (this.name == "logOut"){	
			this.pos.x =ig.game.icnLogOutX + ig.game.screen.x - hbMargin;
			this.pos.y = ig.game.icnLogOutY + ig.game.screen.y - hbMargin;
		}
		else if (this.name == "metaMask"){
			this.pos.x =ig.game.icnMetaMaskX + ig.game.screen.x - hbMargin;
			this.pos.y = ig.game.icnMetaMaskY + ig.game.screen.y - hbMargin;
		}
		else if (this.name == "phantom"){
			this.pos.x =ig.game.icnPhantomX + ig.game.screen.x - hbMargin;
			this.pos.y = ig.game.icnPhantomY + ig.game.screen.y - hbMargin;
		}

		
		if (!ig.game.computerOn){
			this.kill();
		}
		//Click me
		if (ig.input.released('click') && this.inFocus() && this.giveMeASecond.delta() > 0 ) {
			if (this.name == "metaMask"){
				ig.game.openLinkInNewTab("https://metamask.io/download/");
			}
			else if (this.name == "phantom"){
				ig.game.openLinkInNewTab("https://phantom.app/download");
			}
			else if (this.name == "logOut"){
				//ig.game.promptBoxOpen = false;
				ig.game.resetTxtVars();
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
ig.EntityPool.enableFor( EntityComputerbutton );
});
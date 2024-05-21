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
		else if (this.name == "ethereum"){
			this.pos.x =ig.game.icnEthX + ig.game.screen.x - hbMargin;
			this.pos.y = ig.game.icnEthY + ig.game.screen.y - hbMargin;
		}
		else if (this.name == "arbitrum"){
			this.pos.x =ig.game.icnArbiX + ig.game.screen.x - hbMargin;
			this.pos.y = ig.game.icnArbiY + ig.game.screen.y - hbMargin;
		}
		else if (this.name == "optimism"){
			this.pos.x =ig.game.icnOptiX + ig.game.screen.x - hbMargin;
			this.pos.y = ig.game.icnOptiY + ig.game.screen.y - hbMargin;
		}
		else if (this.name == "copyAddress"){
			this.pos.x =ig.game.copyIcnX + ig.game.screen.x - hbMargin;
			this.pos.y = ig.game.copyIcnY + ig.game.screen.y - hbMargin;
		}
		
		if (!ig.game.computerOn){
			this.kill();
		}
		//Click me
		if (ig.input.released('click') && this.inFocus() && this.giveMeASecond.delta() > 0 ) {
			if (this.name == "metaMask"){
				ig.game.playInternetSound();
				ig.game.openLinkInNewTab("https://metamask.io/download/");
			}
			else if (this.name == "phantom"){
				ig.game.playInternetSound();
				ig.game.openLinkInNewTab("https://phantom.app/download");
			}
			else if (this.name == "ethereum"){
				switchNetwork(9, "game2");
				ig.game.playMsgOpenSound1();
			}
			else if (this.name == "arbitrum"){
				switchNetwork(12, "game2");
				ig.game.playMsgOpenSound1();
			}
			else if (this.name == "optimism"){
				switchNetwork(13, "game2");
				ig.game.playMsgOpenSound1();
			}
			else if (this.name == "logOut"){
				//ig.game.promptBoxOpen = false;
				ig.game.playComputerSound2();
				ig.game.resetTxtVars();
			}
			else if (this.name == "copyAddress"){
				 if (navigator.clipboard && window.isSecureContext) {
					// If the Clipboard API is available
					navigator.clipboard.writeText(window['userAccountNumber'])
					.then(() => {
						console.log('Address copied to clipboard!');
						ig.game.computerDispProgressLine += "\nAddress successfully copied!";
						ig.game.playSuccessSound1();
					})
					.catch(err => {
						console.error('Failed to copy address:', err);
						ig.game.computerDispProgressLine += "\nFailed to copy address.";
						ig.game.playAlertSound();
				 	});
				}
				else{
					//Clipboard API isn't available
					console.error('Clipboard API not available.');
					ig.game.computerDispProgressLine += "\nFailed to copy address.";
					ig.game.playAlertSound();
				}
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
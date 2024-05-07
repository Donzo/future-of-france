ig.module(
	'plugins.objects-txt'
)
.requires(
	'impact.impact'
)
.defines(function(){

    ObjectsTxt = ig.Class.extend({ 
        
        init: function() {
            // Initialization code if needed
        },
        
         //ig.game.objTxt.obj01.desc01
        obj01: {
        	"name": "Old File Cabinet",
        	"hasPrompt": true,
			"desc01":`You find a document called "Browser Wallets: Passwords vs. Seed Phrases" in the old file cabinet. Would you like to read it?`,
			"style": "I",
			"longResponse": true,
			"yResp":`It's crucial for new users of crypto browser wallets to understand the differences between a password and a seed phrase. A password secures your wallet locally, preventing unauthorized local access but not affecting the blockchain account itself, which is secured by the private key. The private key, essential for blockchain actions like transferring funds, is generated from the seed phrase. Thus, anyone with the seed phrase can regenerate the account and use the private key. Remember: a password cannot restore wallet access if lost—only the seed phrase or private key can. Therefore, securely backing up your seed phrase is vital.`,
		},
		obj02: {
        	"name": "Computer",
        	"hasPrompt": true,
        	"computerDisplay": 1,
			"desc01":`You find a unlocked computer. Would you like to browse the desktop?`,
			"isComputer": true,	
		},
		obj03: {
        	"name": "Terminal 1",
        	"hasPrompt": true,
			"desc01":`There is a terminal on the wall. Would you like to connect your browser wallet to this terminal?`,
			"conditionalResponse": true,
			"cRespParams": [],
			"cRespFunction": `connectToSite`
			//"cRespParams": [1],
			//"cRespFunction": `openDoor`
		},
        
    });

});


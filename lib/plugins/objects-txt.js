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
		
		obj01: {
			"name": "Old File Cabinet",
			"hasPrompt": true,
			"desc01":`You find a document called "Browser Wallets: Passwords vs. Seed Phrases" in the old file cabinet. Would you like to read it?`,
			"style": "I",
			"longResponse": true,
			"yResp":`It's crucial for new users of crypto browser wallets to understand the differences between a password and a seed phrase. A password secures your wallet locally, preventing unauthorized local access but not affecting the blockchain account itself, which is secured by the private key. The private key, essential for blockchain actions like transferring funds, is generated from the seed phrase. Thus, anyone with the seed phrase can regenerate the account and use the private key. Remember: a password cannot restore wallet access if lost—only the seed phrase or private key can. Therefore, securely backing up your seed phrase is vital.`,
		},
		obj02: {
			"name": "Computer",//Download Wallets
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
		},
		obj04: {
			"name": "Cryogenic Tubes",
			"hasPrompt": false,
			"desc01":`These are cryogenic tubes. Some are still occupied by resting individuals. It's best not to disturb them.`,
		},
		obj05: {
			"name": "Metal Bench",
			"hasPrompt": false,
			"desc01":`You notice a sturdy metal bench. There's no time to sit right now.`,
		},
		obj06: {
			"name": "Metal Lockers",
			"hasPrompt": false,
			"desc01":`You spot several metal lockers, but they contain nothing of use.`,
			"longResponse": true,
		},
		obj07: {
			"name": "Terminal 2",
			"hasPrompt": true,
			"desc01":`This terminal will open the door if you are connected to the Ethereum Sepolia Network. Would you like to proceed?`,
			"conditionalResponse": true,
			"cRespParams": ['ethereum sepolia'],
			"cRespFunction": `checkConnection`
			//"cRespParams": [1],
			//"cRespFunction": `openDoor`
		},
		obj08: {
			"name": "Computer",//Connect to Blockchains
			"hasPrompt": true,
			"computerDisplay": 2,
			"desc01":`You find a unlocked computer. Would you like to browse the desktop?`,
			"isComputer": true,	
		},
		obj09: {
			"name": "Terminal 3",
			"hasPrompt": true,
			"desc01":`This terminal will open the door if you are connected to the Optimism Sepolia Network. Would you like to proceed?`,
			"conditionalResponse": true,
			"cRespParams": ['optimism sepolia'],
			"cRespFunction": `checkConnection`
			//"cRespParams": [1],
			//"cRespFunction": `openDoor`
		},
		obj10: {
			"name": "Terminal 4",
			"hasPrompt": true,
			"desc01":`This terminal will open the door if you are connected to the Arbitrum Sepolia Network. Would you like to proceed?`,
			"conditionalResponse": true,
			"cRespParams": ['arbitrum sepolia'],
			"cRespFunction": `checkConnection`
			//"cRespParams": [1],
			//"cRespFunction": `openDoor`
		},
		obj11: {
			"name": "Old File Cabinet",
			"hasPrompt": true,
			"desc01":`You find a document called "Layer 2: Optimistic Rollup Tradeoffs" in the old file cabinet. Would you like to read it?`,
			"style": "I",
			"longResponse": true,
			"yResp":`There are critical trade-offs you face between security and speed when using Layer 2 solutions like optimistic rollups. While these systems enhance your transaction capacity, they introduce a notable challenge: the withdrawal process. To ensure the security of your funds against potential fraud, there's a mandatory wait period—up to a week—before your transactions fully settle. It's essential to understand and plan for this delay to manage your digital assets effectively.`,
		},
		obj12: {
			"name": "Terminal 5",
			"hasPrompt": true,
			"desc01":`This terminal requires you to sign a transaction to open this door. Would you like to proceed?`,
			"conditionalResponse": true,
			"cRespParams": [],
			"cRespFunction": `signTransaction`
			//"cRespParams": [1],
			//"cRespFunction": `openDoor`
		},
		obj13: {
			"name": "Computer",//Signature Phishing Graphic
			"hasPrompt": true,
			"computerDisplay": 3,
			"desc01":`You find a unlocked computer. Would you like to browse the desktop?`,
			"isComputer": true,	
		},
		obj14: {
			"name": "File Cabinet",
			"hasPrompt": true,
			"desc01": `You find a document labeled "Signature Phishing Dangers". Would you like to read it?`,
			"style": "I",
			"longResponse": true,
			"yResp": `Signature phishing is a critical security concern where attackers trick you into signing a transaction or message that you don't fully understand. To protect yourself, always verify the source of any request to sign data. Never sign transactions that you haven't initiated or don't recognize. Use a secondary verification method to confirm the legitimacy of the request, such as contacting the requesting party through a trusted channel. Remember, your signature can grant access to your digital assets, so treat it with the same care as you would your most guarded secrets.`,
		},
		obj15: {
			"name": "Arbitrum Sepolia Test ETH Dispenser",
			"hasPrompt": true,
			"desc01":`This machine dispenses Arbitrum Sepolia Ether. Would you like to activate it?`,
			"conditionalResponse": true,
			"cRespParams": [1],
			"cRespFunction": `getTestETH`
			//"cRespParams": [1],
			//"cRespFunction": `openDoor`
		}
	});

});


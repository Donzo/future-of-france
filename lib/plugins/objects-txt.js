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
			"desc01":`You find a unlocked computer that can help you download a browser wallet. Would you like to browse the desktop?`,
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
			"desc01":`You find a unlocked computer that can help you switch blockchains. Would you like to browse the desktop?`,
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
			"desc01":`You find a unlocked computer that can teach you about signature phishing. Would you like to browse the desktop?`,
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
		},
		obj16: {
			"name": "Metal Bench",
			"hasPrompt": true,
			"desc01":`You see something shiny under the bench. Do you want to take a look?`,
			"hasCoin": true,
			"coinNumber": 1
		},
		obj17: {
			"name": "Metal Lockers",
			"hasPrompt": true,
			"desc01":`You spot several metal lockers, maybe there's something inside. Do you want to take a look?`,
			"hasCoin": true,
			"coinNumber": 4
		},
		obj18: {
			"name": "Metal Bench",
			"hasPrompt": true,
			"desc01":`You see something shiny under the bench. Do you want to take a look?`,
			"hasCoin": true,
			"coinNumber": 6
		},
		obj19: {
			"name": "Metal Crate",
			"hasPrompt": true,
			"desc01":`You see a sturdy metal crate. Do you want to take a look inside?`,
			"hasCoin": true,
			"coinNumber": 8
		},
		obj20: {
			"name": "Input Address Terminal Crate",
			"hasPrompt": true,
			"desc01":`This is a terminal to enter your wallet address. Are you ready to enter your wallet address?`,
			"conditionalResponse": true,
			"cRespParams": [1],
			"cRespFunction": `enterWalletAddress`
		},
		obj21: {
			"name": "Computer",//Address Retriever
			"hasPrompt": true,
			"computerDisplay": 4,
			"desc01":`You find a unlocked computer that can help you get your wallet address. Would you like to browse the desktop?`,
			"isComputer": true,	
		},
		obj22: {
			"name": "Terminal 6",
			"hasPrompt": true,
			"desc01":`This terminal requires you to have Ether in your wallet and be on the Arbitrum Sepolia network. Would you like to proceed?`,
			"conditionalResponse": true,
			"cRespParams": [1],
			"cRespFunction": `ethCheck`
			//"cRespParams": [1],
			//"cRespFunction": `openDoor`
		},
		obj23: {
			"name": "Bunk Beds",
			"hasPrompt": false,
			"desc01": `These military-style bunk beds are neatly arranged and appear barely used. It seems rest is a luxury here.`,
		},
		obj24: {
			"name": "Ladder to the Depths",
			"hasPrompt": true,
			"desc01": `A ladder leads down into the shadows. Do you want to climb down and take a closer look?`,
			"hasCoin": true,
			"coinNumber": 10
		},
		obj25: {
			"name": "Tokenomics Primer",
			"hasPrompt": true,
			"desc01": `You find a document titled "Understanding ERC-20 Tokens". Would you like to read it?`,
			"style": "I",
			"longResponse": true,
			"yResp": `ERC-20 tokens are digital assets built on EVM blockchains. ERC-20 is a token standard that helps dApps have greater usability. Because of this standard, tokens follow a uniform set of rules. Tokens enable a wide range of operations. They can be useful for fundraising, voting, and decentralized finance (DeFi) applications. In order to mint, move, or perform other changes with tokens, users need to spend ETH. This is known as gas, which fuels transactions on EVM networks. Everytime you write on the blockchain, you must spend ETH.`
		},
		obj26: {
			"name": "Metal Bench",
			"hasPrompt": true,
			"desc01":`You see something glimmering behind this sturdy metal bench. Do you want look closer?`,
			"hasCoin": true,
			"coinNumber": 11
		},
		obj27: {
			"name": "Metal Lockers",
			"hasPrompt": true,
			"desc01":`You spot a couple metal lockers, maybe there's something inside. Do you want to take a look?`,
			"hasCoin": true,
			"coinNumber": 12
		},
		obj28: {
			"name": "Blue Key Vending Machine",
			"hasPrompt": true,
			"desc01":`This machine is selling ERC-20 tokens called Blue Keys. Would you like to buy one?`,
			"conditionalResponse": true,
			"cRespParams": [],
			"cRespFunction": `buyBlueKey`
		},
		obj29: {
			"name": "Terminal 7",
			"hasPrompt": true,
			"desc01":`This terminal requires you to have a Blue Key token in your wallet on the Arbitrum Sepolia network. Would you like to proceed?`,
			"conditionalResponse": true,
			"cRespParams": [],
			"cRespFunction": `blueKeyCheck`
		},
		obj30: {
			"name": "Terminal 8",
			"hasPrompt": true,
			"desc01":`This terminal requires you to approve a contract to use your Blue Key token. Would you like to proceed?`,
			"conditionalResponse": true,
			"cRespParams": [],
			"cRespFunction": `approveBlueKey`
		},
		obj31: {
			"name": "Terminal 9",
			"hasPrompt": true,
			"desc01":`This terminal requires you to transfer a Blue Key token to a holding contract. Would you like to proceed?`,
			"conditionalResponse": true,
			"cRespParams": [],
			"cRespFunction": `transferBlueKeyToken`
		},
		obj32: {
			"name": "Bunk Beds",
			"hasPrompt": true,
			"desc01": `You think you see something under one of the pillows. Would you like to take a look?`,
			"hasCoin": true,
			"coinNumber": 13
		},
		obj33: {
			"name": "Metal Lockers",
			"hasPrompt": true,
			"desc01":`You spot a couple metal lockers, maybe there's something inside. Do you want to take a look?`,
			"hasCoin": true,
			"coinNumber": 16
		},
		obj34: {
			"name": "Smart Contract Interaction Guide",
			"hasPrompt": true,
			"desc01": `You find a document on the desktop titled "Smart Contract Interactions: Deposits and Withdrawals". Would you like to learn more about these processes?`,
			"style": "I",
			"longResponse": true,
			"yResp": `Interacting with smart contracts for token transfers involves several steps. First, approving a contract enables it to transfer tokens on your behalf. This must be done before the contract can interact with your tokens. You may want to deposit tokens into a contract for many reasons, such as staking, gaming, or trading. Be aware that once your tokens are deposited, they are controlled by the contract's rules and code. Withdrawing tokens typically reverses this process. If you are permitted to do so, you may transfer the tokens from the contract and back to your  wallet.  If a contract has possession of your tokens, your tokens are exposed to smart contract risk.`
		},
		obj35: {
			"name": "Token Approval Safety",
			"hasPrompt": true,
			"desc01": `You come across a briefing titled "Navigating Token Approvals Safely". Do you want to read about reducing risks during token approvals?`,
			"style": "I",
			"longResponse": true,
			"yResp": `Token approvals grant smart contracts permission to move tokens on your behalf. This is necessary to use decentralized finance (DeFi) applications. It may also be necessary for other functions and blockchain-based services. WARNING: overly broad permissions can pose significant risks. Contract may be exploited and abuse the permissions that you granted. To minimize these risks, always verify the contract's credibility before approving tokens. Consider limiting the amount of tokens approved. Approve just enough to cover the transaction requirements. Also, regularly review and revoke unnecessary permissions. Understanding and managing token approvals will improve your security in the decentralized landscape.`
		},
		obj36: {
			"name": "Metal Crate",
			"hasPrompt": true,
			"desc01":`You see a sturdy metal crate. Do you want to take a look inside?`,
			"hasCoin": true,
			"coinNumber": 17
		},
		obj37: {
			"name": "Terminal 10",
			"hasPrompt": true,
			"desc01":`This terminal requires you to withdraw a Blue Key token from the holding contract. Would you like to proceed?`,
			"conditionalResponse": true,
			"cRespParams": [],
			"cRespFunction": `withdrawBlueKeyToken`
		},
		obj38: {
			"name": "Terminal 11",
			"hasPrompt": true,
			"desc01":`This is terminal requires you to enter your wallet address. Are you ready to enter it?`,
			"conditionalResponse": true,
			"cRespParams": [2],
			"cRespFunction": `enterWalletAddress`
		},
		obj39: {
			"name": "NFT Token Vending Machine",
			"hasPrompt": true,
			"desc01":`This vending machine allows you to mint ONE token redeemable for a graduation gift NFT. Would you like to activate it?`,
			"conditionalResponse": true,
			"cRespParams": [],
			"cRespFunction": `mintGraduationGiftToken`
		},
		obj40: {
			"name": "NFT Vending Machine",
			"hasPrompt": true,
			"desc01":`This machine will trade a Graduation Gift token for a random graduation gift NFT. Would you like to activate it?`,
			"conditionalResponse": true,
			"cRespParams": [],
			"cRespFunction": `getGraduationGift`
		},
		obj41: {
			"name": "Chainlink VRF Explained",
			"hasPrompt": true,
			"desc01": `You discover a guide titled "Understanding Chainlink VRF". Do you wish to learn about verifiable randomness?`,
			"style": "I",
			"longResponse": true,
			"yResp": `Chainlink VRF (Verifiable Random Function) provides provably fair and verifiable randomness, essential for many blockchain applications like gaming and NFTs. Unlike traditional randomness sources which might be opaque or manipulable, Chainlink VRF generates randomness that is transparent and verifiable on the blockchain. This ensures that outcomes are fair and cannot be tampered with by participants or external parties, significantly enhancing the trust and security in decentralized applications.`
		},
		obj42: {
			"name": "Metal Bench",
			"hasPrompt": true,
			"desc01":`You see something glimmering behind this sturdy metal bench. Do you want look closer?`,
			"hasCoin": true,
			"coinNumber": 19
		},
		obj43: {
			"name": "Chainlink VRF Mastery",
			"hasPrompt": true,
			"desc01": `You stumble upon a detailed explanation titled "Mastering Chainlink VRF". Are you ready to understand the critical role of verifiable randomness in blockchain technology?`,
			"style": "I",
			"longResponse": true,
			"yResp": `Chainlink VRF (Verifiable Random Function) is key to ensuring fairness and security in blockchain applications, particularly in NFT generation and gaming. This technology guarantees that the randomness used in these applications can be verified by anyone directly on the blockchain, which prevents manipulation and ensures that all outcomes are equally probable and tamper-proof. Participants can trust that the outcomes of a VRF request are fair. Do you like your graduation gift? Your unique gift was selected by a VRF request. Congratulations again!`
		
		},
		obj44: {
			"name": "Metal Crate",
			"hasPrompt": true,
			"desc01":`You see a sturdy metal crate. Do you want to take a look inside?`,
			"hasCoin": true,
			"coinNumber": 20
		},
		obj45: {
			"name": "Terminal 12",
			"hasPrompt": true,
			"desc01":`You must possess a graduation gift NFT or redemption token in order to operate this terminal. Would you like to activate it?`,
			"conditionalResponse": true,
			"cRespParams": [],
			"cRespFunction": `graduationAssetsCheck`
		},
		obj46: {
			"name": "Terminal 13",
			"hasPrompt": true,
			"desc01":`You must possess a graduation gift NFT in order to operate this terminal. Would you like to activate it?`,
			"conditionalResponse": true,
			"cRespParams": [],
			"cRespFunction": `graduationGiftCheck`
		},
		obj47: {
			"name": "Bunk Beds",
			"hasPrompt": true,
			"desc01": `You think you see something shiny under the mattress. Would you like to take a look?`,
			"hasCoin": true,
			"coinNumber": 21
		},
		
	});

});


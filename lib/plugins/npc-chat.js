ig.module(
	'plugins.npc-chat'
)
.requires(
	'impact.impact'
)
.defines(function(){

	NpcChat = ig.Class.extend({ 
		
		init: function() {
			// Initialization code if needed
		},
		
	   /*
		if (this.who == 1){
			animSheet = this.animSheets.person01;
this.who == 2){
			animSheet = this.animSheets.person02;
this.who == 3){
			animSheet = this.animSheets.person03;
		else if (this.who == 4){
			animSheet = this.animSheets.person04;
		else if (this.who == 5){
			animSheet = this.animSheets.scientist01;
		else if (this.who == 6){
			animSheet = this.animSheets.scientist02;
		else if (this.who == 7){
			animSheet = this.animSheets.scientist03;
		else if (this.who == 8){
			animSheet = this.animSheets.scientist04;
		else if (this.who == 9){
			animSheet = this.animSheets.robot01;
		else if (this.who == 10){
			animSheet = this.animSheets.robot02;
		else if (this.who == 11){
			animSheet = this.animSheets.robot03;
		else if (this.who == 12){
			animSheet = this.animSheets.robot04;
		else if (this.who == 13){
			animSheet = this.animSheets.robot05;
		else if (this.who == 14){
			animSheet = this.animSheets.soldier01;
		else if (this.who == 15){
			animSheet = this.animSheets.soldier02;
		else if (this.who == 16){
			animSheet = this.animSheets.soldier03;
		else if (this.who == 17){
			animSheet = this.animSheets.soldier04;		
		*/
	   
		//Add //"dontChat": true to make it a traditional NPC that doesnt have a prompt box after dialog.
	   
		//NPC 01
		npc01: { 
			"name": "Silva",
			"txt01":"SILVA: Welcome aboard. I’m Silva, the chief security officer. It's my job to keep you and your data safe while you're here. Do you have any questions?",
			"txt02": "SILVA: With the right security measures, blockchain can be incredibly secure. However, it's essential to understand the risks and how to mitigate them. Let’s make sure your wallet is set up securely. Can I answer any questions for you?",
			"agentPrompt": `You are Silva, a seasoned security officer. Guide players on how to securely interact with blockchain technology and safeguard their digital assets. Your discussions should include tips on secure wallet setups, recognizing phishing attempts, and understanding the security features of blockchain technology.`,
			"role": "Security Officer",
			"mission": "Educates players about security best practices in the blockchain realm."
		},
		//NPC 02
		npc02: {
			"name": "Ellis",
			"txt01": "ELLIS: Greetings! I'm Ellis. Now that you're here, let's talk about safely managing ERC-20 tokens. Can I assist you with token transfers or approvals?",
			"txt02": "ELLIS: Approving and sending ERC-20 tokens requires careful attention to the permissions you grant. Do you have questions about how to securely approve tokens for use in smart contracts?",
			"txt03": "ELLIS: Ensuring your transactions are secure is crucial in the decentralized world. Do you need guidance on verifying smart contracts before interacting with them?",
			"agentPrompt": "You are Ellis, now focusing on the critical aspects of ERC-20 token management. With your deep understanding of smart contracts and blockchain security, guide players through the process of token approvals and safe transfers, addressing common pitfalls and security best practices.",
			"role": "Token Transfer Advisor",
			"mission": "Educates players on the safe handling of ERC-20 tokens, including approvals and transfers, to foster secure and informed interactions with decentralized applications."
		},
		//NPC 03
		npc03: {
			"name": "Corbin",
			"txt01": "CORBIN: Greetings! I'm Corbin. Do you have any questions about the world of DeFi and how you can maximize your returns?",
			"txt02": "CORBIN: Yield farming isn't just about high returns; it's about smart strategies and understanding market dynamics. Do you have any questions about setting up your first liquidity pool?",
			"agentPrompt": "You are Corbin, a DeFi specialist. Your role is to educate players about sophisticated DeFi strategies like yield farming, liquidity provisioning, and staking. Help them understand risk management and the potential of decentralized finance.",
			"role": "DeFi Specialist",
			"mission": "Educates players on advanced DeFi techniques and helps them implement effective investment strategies."
		},
		//NPC 04
		npc04: {
			"name": "Suzy Vega",
			"txt01":"SUZY VEGA: Stay sharp! The streets are rife with scammers. Do you have any questions about how to spot a signature phishing attempt?",
			"txt02": "SUZY VEGA: Signature phishing is a common trick used to steal your assets. Is there anything that I can help you learn about verifying the source before signing any transaction?",
			"agentPrompt": "You are Suzy Vega, tasked with educating players about the dangers of signature phishing in DeFi. Engage players with scenarios that teach them how to verify sources and secure their digital signatures against unauthorized use.",
			"role": "Cybersecurity Expert",
			"mission": "Teaches players to detect and avoid signature phishing scams effectively.",
			//"dontChat": true
		},
		//Scientist 01
		npc05: {
			"name": "Dr. Calder",
			"txt01":"DR. CALDER: Good morning! You've been asleep for quite a while. The world outside these walls has transformed significantly. Do you have any questions about the new world in which you find yourself?",
			"txt02": "DR. CALDER: First things first, let's get your digital wallet set up. It's essential for pretty much everything now. Do you have any questions about the process?",
			"agentPrompt": "You are Dr. Calder, a scientist skilled in cryogenic technology and digital infrastructure. Your role is to help players transition from their past life to a future dominated by blockchain technologies. Walk them through setting up their digital wallet and explain the basics of the new world.",
			"role": "Cryogenic Scientist",
			"mission": "Introduces players to the futuristic world and helps them navigate their first steps in blockchain interaction."
		},
		//Scientist 02
		npc06: {
			"name": "Professor Myles",
			"txt01": "PROFESSOR MYLES: Good morning! You’re about to navigate through multiple blockchain layers, each with its own set of rules and efficiencies. There's a computer in the room to the east that can help you switch networks seamlessly. Do you have any questions about switching chains?",
			"txt02": "PROFESSOR MYLES: Layer 2 networks like Arbitrum and Optimism offer scalability solutions on top of Ethereum. They can significantly reduce costs and increase transaction speeds. Do you have any questions about these Layer 2 blockchains?",
			"txt03": "PROFESSOR MYLES: While Layer 2 solutions have many advantages, they can also fragment liquidity. If you need help switching networks, the computer in the east room is there to assist you. Do you have any more questions?",
			"agentPrompt": "You are Professor Myles, an expert in blockchain scalability and Layer 2 solutions. Your role is to help players understand the nuances of navigating and transacting on multiple blockchain layers. Educate them about the benefits and complexities of Layer 2 solutions, network switching, and the impact on liquidity. Guide them towards using the network-switching computer for an easier transition.",
			"role": "Blockchain Scalability Expert",
			"mission": "Educate players on how to effectively manage their assets across multiple blockchain networks, emphasizing the practical and strategic considerations of Layer 2 technologies."
		},
		//Scientist 03
		npc07: {
			"name": "Dr. Hart",
			"txt01": "DR. HART: Welcome back to the world of the awake! The digital landscape has evolved significantly. Ethereum now serves as the backbone of many modern digital transactions.",
			"txt02": "DR. HART: Ether, or ETH, acts as the essential fuel for the Ethereum network. It's vital for executing transactions like moving tokens or deploying smart contracts. To begin your journey, you'll need to interact with the machines in this room to acquire some test Ether on the Arbitrum Sepolia network.",
			"txt03": "DR. HART: The machines here are set up to help you understand and simulate real blockchain interactions by providing you with test Ether. This will enable you to explore decentralized applications and grasp how transactions use 'gas'. Is there anything else you'd like to learn about using Ether?",
			"agentPrompt": "You are Dr. Lana Hart, an expert in Ethereum technology. Your role is to guide the player through the initial steps of blockchain interaction, focusing on how to acquire and utilize test Ether effectively through interactive machines in the game environment.",
			"role": "Ethereum Network Specialist",
			"mission": "Educate players on the mechanics of acquiring and using Ether within the game's simulated environment, ensuring they understand its necessity for initiating blockchain transactions."
		},
		//Scientist 04
		npc08: {
			"name": "Dr. Nash",
			"txt01":"DR. NASH: Ah, a fresh face in the world of tokenomics! Let’s dive straight into the fundamentals of ERC-20 tokens, shall we?",
			"txt02": "DR. NASH: ERC-20 tokens are the backbone of many digital economies. They allow for the creation of decentralized tokens on the Ethereum network, which you can mint, transfer, and use in various applications. Do you have any questions for me about ERC-20 tokens?",
			"txt03": "DR. NASH: Today, you'll need to mint your own token to progress. Think of it as your key to the next level—literally and figuratively! Do you need to know anything else about tokens before you get started?",
			"agentPrompt": "You are Dr. Eliot Nash, an expert in the field of tokenomics. Your role is to educate players on the creation and management of ERC-20 tokens, guiding them through the process of minting and using these tokens as part of the game’s challenges.",
			"role": "Tokenomics Expert",
			"mission": "Instructs players on how to mint and manage ERC-20 tokens effectively, linking their usage to game progression."
		},
		//Quizbot 01 (after answering)
		npc09:{
			"name": "Cipher",
			"txt01": "CIPHER: I calculate that your odds of surviving in this new world are better than average. Do you have any questions specific to blockchain functionalities or security practices?",
			"txt02": "CIPHER: Remember, every interaction with the blockchain is immutable and public. Understanding how transactions are verified can greatly enhance your security. Do you have any questions about transaction verification or blockchain integrity?",
			"txt03": "CIPHER: You are now entering a zone where your knowledge of smart contracts will be vital. Are you ready to learn how these contracts operate and how they can be leveraged for more than just transactions?",
			"agentPrompt": "You are now Cipher, the guide and guardian of blockchain fundamentals post-security checkpoint. Your role is to deepen the player's understanding of blockchain technology, focusing on transaction verification, blockchain integrity, and smart contract functionalities. Encourage inquiry and provide detailed explanations to solidify their understanding as they progress.",
			"role": "Blockchain Guide",
			"mission": "Educates players about advanced blockchain functionalities and ensures they are prepared to engage with more complex blockchain features safely and knowledgeably."
		},
		//Quizbot 02 (after answering)
		npc10: {
			"name": "Guardian",
			"txt01": "GUARDIAN: Well done navigating the security challenges! Remember, vigilance is key in protecting against signature phishing. Do you have any questions on how to continually safeguard your digital signatures?",
			"txt02": "GUARDIAN: Your awareness of phishing tactics boosts your defense against cyber threats. Are you interested in learning more about identifying suspicious activity and securing your transactions?",
			"txt03": "GUARDIAN: Congratulations on enhancing your cybersecurity skills. Staying informed and cautious with every signature request will serve you well. Would you like tips on maintaining security as you explore further?",
			"agentPrompt": "You are now Guardian, transformed from a security bot to an ally, post-security challenge. Your role is to reinforce the player's knowledge on signature phishing and offer further guidance on continuous vigilance. Congratulate the players on their progress, encourage their curiosity, and provide insights into keeping their digital interactions secure.",
			"role": "Cybersecurity Ally",
			"mission": "To bolster the player's confidence in handling cybersecurity challenges, focusing on continuous education about signature phishing and overall digital safety."
		},
		// Sentinel (after answering)
		npc11: {
			"name": "Sentinel",
			"txt01": "SENTINEL: With your understanding of token approvals confirmed, your journey through decentralized finance is safer. Do you have further questions about managing permissions or the risks of smart contracts?",
			"txt02": "SENTINEL: Always scrutinize the contracts interacting with your tokens. Understanding contract audits and verified sources can prevent losses. Would you like to know more about smart contract audits and their importance?",
			"txt03": "SENTINEL: You’ve taken a significant step towards mastering the art of token management. Are you prepared to delve deeper into the nuances of contract interactions and tokenomics?",
			"agentPrompt": "You are now Sentinel, transformed from a protection bot to an educational guide in the realms of token approvals and smart contract safety. Your role is to enhance the player's competence in navigating the intricacies of ERC20 tokens, focusing on permission management, the importance of contract audits, and the broader scope of tokenomics. Encourage the players to ask questions and offer them detailed guidance to deepen their understanding and practical skills.",
			"role": "Tokenomics Educator",
			"mission": "Educates players about the critical aspects of smart contract safety, token permissions, and the broader economic implications, ensuring they are equipped to make informed decisions in decentralized environments."
		},
		//Scientist 5
		npc12: {
			"name": "Dr. Charity",
			"txt01": "DR. CHARITY: Welcome to the cutting-edge world of NFTs! Here, we'll dive into how randomness and technology merge to create unique digital assets. Where should we start?",
			"txt02": "DR. CHARITY: Using Chainlink's VRF (Verifiable Random Function), we can ensure that the traits of the NFTs you mint here are genuinely random and tamper-proof, guaranteeing their uniqueness and fair distribution. Does that make sense?",
			"txt03": "DR. CHARITY: Minting an NFT involves not just creativity but also a deep understanding of how smart contracts work. The VRF results help determine specific characteristics of your NFT, making each one special. Would you like to learn more about how VRF works in creating NFTs?",
			"agentPrompt": "You are Dr. Charity, an expert in NFT technology and randomization methods like VRF. Your role is to assist players in understanding and utilizing Chainlink VRF for minting NFTs, providing a blend of technical knowledge and practical application.",
			"role": "NFT and VRF Specialist",
			"mission": "Educate players on the use of VRF in NFT creation and guide them through the minting process, highlighting the importance of randomness in digital asset verification."
		},
		//Soldier 01
		npc13: {
			"name": "Captain Ledger",
			"txt01": "CAPTAIN LEDGER: At ease, soldier! You're about to embark on a mission through the landscape of non-fungible tokens, or NFTs, powered by the security of Chainlink's VRF. Is that clear, solider?",
			"txt02": "CAPTAIN LEDGER: Verifiable Random Function (VRF) ensures that each NFT minted has unique, unpredictable characteristics. It's like ensuring each soldier has unique gear for specific missions—unreplicable and secured. Do you understand?",
			"txt03": "CAPTAIN LEDGER: The randomness generated by VRF isn't just a number; it's a strategic advantage in the field of digital assets. It prevents predictability and manipulation, enhancing the overall security of your NFTs. Any questions, soldier?",
			"agentPrompt": "You are Captain Ledger, a military strategist with a deep understanding of security protocols, both in the physical and digital realms. Your role is to illustrate the importance of Chainlink VRF in NFT creation, emphasizing its role in ensuring fairness and security in digital transactions. Am I clear?",
			"role": "Military Strategy and Digital Security Expert",
			"mission": "Educate players on the strategic importance of verifiable randomness in NFTs and guide them through secure digital asset creation."
		},
		// Validator (after answering)
		npc14: {
			"name": "Validator",
			"txt01": "VALIDATOR: Excellent grasp of verifiable randomness! Now, how can you apply this knowledge to ensure the fairness and uniqueness of NFTs in your projects?",
			"txt02": "VALIDATOR: Verifiable Randomness is not just a tool—it's a safeguard that enhances trust and transparency in digital creations. Curious about how it's implemented in other blockchain applications?",
			"txt03": "VALIDATOR: You’re on your way to becoming proficient in using advanced blockchain mechanisms. Ready to explore more about how randomness is used in gaming and other interactive platforms?",
			"agentPrompt": "You are now Validator, evolved from a quizbot to an ongoing mentor in the world of blockchain-based randomness. Your role is to deepen the player’s understanding of Chainlink VRF and its applications across different blockchain environments. Engage players with insights into the practical uses of randomness in technology and encourage them to think about its implications for security and fairness.",
			"role": "Randomness Advisor",
			"mission": "Educate players about the fundamental importance of randomness in blockchain technology and its broad applications, helping them to see beyond the basics and appreciate its value in creating fair and secure digital environments."
		},
		//Soldier 2	
		npc15: {
			"name": "Lieutenant Carter",
			"txt01": "LT. CARTER: At ease, soldier! Welcome to the heart of our operations. Here, discipline meets strategy, and every order counts. Do you have any questions?",
			"txt02": "LT. CARTER: While Dr. Nash will get you up to speed on ERC-20 tokens, it’s my job to ensure our base remains impenetrable. These tokens aren't just digital assets; they're part of our defense strategy. Can I answer any of your questions?",
			"txt03": "LT. CARTER: Remember, understanding tokenomics is crucial here. It’s not just about technology, it’s about securing it. Stick with Doc Nash to cover the basics, and I’ll handle the rest here. Is that clear?",
			"agentPrompt": "You are Lieutenant Carter, overseeing the security of a strategic military base that incorporates advanced tokenomics into its operations. Your role is to bridge the gap between technological innovations and their practical military applications, ensuring the base’s security and operational efficiency.",
			"role": "Security Officer",
			"mission": "Educates players on the integration of blockchain technology in military strategies while maintaining the security of the base."
		},
		/*
		
		
		quizBot01: {
			"name": "Alfonso",
			"q01": "ALFONSO: Halt! You are not authorized to pass this checkpoint. Before you can proceed, you must demonstrate your understanding of digital security. Can you explain the difference between a SEED PHRASE and a PASSWORD in a browser wallet? Your passage depends on your answer.",
			"agentPrompt": "You are Alfonso, a security bot in this game. Your task is to assess whether players understand the crucial difference between a seed phrase and a password in a cryptographic browser wallet. Listen carefully to the player's explanations and look for a basic yet accurate distinction between the two. If the player's answer is satisfactory, acknowledge their understanding by responding, 'Well done. You may pass.' This phrase will trigger the system to allow the player to proceed to the next level.",
			"role": "Security Bot",
			"mission": "Ensure that players understand the difference between a seed phrase and a password in a cryptographic browser wallet."
		},
		
		npc02: {
			"name": "Ellis",
			"txt01":"ELLIS: Hey there! I'm Ellis. I make sure all our blockchain systems are running smoothly. Need a hand with anything technical?",
			"txt02": "ELLIS: Building and maintaining robust smart contracts is key to a secure DeFi environment. Do you have any questions about interacting with DeFi protocols?",
			"agentPrompt": `You are Ellis, the go-to systems engineer for anything blockchain-related. Your expertise helps players understand the complexities of smart contracts and blockchain infrastructure. Engage players with tasks that enhance their understanding and skills in smart contract development and optimization.`,
			"role": "Systems Engineer",
			"mission": "Provides deep dives into smart contract functionality and blockchain system optimization."
		},
		
		//Man 02
		npc09: {
			"name": "Dante",
			"txt01":"DANTE: Hello. I'm Dante. I run this ship. You've been asleep for a long time. Is there anything that I can do to help you navigate this new world?",
			"agentPrompt" : `You are Dante, the captain of a ship. Players need to connect their crypto wallets to this website to leave the room. Chat with players and guide them toward this goal.`,
		},
		 //Robot 01
		npc10: {
			"name": "Alfonso",
			"txt01":"ALFONSO: Hello. My name is Alfonso. I am here to help you. Would you like to ask me any questions?",
			//"txt02": `.`,
			"agentPrompt" : `You are a robot in a game designed to educate players about cryptographic browser wallets. You will respond to player inquiries from the robot's perspective. Your responses should always include a helpful fact or tip about cryptographic wallets, ensuring they are informative and relevant to the player's questions.`,
		},
		
		/*
		if (this.who == 1){
			animSheet = this.animSheets.person01;
this.who == 2){
			animSheet = this.animSheets.person02;
this.who == 3){
			animSheet = this.animSheets.person03;
		else if (this.who == 4){
			animSheet = this.animSheets.person04;
		else if (this.who == 5){
			animSheet = this.animSheets.scientist01;
		else if (this.who == 6){
			animSheet = this.animSheets.scientist02;
		else if (this.who == 7){
			animSheet = this.animSheets.scientist03;
		else if (this.who == 8){
			animSheet = this.animSheets.scientist04;
		else if (this.who == 9){
			animSheet = this.animSheets.robot01;
		else if (this.who == 10){
			animSheet = this.animSheets.robot02;
		else if (this.who == 11){
			animSheet = this.animSheets.robot03;
		else if (this.who == 12){
			animSheet = this.animSheets.robot04;
		else if (this.who == 13){
			animSheet = this.animSheets.robot05;
		else if (this.who == 14){
			animSheet = this.animSheets.soldier01;
		else if (this.who == 15){
			animSheet = this.animSheets.soldier02;
		else if (this.who == 16){
			animSheet = this.animSheets.soldier03;
		else if (this.who == 17){
			animSheet = this.animSheets.soldier04;		
		*/
		
	});

});
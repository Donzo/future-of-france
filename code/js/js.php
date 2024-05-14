<script>
	//General Purpose JavaScript Functions
	var providerName = false;
	
	function loginUser(accountNumber, level) { //Called From Wallet-Connect Script
		fetch('/code/php/login-new-game.php', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: `account=${encodeURIComponent(accountNumber)}&level=${encodeURIComponent(level)}`
		})
		.then(response => response.json())
		.then(data => {
			console.log('Success:', data);
			ig.game.inspObjTxt = "You have successfully connected your wallet. Opening door...";
			ig.game.promptBoxOpen = false;
			ig.game.objBoxOpen = true;
			ig.game.openThisDoor = 1; //Open Door 1
			ig.game.killThisObject = true; //Kill Terminal Interaction Object
		})
		.catch((error) => {
			console.error('Error:', error);
		});
	}
	
	async function loadSavedGame() {
		try {
			await ethereum.request({ method: 'eth_requestAccounts' });
		}
		catch(error){
			console.log('No wallet connection:', error);
			popConfirm(1);
			return; // Exit if there's no wallet connection
		}

		const accounts = await ethereum.request({ method: 'eth_accounts' });

		if (accounts.length) {
			console.log(`You're connected to: ${accounts[0]}`);
			const account = accounts[0];
			window['userAccountNumber'] = account;

			// Fetch the saved game data from the server
			fetch('/code/php/load-game-from-db.php', {
				method: 'POST',
				headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
				},
				body: `account=${encodeURIComponent(account)}`
			})
			.then(response => response.json())
			.then(data => {
				if (data.status === "success") {
					console.log('Game data loaded:', data.data);
					//ig.game.fadeIn(1.25, "#FFFFFF");
					ig.game.LoadLevelBro(data.data.current_level);
					ig.game.madeItToLvl = data.data.last_level_passed;
					ig.game.playMusicBro(1);
					ig.game.fadeOut(0, "#F8F8FF");
					ig.game.transitionReady = false;
				}
				else{
					popAlert(1);
					console.log('Error loading game data:', data.message);
				}
			})
			.catch((error) => {
				popAlert(10);
				console.error('Error fetching game data:', error);
			});
		}
		else{
			popConfirm(1);
			console.log('No account number found.');
		}
	}
	
	function saveGame(accountNumber, currentLevel, lastLevelPassed) { //Called after specific game events
		fetch('/code/php/save-game.php', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: `account=${encodeURIComponent(accountNumber)}&currentLevel=${encodeURIComponent(currentLevel)}&lastLevelPassed=${encodeURIComponent(lastLevelPassed)}`
		})
		.then(response => response.json())
		.then(data => {
			console.log('Success:', data);
		})
		.catch((error) => {
			console.error('Error:', error);
		});
	}
	async function getTestETH(which){
		var whichETHscript = false;
		if (which == 1){
			 whichETHscript = '/code/php/send-arbi-sepolia-eth.php?wallet=' + window['userAccountNumber'];
		}
		fetch(whichETHscript)
		.then(response => response.json())
		.then(data => {
			if (data.success) {
					console.log('Transaction Hash:', data.hash);
					console.log('message:', data.message);
					// Handle successful transaction here
					//{"success":true,"message":"Transaction successful and database updated!","hash":"0xbb2d532eb449a65028f16f8ee15b2c26f6c4c21b700b55fba2a8e1097ae706bd"}

			}
			else{
				console.error('Error:', data.message);
			}
		})
		.catch(error => {
				console.error('Fetch error:', error);
		});
	}
	async function providerCheck(which, when){

			if (window.ethereum){
  		 		chainId = await window.ethereum.request({
					"method": "eth_chainId",
					"params": []
				});
  		 	}
			
			//Get providerName
			if (chainId == "0xaa36a7"){
  				providerName = "Ethereum Sepolia";
  			}	
			else if (chainId == "0x89"){
  				providerName = "Polygon";
  			}	
			else if (chainId == "0x5"){
  				providerName = "Goerli";
  			}
			else if (chainId == "0xa86a"){
				providerName = "Avalanche";
			}
			else if (chainId == "0x1"){
  				providerName = "Ethereum";
  			}
  			else if (chainId == "0x2a"){
  				providerName = "Kovan";
  			}
  			else if (chainId == "0x4"){
  				providerName = "Rinkeby";
  			}
  			else if (chainId == "0xa4b1"){
  				providerName = "Arbitrum";
  			}
  			else if (chainId == "0x66eed"){
  				providerName = "ArbiGoerli";
  			}
  			else if (chainId == "0xa869"){
  				providerName = "Ava Fuji";
  			}
  			else if (chainId == "0x8274f"){
				//Scroll Sepolia
				providerName = "Scroll Sepolia";
			}
			else if (chainId == "0x66eee"){
				//Arbitrum Sepolia
				providerName = "Arbitrum Sepolia";
			}
			else if (chainId == "0xaa37dc"){
				//OP Sepolia
				providerName = "OP Sepolia";
			}
  			else if (window.ethereum){
  		 		providerName = "Unknown Ethereum Network";
			}
  			else{
  				providerName = "unhandled network";
  			}
  			console.log('which = ' + which + " providerName = " + providerName)
  			if (when == 1){
  				if (which == providerName){
  					ig.game.inspObjTxt = "You are connected to the Ethereum Sepolia network. Opening door...";
					ig.game.promptBoxOpen = false;
					ig.game.objBoxOpen = true;
					ig.game.openThisDoor = 2; //Open Door 2
					ig.game.killThisObject = true; //Kill Terminal Interaction Object
  				}
  				else{
  					ig.game.inspObjTxt = "You are not on the " + which + " network.";
					ig.game.promptBoxOpen = false;
					ig.game.objBoxOpen = true;
  				}
  			}
  			else if (when == 2){
  				if (which == providerName){
  					ig.game.inspObjTxt = "You are connected to the  " + which + " network. Opening door...";
					ig.game.promptBoxOpen = false;
					ig.game.objBoxOpen = true;
					ig.game.openThisDoor = 3; //Open Door 3
					ig.game.killThisObject = true; //Kill Terminal Interaction Object
  				}
  				else{
  					ig.game.inspObjTxt = "You are not on the " + which + " network.";
					ig.game.promptBoxOpen = false;
					ig.game.objBoxOpen = true;
  				}
  			}
  			else if (when == 3){
  				if (which == providerName){
  					ig.game.inspObjTxt = "You are connected to the  " + which + " network. Opening door...";
					ig.game.promptBoxOpen = false;
					ig.game.objBoxOpen = true;
					ig.game.openThisDoor = 4; //Open Door 4
					ig.game.killThisObject = true; //Kill Terminal Interaction Object
  				}
  				else{
  					ig.game.inspObjTxt = "You are not on the " + which + " network.";
					ig.game.promptBoxOpen = false;
					ig.game.objBoxOpen = true;
  				}
  			}
		}
		async function getSignature(){

			//Create Web3 Object
			let web3 = new Web3(Web3.givenProvider);
			console.log('HWG')
			//Get Signature
			var mySignature = false;
			
			try {
				mySignature = await web3.eth.personal.sign("Sign this transaction to open the door.", window['userAccountNumber'], "");
			}
			catch(error){
				//Handle Connection Errors
				if (error.code == 4001){ //Rejected
					ig.game.inspObjTxt = "You rejected the signature request.";
					ig.game.promptBoxOpen = false;
					ig.game.objBoxOpen = true;
				}
				else if (error.code == -32002){
					ig.game.inspObjTxt = "You already have a pending signature request. Check your wallet.";
					ig.game.promptBoxOpen = false;
					ig.game.objBoxOpen = true;
				}
				else{
					ig.game.inspObjTxt = "There is a disturbance in the force.";
					ig.game.promptBoxOpen = false;
					ig.game.objBoxOpen = true;
				}
				return;
			}
			
			console.log("mySignature = " + mySignature);
			if (mySignature){
				window['signature'] = mySignature;
				ig.game.inspObjTxt = "You signed the transaction. Opening door...";
				ig.game.promptBoxOpen = false;
				ig.game.objBoxOpen = true;
				ig.game.openThisDoor = 5; //Open Door 5
				ig.game.killThisObject = true; //Kill Terminal Interaction Object
			}
		}
</script>
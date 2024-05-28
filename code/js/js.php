<script>
	//General Purpose JavaScript Functions
	var providerName = false;
	var miningCheckInt = false;
	var checkCount = 0;
	var onWhich = false;
	
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
			if (firstConnection){
				ig.game.inspObjTxt = "You have successfully connected your wallet. Opening door...";
			}
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
			return; //Exit if there's no wallet connection
		}

		const accounts = await ethereum.request({ method: 'eth_accounts' });

		if (accounts.length) {
			console.log(`You're connected to: ${accounts[0]}`);
			const account = accounts[0];
			window['userAccountNumber'] = account;
			fetchCollectedCoins(account);
			
			//Fetch the saved game data from the server
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
					//Load level based on the data received
					ig.game.LoadLevelBro(data.data.current_level);
					ig.game.madeItToLvl = data.data.last_level_passed + 1;
					ig.game.tokenData.totalTokensFound = data.data.total_coins_found; //Set total coins found
					ig.game.tokenData.tokensHeld = data.data.coins_held; //Set coins held
					
					if (data.data.current_level == 8){
						ig.game.playMusicBro(5);	
					}
					else if (data.data.current_level > 8){
						ig.game.playMusicBro(3);
					}
					else{
						ig.game.playMusicBro(1);	
					}
					
					ig.game.fadeOut(0, "#F8F8FF");
					ig.game.transitionReady = false;
				}
				else {
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
	
	function fetchCollectedCoins(account) {
		fetch(`/code/php/retrieve-blue-coins.php?account=${account}`)
		.then(response => response.json())
		.then(data => {
			if (data.status === "success") {
				//You can iterate over data.collectedCoins to update the game state
				for (let coin in data.collectedCoins) {
					if (data.collectedCoins[coin]) {
						ig.game.coinsFound[coin] = true;
					}
				}
			}
			else {
				console.error('Error:', data.message);
			}
		})
		.catch(error => {
			console.error('Fetch error:', error);
		});
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
	async function fetchCommissionerTask() {
		try {
			const response = await fetch(`/code/php/check-commissioner.php?wallet=${window['userAccountNumber']}`);
			const data = await response.json();
			//console.log(data);
			if (response.ok) {
				return data.commissioner_task;
			}
			else {
				throw new Error(data.message || "Failed to fetch commissioner task");
			}
		}
		catch (error) {
			console.error("Error fetching commissioner task:", error);
		}
	}
	async function updateCommissionerTask(taskValue) {
		try {
			const response = await fetch('/code/php/update-commissioner.php', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
				},
				body: `wallet=${encodeURIComponent(window['userAccountNumber'])}&task=${taskValue}`
			});
			const data = await response.json();
			console.log(data); // Logging the response data to the console
			if (response.ok) {
				return data.message; // Assuming the PHP script returns a message in the JSON
			}
			else {
				throw new Error(data.message || "Failed to update commissioner task");
			}
		}
		catch (error) {
			console.error("Error updating commissioner task:", error);
		}
	}

	async function ethCheckHere(){
			//Create Web3 Object
			let web3 = new Web3(Web3.givenProvider);
			
			try {
			
				await window.ethereum.request({ method: 'eth_requestAccounts' });

				//Get the balance of the account
				var balance = await web3.eth.getBalance(window['userAccountNumber']);
				balance = web3.utils.fromWei(balance, 'ether')
				//Compare the balance with the threshold
				if (balance > 0) {
					console.log(`Balance is sufficient: ${balance} ETH`);
					ig.game.inspObjTxt = "You have  " + balance + " ETH. Opening door...";
					ig.game.promptBoxOpen = false;
					ig.game.objBoxOpen = true;
					ig.game.openThisDoor = 6; //Open Door 6
					ig.game.killThisObject = true; //Kill Terminal Interaction Object
					ig.game.playSuccessSound1();
				}
				else {
					console.log(`Balance is insufficient: ${balance} ETH`);
					ig.game.inspObjTxt = "You do not have any ETH. Try to use the ETH dispenser in this room.";
					ig.game.promptBoxOpen = false;
					ig.game.objBoxOpen = true;
					ig.game.playAlertSound();
				}
				ig.game.turnOffMessageWithoutMe = true;
			}
			catch (error) {
				console.error('Error checking ether balance:', error);
			}
	}
	/*8 decimals*/
	function processNumberForContract(num){
		var numParts = num.toString().split('.');

		var zerosToAdd;

		if (!numParts[1]) {
			zerosToAdd = 8;
		}
		else if (numParts[1].length === 1) {
			num = num * 10;
			zerosToAdd = 7;
		}
		else{
			num = Math.floor(num * 100) / 100;
			zerosToAdd = 6;
		}
		if (numParts[1]) {
			var noDecimal = Math.floor(num * 100);
			num = noDecimal;
		}
		var addedZeros = num * Math.pow(10, zerosToAdd);

		var resultStr = addedZeros.toString();
		return resultStr;
	}

	//Turn 8 decimal smart contract returned values back into human readable money values
	function processNumberForDisplay(num){
		if (isNaN(num)){
			console.error("Invalid input: not a number");
			return null;
		}

		var numStr = num.toString();

		var requiredLength = numStr.length >= 8 ? numStr.length : 8;
		numStr = numStr.padStart(requiredLength, '0');
		var decimalPosition = numStr.length - 8;
		var withDecimal = numStr.slice(0, decimalPosition) + "." + numStr.slice(decimalPosition);

		var number = parseFloat(withDecimal);
		var formattedNumber;

		if (number <= 0.01){
			formattedNumber = number.toString();
		}
		else{
			formattedNumber = number.toFixed(2);
		}
		return formattedNumber;
	}
	function makeRegularNumberHave18DecimalPlaces(num){
		var numParts = num.toString().split('.');
	
		var zerosToAdd;
		if (!numParts[1]){
			num = num * 100;
			zerosToAdd = 16;
		}
		else if (numParts[1].length === 1){
			num = num * 10;
			zerosToAdd = 17;
		}
		else{
			num = Math.floor(num * 100) / 100;
			zerosToAdd = 16;
		}

		var noDecimal = Math.floor(num * 100);
		var addedZeros = noDecimal * Math.pow(10, zerosToAdd);

		var resultStr = addedZeros.toString();
		//resultStr = resultStr.split('.').join("");
		return resultStr;
	}
	function markCharChange(){
		ig.game.charChange = true;
	}
	async function requestTestETH(which){
		var whichETHscript = false;
		onWhich = which;
		if (which == 1 && ig.game.playersEnteredAddress != window['userAccountNumber'].toLowerCase()){
			popAlert(13, false); //Havent entered address
			return;
		}
		
		if (which == 1){
			popMiningBox(12,  "0x0x0x0x0x0x")
			whichETHscript = '/code/php/send-arbi-sepolia-eth.php?wallet=' + window['userAccountNumber'];
		}
		else if (which == 2){
			popMiningBox(30,  "0x0x0x0x0x0x")
			whichETHscript = '/code/php/send-sepolia-eth.php?wallet=' + window['userAccountNumber'];
		}
		fetch(whichETHscript)
		.then(response => response.json())
		.then(data => {
			if (data.success) {
					console.log('Transaction Hash:', data.hash);
					console.log('message:', data.message);
					ig.game.playSuccessSound1();
					if (onWhich == 2){
						popMiningBox(31, data.hash)
						miningCheckInt = setInterval(checkTransactionMined, 3000, data.hash, 2);
						checkCount = 0;
					}
					else if (onWhich == 1) {
						popMiningBox(13, data.hash);
						miningCheckInt = setInterval(checkTransactionMined, 3000, data.hash, 1);
						checkCount = 0;
					}
			}
			else{
				closeMiningBoxBox();
				if (onWhich == 2){
					popMiningBox(32, data.hash)
				}
				else{
					popAlert(14);
				}
				console.error('Error:', data.message);
			}
		})
		.catch(error => {
				console.error('Fetch error:', error);
		});
	}
	
	function collectCoin(coinNumber) {
		if (!window['userAccountNumber']){
			return
		}
		var account = window['userAccountNumber'];
		const url = `/code/php/collect-coin.php?coinNumber=${coinNumber}&account=${account}`;

		fetch(url)
			.then(response => response.json())
			.then(data => {
				if (data.status == "success") {
					console.log('Message:', data.message);
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
					ig.game.playSuccessSound1();
  				}
  				else{
  					ig.game.inspObjTxt = "You are not on the " + which + " network.";
					ig.game.promptBoxOpen = false;
					ig.game.objBoxOpen = true;
					ig.game.playAlertSound();
  				}
  			}
  			else if (when == 2){
  				if (which == providerName){
  					ig.game.inspObjTxt = "You are connected to the  " + which + " network. Opening door...";
					ig.game.promptBoxOpen = false;
					ig.game.objBoxOpen = true;
					ig.game.openThisDoor = 3; //Open Door 3
					ig.game.killThisObject = true; //Kill Terminal Interaction Object
					ig.game.playSuccessSound1();
  				}
  				else{
  					ig.game.inspObjTxt = "You are not on the " + which + " network.";
					ig.game.promptBoxOpen = false;
					ig.game.objBoxOpen = true;
					ig.game.playAlertSound();
  				}
  			}
  			else if (when == 3){
  				if (which == providerName){
  					ig.game.inspObjTxt = "You are connected to the  " + which + " network. Opening door...";
					ig.game.promptBoxOpen = false;
					ig.game.objBoxOpen = true;
					ig.game.openThisDoor = 4; //Open Door 4
					ig.game.killThisObject = true; //Kill Terminal Interaction Object
					ig.game.playSuccessSound1();
  				}
  				else{
  					ig.game.inspObjTxt = "You are not on the " + which + " network.";
					ig.game.promptBoxOpen = false;
					ig.game.objBoxOpen = true;
					ig.game.playAlertSound();
  				}
  			}
  			else if (when == 4){ //ETHER TEST
  				if (which == providerName){
  					ig.game.inspObjTxt = "Checking your wallet for Ether...";
					ig.game.promptBoxOpen = false;
					ig.game.objBoxOpen = true;
					//ig.game.openThisDoor = 4; //Open Door 4
					//ig.game.killThisObject = true; //Kill Terminal Interaction Object
					ig.game.playSuccessSound1();
					setTimeout("ethCheckHere()", 750); //Run this in .75 second
  				}
  				else{
  					ig.game.inspObjTxt = "You are not on the " + which + " network.";
					ig.game.promptBoxOpen = false;
					ig.game.objBoxOpen = true;
					ig.game.playAlertSound();
  				}
  			}
  			else if (when == 5){ //Buy Blue Key
  				if (which == providerName){
  					ig.game.inspObjTxt = "Buying Blue Key token now...";
					ig.game.promptBoxOpen = false;
					ig.game.objBoxOpen = false;
					buyBlueKeyToken();
  				}
  				else{
  					ig.game.inspObjTxt = "You are not on the " + which + " network. Please switch to the Arbitrum Sepolia Network.";
					ig.game.promptBoxOpen = false;
					ig.game.objBoxOpen = true;
					ig.game.playAlertSound();
  				}
  			}
  			else if (when == 6){ //Blue Key Possession Test
  				if (which == providerName){
  					ig.game.inspObjTxt = "Checking your wallet for Blue Key token now...";
					ig.game.promptBoxOpen = false;
					ig.game.objBoxOpen = true;
					//ig.game.openThisDoor = 4; //Open Door 4
					//ig.game.killThisObject = true; //Kill Terminal Interaction Object
					ig.game.playSuccessSound1();
					setTimeout("blueKeyCheckHere()", 1000); //Run this in 1 second
  				}
  				else{
  					ig.game.inspObjTxt = "You are not on the " + which + " network. Change networks and try again if you'd like.";
					ig.game.promptBoxOpen = false;
					ig.game.objBoxOpen = true;
					ig.game.playAlertSound();
  				}
  			}
  			else if (when == 7){ //Blue Key Approval
  				if (which == providerName){
  					ig.game.inspObjTxt = "Requesting contract approval to transfer your Blue Key token now...";
					ig.game.promptBoxOpen = false;
					ig.game.objBoxOpen = true;
					//ig.game.openThisDoor = 4; //Open Door 4
					//ig.game.killThisObject = true; //Kill Terminal Interaction Object
					ig.game.playSuccessSound1();
					setTimeout("requestBlueKeyApproval()", 1000); //Run this in 1 second
  				}
  				else{
  					ig.game.inspObjTxt = "You are not on the " + which + " network. Change networks and try again if you'd like.";
					ig.game.promptBoxOpen = false;
					ig.game.objBoxOpen = true;
					ig.game.playAlertSound();
  				}
  			}
  			else if (when == 8){ //Blue Key Transfer
  				if (which == providerName){
  					ig.game.inspObjTxt = "Depositing Blue Key token in the holding contract now...";
					ig.game.promptBoxOpen = false;
					ig.game.objBoxOpen = true;
					//ig.game.openThisDoor = 4; //Open Door 4
					//ig.game.killThisObject = true; //Kill Terminal Interaction Object
					ig.game.playSuccessSound1();
					setTimeout("transferBlueKeyToken()", 1000); //Run this in 1 second
  				}
  				else{
  					ig.game.inspObjTxt = "You are not on the " + which + " network. Change networks and try again if you'd like.";
					ig.game.promptBoxOpen = false;
					ig.game.objBoxOpen = true;
					ig.game.playAlertSound();
  				}
  			}
  			else if (when == 9){ //Blue Key Withdraw
  				if (which == providerName){
  					ig.game.inspObjTxt = "Withdrawing Blue Key token from holding contract now...";
					ig.game.promptBoxOpen = false;
					ig.game.objBoxOpen = true;
					ig.game.playSuccessSound1();
					setTimeout("withdrawMyBlueKeyToken()", 1000); //Run this in 1 second
  				}
  				else{
  					ig.game.inspObjTxt = "You are not on the " + which + " network. Change networks and try again if you'd like.";
					ig.game.promptBoxOpen = false;
					ig.game.objBoxOpen = true;
					ig.game.playAlertSound();
  				}
  			}
  			else if (when == 10){ //MINT Graduation Gift Token
  				if (which == providerName){
  					ig.game.inspObjTxt = "Initiating Graduation Gift token mint now...";
					ig.game.promptBoxOpen = false;
					ig.game.objBoxOpen = true;
					ig.game.playSuccessSound1();
					setTimeout("mintGraduationGiftTkn()", 1000); //Run this in 1 second
  				}
  				else{
  					ig.game.inspObjTxt = "You are not on the " + which + " network. Change networks and try again if you'd like.";
					ig.game.promptBoxOpen = false;
					ig.game.objBoxOpen = true;
					ig.game.playAlertSound();
  				}
  			}
  			else if (when == 11){ //MINT Graduation Gift NFT
  				if (which == providerName){
  					ig.game.inspObjTxt = "Initiating Graduation Gift NFT mint now...";
					ig.game.promptBoxOpen = false;
					ig.game.objBoxOpen = true;
					ig.game.playSuccessSound1();
					setTimeout("mintGradGift()", 1000); //Run this in 1 second
  				}
  				else{
  					ig.game.inspObjTxt = "You are not on the " + which + " network. Change networks and try again if you'd like.";
					ig.game.promptBoxOpen = false;
					ig.game.objBoxOpen = true;
					ig.game.playAlertSound();
  				}
  			}
  			else if (when == 12){ //Graduation Gift NFT Check
  				if (which == providerName){
  					ig.game.inspObjTxt = "Checking for graduation gift NFT now...";
					ig.game.promptBoxOpen = false;
					ig.game.objBoxOpen = true;
					ig.game.playSuccessSound1();
					setTimeout("checkForGradGiftNFT()", 1000); //Run this in 1 second
  				}
  				else{
  					ig.game.inspObjTxt = "You are not on the " + which + " network. Change networks and try again if you'd like.";
					ig.game.promptBoxOpen = false;
					ig.game.objBoxOpen = true;
					ig.game.playAlertSound();
  				}
  			}
  			else if (when == 13){ //Graduation Gift NFT Check
  				if (which == providerName){
  					ig.game.inspObjTxt = "Checking for graduation gift assets now...";
					ig.game.promptBoxOpen = false;
					ig.game.objBoxOpen = true;
					ig.game.playSuccessSound1();
					setTimeout("checkForEitherGradGiftAsset()", 1000); //Run this in 1 second
  				}
  				else{
  					ig.game.inspObjTxt = "You are not on the " + which + " network. Change networks and try again if you'd like.";
					ig.game.promptBoxOpen = false;
					ig.game.objBoxOpen = true;
					ig.game.playAlertSound();
  				}
  			}
  			else if (when == 14){ //Deposit ETH in Aave
  				if (which == providerName){
  					ig.game.inspObjTxt = "Looking up your AAVE account...";
					ig.game.promptBoxOpen = false;
					ig.game.objBoxOpen = true;
					ig.game.playSuccessSound1();
					getUserMaxCredit();
  				}
  				else{
  					ig.game.inspObjTxt = "You are not on the " + which + " network. Change networks and try again if you'd like.";
					ig.game.promptBoxOpen = false;
					ig.game.objBoxOpen = true;
					ig.game.playAlertSound();
  				}
  			}
  			else if (when == 15){ //Mint Blue Tokens
  				if (which == providerName){
  					ig.game.inspObjTxt = "Checking your token balance...";
					ig.game.promptBoxOpen = false;
					ig.game.objBoxOpen = true;
					ig.game.playSuccessSound1();
					mintBlueTokens();
  				}
  				else{
  					ig.game.inspObjTxt = "You are not on the " + which + " network. Change networks and try again if you'd like.";
					ig.game.promptBoxOpen = false;
					ig.game.objBoxOpen = true;
					ig.game.playAlertSound();
  				}
  			}
		}
		function mintBlueTokens(){
			alert('lets mint!');
		}
		async function getSignature(){

			//Create Web3 Object
			let web3 = new Web3(Web3.givenProvider);
			//Get Signature
			var mySignature = false;
			
			try {
				mySignature = await web3.eth.personal.sign("Sign this transaction to open the door.", window['userAccountNumber'], "");
			}
			catch(error){
				ig.game.playAlertSound()
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
				ig.game.playSuccessSound1();
				window['signature'] = mySignature;
				ig.game.inspObjTxt = "You signed the transaction. Opening door...";
				ig.game.promptBoxOpen = false;
				ig.game.objBoxOpen = true;
				ig.game.openThisDoor = 5; //Open Door 5
				ig.game.killThisObject = true; //Kill Terminal Interaction Object
			}
		}
		async function checkTransactionMined(transactionHash, where) {
			checkCount++;
			//Create Web3 Object
			let web3 = new Web3(Web3.givenProvider);
			try {
				const receipt = await web3.eth.getTransactionReceipt(transactionHash);
				if (receipt) {
					clearInterval(miningCheckInt); // Stop the interval
					if (receipt.status === true) {
						console.log('Transaction has been mined and was successful:', receipt);
						if (where == 1){
							popMiningBox(14,  "0x0x0x0x0x0x");
						}
						else if (where == 2){
							popMiningBox(32,  "0x0x0x0x0x0x");
						}
					}
					else {
						console.log('Transaction has been mined but failed:', receipt);
						popAlert(15);
					}
				}
				else{
					console.log('Transaction has not been mined yet');
				}
			}
			catch (error) {
				console.error('Error fetching transaction receipt:', error);
				if (checkCount > 10){
					clearInterval(miningCheckInt); 
				}
			}
		}
</script>
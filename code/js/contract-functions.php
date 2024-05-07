<script>
		/*
		//var gameContractAddress = '0x749d6fE2aF4FC8153C0Db9cB4c2442b1604B9076';
		var gameContractAddress = '0xbb43CbD8B139483286a8772D9D289bF85CB4c148';
		
		var gameCost = false;
		var gameCostInETH = false;
		var guessFee = false;
		var guessFeeCostInETH = false;
		
	
		async function getGameCreationFee(){
			let web3 = new Web3(Web3.givenProvider);
			//console.log("window['userAccountNumber'] = " + window['userAccountNumber']);
			console.log('0 doesnt stops here');
			var contract = new web3.eth.Contract(abi1, gameContractAddress, {});
			gameCost = await contract.methods.getGameCreationFee().call();
			gameCostInETH = gameCost * .000000000000000001;
			
			console.log('1 doesnt stop here');
			ig.game.oldMsg = ig.game.msgToPlayer;
			ig.game.msgToPlayer = "Choose a secret number.";
			ig.game.secretNumber = prompt("Choose your secret number, 1-100", "");
			console.log('2 doesnt stop here');
			if (ig.game.secretNumber && isNumberInRange(ig.game.secretNumber)) {
				console.log("Secret Number is " + ig.game.secretNumber);
				createGame();
			}
			else {
				ig.game.msgToPlayer = "Your value " + ig.game.secretNumber + " is not a number or is not in the range of 1-100.";
				ig.game.msgToPlayer = ig.game.oldMsg;
			}
		}
		async function getGuessFee(){
			let web3 = new Web3(Web3.givenProvider);
			console.log('1')
			var contract = new web3.eth.Contract(abi1, gameContractAddress, {});
			guessFee = await contract.methods.getGuessFee().call();
			console.log('guessFee = ' + guessFee)
			guessFeeCostInETH = guessFee * .000000000000000001;
			console.log('guessFeeCostInETH = ' + guessFeeCostInETH)
			submitGuess();
		}
		// Function to convert a number to bytes32
		function numberToBytes32(num) {
			const web3 = new Web3(window.ethereum);
			return web3.utils.padLeft(web3.utils.toHex(num), 64); // Pad to 64 characters (32 bytes)
		}
		function shortenTransactionId(txId) {
			if (txId.length > 10) {
				return txId.slice(0, 10) + '...';
			}
			return txId; // Return the original if it's already short enough
		}
		async function createGame(){
			
			let web3 = new Web3(Web3.givenProvider);
			var contract = new web3.eth.Contract(abi1, gameContractAddress, {});
			//confirmMes.className = "hide";
			var accountBalance = await web3.eth.getBalance(window['userAccountNumber']);
			
			ig.game.msgToPlayer = "You must pay " + gameCostInETH + " ETH to begin a new game. Sign this transaction";
			
			if (parseInt( accountBalance ) >= parseInt( gameCost )){
			
				try{
					var secretNumber32 = numberToBytes32(ig.game.secretNumber);

					
					await contract.methods.createGame(secretNumber32).send({
						from: window['userAccountNumber'],
						value: gameCost,
						
						//value: web3.utils.toWei("0.1", "ether"), 
						//value: gameCostInETH,
						//gas: 1500000,
						//maxPriorityFeePerGas:5000000000
			
					}).on('transactionHash', function(hash){
						var shortTxId = shortenTransactionId(hash);
						ig.game.msgToPlayer = "Mining transaction " + shortTxId + " and Creating Game...";
						console.log('transaction hashed...');
						console.log(hash);

					}).on('receipt', function(receipt){
						ig.game.msgToPlayer = "Transaction mined. Game created.";
       					console.log('Transaction mined:', receipt);
						if (receipt.events.GameCreated) {
							ig.game.gameId = receipt.events.GameCreated.returnValues.gameId;
							ig.game.msgToPlayer += " Your GAMEID is " + ig.game.gameId;
							console.log('Game ID:', ig.game.gameId);
        			    	return; 
						}
        			     else {
							console.log('No GuessMade event found.');
						}
					});
				}
				catch(error){
					//Handle Connection Errors
					if (error.code == 4001){
						ig.game.msgToPlayer = ig.game.oldMsg;
						alert('You rejected the transaction.')
					}
				}
			}
			else{
				ig.game.msgToPlayer = ig.game.oldMsg;
				alert('You dont have enough ETH to create a game :/');
			}
		}
		function isNumberInRange(value) {
			const number = Number(value);
			// Check if the converted value is a number and is between 1 and 100, inclusive
			if (!isNaN(number) && number >= 1 && number <= 100) {
				return true;
			}
			else {
				return false;
			}
		}
		function tryGuess(){
			getGuessFee();
		}
		function resolveGuess(){
			if (ig.game.guessWasCorrect){
				ig.game.youWin();
			}
			else{
				ig.game.msgToPlayer = "";
				ig.game.textToPlayer = false;
			}
		}
		async function submitGuess(){
			let web3 = new Web3(Web3.givenProvider);
			var contract = new web3.eth.Contract(abi1, gameContractAddress, {});
			
			
			//confirmMes.className = "hide";
			var accountBalance = await web3.eth.getBalance(window['userAccountNumber']);
			
			if (parseInt( accountBalance ) >= parseInt( guessFee )){
				//ig.system.stopRunLoop.call(ig.system);
				try{
					ig.game.storedGuess = ig.game.valueTotal;
					var guessNumber32 = numberToBytes32(parseInt(ig.game.valueTotal));
					
					await contract.methods.makeGuess(ig.game.gameId, guessNumber32).send({
						from: window['userAccountNumber'],
						value: guessFee,
						
						//value: web3.utils.toWei("0.1", "ether"), 
						//value: gameCostInETH,
						//gas: 1500000,
						//maxPriorityFeePerGas:5000000000
			
					}).on('transactionHash', function(hash){
						var shortTxId = shortenTransactionId(hash);
						console.log('transaction hashed...');
						console.log(hash);
						ig.game.msgToPlayer = "Submitting a guess of " + ig.game.valueTotal + "...";
						ig.game.textToPlayer = true;

					}).on('receipt', function(receipt){
						ig.game.msgToPlayer = "Transaction mined. Game created.";
       					console.log('Transaction mined:', receipt);
						// Check if the GuessMade event is present in the receipt
						if (receipt.events && receipt.events.GuessMade && receipt.events.GuessMade.returnValues) {
							const eventValues = receipt.events.GuessMade.returnValues;
							console.log('Game ID:', eventValues.gameId);
							console.log('Sender:', eventValues.creator); // Adjust field name as per your contract's event definition
							console.log('Player Guess:', eventValues.guess);
							console.log('Is Correct:', eventValues.isCorrect);
							ig.game.guessWasCorrect = eventValues.isCorrect;
							ig.game.msgToPlayer = "Your guess of " + ig.game.storedGuess + " was " + eventValues.isCorrect + ".";
							if (!ig.game.guessWasCorrect){
								ig.game.msgToPlayer += " Feel free to try again."
							}
							//ig.system.startRunLoop.call(ig.system);
							setTimeout(function() { resolveGuess(); }, 5000);
							return; 
						}				
					});
				}
				catch(error){
					//Handle Connection Errors
					if (error.code == 4001){
						ig.game.msgToPlayer = ig.game.oldMsg;
						alert('You rejected the transaction.')
						//ig.system.startRunLoop.call(ig.system);
					}
				}
			}
			else{
				ig.game.msgToPlayer = ig.game.oldMsg;
				alert('You dont have enough ETH to make a guess.');
				//ig.system.startRunLoop.call(ig.system);
			}
		}
		//function makeGuess(uint256 gameId, bytes32 playerGuess)
		
		*/
	</script>
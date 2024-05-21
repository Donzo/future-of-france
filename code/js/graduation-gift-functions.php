	<script>

	var FOFGraduationGiftMinterVRF = "0xe4991C16be94AF92F6B39aA163Dea37aB989D8ed";
	var FOFGraduationGiftNFTContract = "0x0794Cb70241A9D58Fee484529ddE714a9A3D2c6C";
	var FOFGradGiftToken = "0x0C9FC330cEa25d16871D7BD3294D10DC9d23b2a6";
	var FOFGraduationGiftNFTContract = "0x0794Cb70241A9D58Fee484529ddE714a9A3D2c6C";
	var FOFGraduationGiftMintCheckCLF = "0xF17dAc41182523C3D73e133D55F271Ee1dCf6042";
	var graduationGiftDescription = "unknown";
	
	async function mintGradGift() {
		let web3 = new Web3(Web3.givenProvider);
		var tokenContract = new web3.eth.Contract(abi7, FOFGradGiftToken); // Token contract
		var gradGiftContract = new web3.eth.Contract(abi5, FOFGraduationGiftMinterVRF); // Graduation gift contract

		var recipientAddress = FOFGraduationGiftMinterVRF; // Address of the gift contract
		var amountToApprove = '1000000000000000000'; // 1 token

		try {
			// Check current token approval
			const currentAllowance = await tokenContract.methods.allowance(window['userAccountNumber'], recipientAddress).call();
			if (new web3.utils.BN(currentAllowance).lt(new web3.utils.BN(amountToApprove))) {
				ig.game.inspObjTxt = "Getting approval for token transfer...";
				ig.game.promptBoxOpen = false;
				ig.game.objBoxOpen = true;
				console.log('Approving token for minting...');
				popMiningBox(25, "0x0x0x0x");
				const approvalReceipt = await tokenContract.methods.approve(recipientAddress, amountToApprove).send({ from: window['userAccountNumber'] });
				console.log('Approval transaction receipt:', approvalReceipt);
				popMiningBox(26, "0x0x0x0x");
			}
			ig.game.inspObjTxt = "Initiating graduation gift minting...";
			ig.game.promptBoxOpen = false;
			ig.game.objBoxOpen = true;
			// After approval, mint the graduation gift
			console.log('Initiating graduation gift minting...');
			popMiningBox(27, "0x0x0x0x");
			const mintReceipt = await gradGiftContract.methods.getGraduationGift(window['userAccountNumber']).send({
				from: window['userAccountNumber'],
			});
			popMiningBox(28, "0x0x0x0x");
			console.log('Minting transaction receipt:', mintReceipt);
			if (mintReceipt && mintReceipt.transactionHash) {
				listenForRequestFulfilledEvent(FOFGraduationGiftMinterVRF, mintReceipt.transactionHash);
			}
			else {
				console.error('Failed to obtain transaction hash from minting.');
			}

		} catch (error) {
			console.error('Minting process failed:', error);
			// Handle errors, such as transaction rejection
			if (error.code === 4001) {
				// User denied transaction signature
				console.log('User denied the transaction.');
				closeMiningBoxBox();
				popAlert(22);
			}
		}
	}
	async function checkForEitherGradGiftAsset() {
		let web3 = new Web3(Web3.givenProvider);
		var nftContract = new web3.eth.Contract(abi4, FOFGraduationGiftNFTContract);
		var tokenContract = new web3.eth.Contract(abi7, FOFGradGiftToken);

		try {
		    const nftCount = await nftContract.methods.balanceOf(window['userAccountNumber']).call();
		    const tokenBalance = await tokenContract.methods.balanceOf(window['userAccountNumber']).call();

		    if (nftCount > 0) {
		        console.log('User has ' + nftCount + ' Graduation Gift NFT(s).');
		        ig.game.inspObjTxt = "You have a graduation gift NFT. Opening door...";
		        ig.game.promptBoxOpen = false;
		        ig.game.objBoxOpen = true;
		        ig.game.openThisDoor = 11; // Open Door 11
		        ig.game.killThisObject = true; // Kill Terminal Interaction Object
		        ig.game.playSuccessSound1();
		    } 
		    else if (tokenBalance > 0) {
		        console.log('User has Graduation Gift Tokens.');
		        ig.game.inspObjTxt = "You have a graduation gift Token. Opening door...";
		        ig.game.promptBoxOpen = false;
		        ig.game.objBoxOpen = true;
		        ig.game.openThisDoor = 11; // Open Door 11
		        ig.game.killThisObject = true; // Kill Terminal Interaction Object
		        ig.game.playSuccessSound1();
		    }
		    else {
		        console.log('User does not own any Graduation Gift NFTs or Tokens.');
		        ig.game.inspObjTxt = "You do not have any graduation gift assets.";
		        ig.game.playAlertSound();
		        // Additional logic if the user does not have either asset
		    }
		}
		catch (error) {
		    console.error('Failed to check user assets:', error);
		    ig.game.inspObjTxt = "Failed to check for assets.";
		    ig.game.playAlertSound();
		}
	}

	async function listenForRequestFulfilledEvent(contractAddress, transactionHash) {
		let web3 = new Web3(Web3.givenProvider);
		var contract = new web3.eth.Contract(abi5, contractAddress); // Ensure abi5 is the ABI of the FOFGraduationGiftMinterVRF contract

		console.log('Listening for RequestFulfilled event...');

		// First, ensure the transaction is confirmed
		const receipt = await web3.eth.getTransactionReceipt(transactionHash);
		if (!receipt.status) {
			console.error('Transaction with hash', transactionHash, 'failed');
			return;
		}

		// Start listening for the event
		contract.events.RequestFulfilled({
			fromBlock: receipt.blockNumber -2
		})
		.on('data', function(event) {
			console.log('Received RequestFulfilled event:', event);
			console.log('Request ID:', event.returnValues.requestId);
			console.log('User Address:', event.returnValues.userAddress);
			console.log('Random Number 1:', event.returnValues.randomNum1);
			console.log('Random Number 2:', event.returnValues.randomNum2);
			console.log('Random Number 3:', event.returnValues.randomNum3);
			graduationGiftDescription = describeGift(event.returnValues.randomNum1, event.returnValues.randomNum2, event.returnValues.randomNum3);
			console.log(graduationGiftDescription);
			popMiningBox(29, "0x0x0x0x");
		   // popMiningBox(28, event.returnValues); // Custom function to handle the event data
			// You may want to do additional processing here
			setTimeout("delayCloseMiningBoxBox(1)", 20000); //Close mining box after 5 seconds.
		})
		.on('error', console.error);
	}
	async function checkForGradGiftNFT(){
		let web3 = new Web3(Web3.givenProvider);
		var contract = new web3.eth.Contract(abi4, FOFGraduationGiftNFTContract);

		try {
			const nftCount = await contract.methods.balanceOf(window['userAccountNumber']).call();
			if (nftCount > 0) {
				console.log('User has ' + nftCount + ' Graduation Gift NFT(s).');
				// Handle logic here if the user owns one or more NFTs
				ig.game.inspObjTxt = "You have a graduation gift NFT. Opening door...";
				ig.game.promptBoxOpen = false;
				ig.game.objBoxOpen = true;
				ig.game.openThisDoor = 13; //Open Door 13
				ig.game.killThisObject = true; //Kill Terminal Interaction Object
				ig.game.playSuccessSound1();
			}
			else {
				console.log('User does not own any Graduation Gift NFTs.');
				// Handle logic here if the user does not own any NFTs
			}
		}
		catch (error) {
			console.error('Failed to fetch NFT balance:', error);
		}	
	}
	async function mintGraduationGiftTkn() {
		let web3 = new Web3(Web3.givenProvider);
		var contract = new web3.eth.Contract(abi6, FOFGraduationGiftMintCheckCLF);
		var mintCostWei = web3.utils.toWei('0.005', 'ether');
		var accountBalance = await web3.eth.getBalance(window['userAccountNumber']);

		if (accountBalance >= mintCostWei) {
			try {
				const tokenContract = new web3.eth.Contract(abi7, FOFGradGiftToken);
				//Get the token balance of the account
				const balance = await tokenContract.methods.balanceOf(window['userAccountNumber']).call();
				
				if (balance && balance > 0){
					popAlert(21);
					return
				}
				
				await contract.methods.checkGraduationGiftMint([window['userAccountNumber']]).send({
					from: window['userAccountNumber'],
					value: mintCostWei
				}).on('transactionHash', function(hash){
					console.log('Transaction Hash:', hash);
					popMiningBox(23, hash);
				}).on('receipt', function(receipt){
					popMiningBox(24, receipt);
					return;		
				});
			}
			catch(error) {
				console.error('Transaction failed:', error);
				if (error.code === 4001) {
					popAlert(19);
				}
			}
		}
		else {
			console.log('Insufficient balance to perform the mint.');
			popAlert(20);
		}
	}
	function describeGift(adjectiveRandNum, materialRandNum, objectRandNum) {
		let adjective, material, object;

		// Adjective Descriptors
		if (adjectiveRandNum > 950) {
			adjective = "A radiant ";
		}
		else if (adjectiveRandNum > 850) {
			adjective = "An ornate ";
		}
		else if (adjectiveRandNum > 650) {
			adjective = "A shimmering ";
		}
		else if (adjectiveRandNum > 350) {
			adjective = "A durable ";
		}
		else {
			adjective = "A corrosion resistant ";
		}

		// Material Descriptors
		if (materialRandNum > 950) {
			material = "platinum ";
		}
		else if (materialRandNum > 850) {
			material = "gold ";
		}
		else if (materialRandNum > 650) {
			material = "silver ";
		}
		else if (materialRandNum > 350) {
			material = "bronze ";
		}
		else if (materialRandNum > 150) {
			material = "brass ";
		}
		else {
			material = "copper ";
		}

		// Object Descriptors
		if (objectRandNum > 750) {
			object = "class ring.";
		}
		else if (objectRandNum > 500) {
			object = "medal.";
		}
		else {
			object = "lapel pin.";
		}

		const description = adjective + material + object;
		return description;
	}

</script>
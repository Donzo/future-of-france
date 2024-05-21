<script>

	var blueKeyTokenContractAddress = "0xa7807EC6Ab2E1cB00F9f24E705c9805C6582aC37";
	var blueKeyVendorContractAddress = "0x76c1dceDC10b4c58FDA890278890e3FD9E4A6B80";
	var blueKeyTokenHolderContractAddress = "0x4060ff3E9A8A5FB7e6E3F84c50767cbee8DD47b5";
	
	
	async function buyBlueKeyToken(){
		//Create Web3 Object
		let web3 = new Web3(Web3.givenProvider);
		var contract = new web3.eth.Contract(abi2, blueKeyVendorContractAddress, {});
		
		var accountBalance = await web3.eth.getBalance(window['userAccountNumber']);
			var mintCostWei = web3.utils.toWei('0.005', 'ether'); //Converts 0.005 ETH to wei
		if (accountBalance >= mintCostWei){
			
			try{
				await contract.methods.buyTokens().send({
					from: window['userAccountNumber'],
					value: mintCostWei,		
				}).on('transactionHash', function(hash){
					console.log('purchase hashed...');
					console.log(hash);
					popMiningBox(15, hash);
				}).on('receipt', function(receipt){
					console.log('purchase complete...');
					popMiningBox(16, receipt);
					return;		
				});
			}
			catch(error){
				//Handle Connection Errors
				if (error.code == 4001){
					popAlert(16);
				}
			}
		}
		else{
			popAlert(17);
		}
	}
	async function requestBlueKeyApproval() {
		let web3 = new Web3(Web3.givenProvider);
		var tokenContract = new web3.eth.Contract(abi1, blueKeyTokenContractAddress, {});

		var spenderAddress = blueKeyTokenHolderContractAddress; 
		var amountToApprove = '1000000000000000000'; // Spend 1 Blue Key Token

		ig.game.inspObjTxt = "Checking current approval status...";
		ig.game.promptBoxOpen = false;
		ig.game.objBoxOpen = true;

		try {
			const currentAllowance = await tokenContract.methods.allowance(window['userAccountNumber'], spenderAddress).call();
			if (new web3.utils.BN(currentAllowance).gte(new web3.utils.BN(amountToApprove))) {
				console.log('Already approved');
				ig.game.inspObjTxt = "Blue Key token spend already approved. Door opening...";
				ig.game.openThisDoor = 8; // Open Door 8
				ig.game.killThisObject = true; // Kill Terminal Interaction Object
				ig.game.playSuccessSound1();
			}
			else {
				console.log('Approving now...');
				popMiningBox(17, "0x0x0x0x");
				ig.game.inspObjTxt = "Approving now...";
				ig.game.promptBoxOpen = false;
				ig.game.objBoxOpen = true;
				
				const receipt = await tokenContract.methods.approve(spenderAddress, amountToApprove).send({
					from: window['userAccountNumber']
				});
				popMiningBox(18, "0x0x0x0x");
			}
		}
		catch (error) {
			console.error('Error in token approval process:', error);
			ig.game.inspObjTxt = "Blue Key token spend approval failed...";
			ig.game.playAlertSound();
			closeMiningBoxBox()
		}
	}
	
	async function blueKeyCheckHere() {
		//Create Web3 Object
		let web3 = new Web3(Web3.givenProvider);

		try {
				//Set up the contract using ABI and address
				const tokenContract = new web3.eth.Contract(abi1, blueKeyTokenContractAddress);

				//Get the token balance of the account
				const balance = await tokenContract.methods.balanceOf(window['userAccountNumber']).call();
				const tokenBalance = web3.utils.fromWei(balance, 'ether');

				console.log(`Token balance: ${tokenBalance} BLUEKEY`);

				//Compare the token balance with the required amount (1 token)
				if (tokenBalance >= 1) {
						console.log(`Balance is sufficient: ${tokenBalance} BLUEKEY`);
						ig.game.inspObjTxt = "You have " + Math.floor(tokenBalance) + " BLUEKEY. Opening door...";
						ig.game.promptBoxOpen = false;
						ig.game.objBoxOpen = true;
						ig.game.openThisDoor = 7; //Open Door 7
						ig.game.killThisObject = true; //Kill Terminal Interaction Object
						ig.game.playSuccessSound2();
				}
				else {
						console.log(`Balance is insufficient: ${tokenBalance} BLUEKEY`);
						ig.game.inspObjTxt = "You do not have the required amount of BLUEKEY token. Try to use the token dispenser in the room to the east.";
						ig.game.promptBoxOpen = false;
						ig.game.objBoxOpen = true;
						ig.game.playAlertSound();
				}
				ig.game.turnOffMessageWithoutMe = true;
		}
		catch (error) {
				console.error('Error checking token balance:', error);
		}
	}
	
	async function transferBlueKeyToken() {
		let web3 = new Web3(Web3.givenProvider);
		var tokenContract = new web3.eth.Contract(abi1, blueKeyTokenContractAddress, {});
		var tokenHolderContract = new web3.eth.Contract(abi3, blueKeyTokenHolderContractAddress, {});
		var recipientAddress = blueKeyTokenHolderContractAddress; 
		var amountToDeposit = '1000000000000000000'; // Transfer 1 Blue Key Token

		ig.game.inspObjTxt = "Checking approval status for token transfer...";
		ig.game.promptBoxOpen = false;
		ig.game.objBoxOpen = true;

		try {
			// Check existing balance in the token holder contract
			const existingBalance = await tokenHolderContract.methods.fofTokenBalance(window['userAccountNumber']).call();
			if (new web3.utils.BN(existingBalance).gte(new web3.utils.BN(amountToDeposit))) {
			    console.log('Blue Key deposit already made. Opening door...');
			    ig.game.inspObjTxt = "Blue Key deposit already made. Opening door...";
			    ig.game.openThisDoor = 9; // Open Door 9
				ig.game.killThisObject = true; // Kill Terminal Interaction Object
				ig.game.promptBoxOpen = false;
				ig.game.objBoxOpen = true;
			    return; // Exit the function
			}

		    const currentAllowance = await tokenContract.methods.allowance(window['userAccountNumber'], recipientAddress).call();
		    if (new web3.utils.BN(currentAllowance).gte(new web3.utils.BN(amountToDeposit))) {
				console.log('Sufficient allowance. Transferring now...');
				ig.game.inspObjTxt = "Sufficient allowance. Transferring now...";
				popMiningBox(19, "0x0x0x0x");
				
				const receipt = await tokenHolderContract.methods.fofDepositTokens(amountToDeposit).send({
				    from: window['userAccountNumber']
				});
				console.log('Token transfer successful!', receipt);
				popMiningBox(20, "0x0x0x0x");
		    }
		    else {
				console.log('Insufficient allowance for transfer.');
				ig.game.inspObjTxt = "Token transfer not authorized. Please approve the token usage.";
				ig.game.playAlertSound();
				closeMiningBoxBox();
		    }
		}
		catch (error) {
		    console.error('Error in token transfer process:', error);
		    ig.game.inspObjTxt = "Token transfer failed...";
		    ig.game.playAlertSound();
		    closeMiningBoxBox();
		}
	}
	
	async function withdrawMyBlueKeyToken() {
		let web3 = new Web3(Web3.givenProvider);
		var tokenHolderContract = new web3.eth.Contract(abi3, blueKeyTokenHolderContractAddress);

		var amountToWithdraw = '1000000000000000000'; // Withdraw 1 Blue Key Token

		ig.game.inspObjTxt = "Attempting to withdraw Blue Key token...";
		ig.game.promptBoxOpen = false;
		ig.game.objBoxOpen = true;

		try {
			// Check existing balance in the token holder contract
			const existingWithdraw = await tokenHolderContract.methods.fofTokensWithdrawn(window['userAccountNumber']).call();
			if (new web3.utils.BN(existingWithdraw).gte(new web3.utils.BN(amountToWithdraw))) {
			    ig.game.inspObjTxt = "Blue Key withdraw already made. Opening door..";
			    ig.game.openThisDoor = 10; // Open Door 9
				ig.game.killThisObject = true; // Kill Terminal Interaction Object
				ig.game.promptBoxOpen = false;
				ig.game.objBoxOpen = true;
			    return; // Exit the function
			}
			
			popMiningBox(21,  "0x0x0x0x");
		    const receipt = await tokenHolderContract.methods.fofWithdrawTokens(amountToWithdraw).send({
				from: window['userAccountNumber']
		    });

		    if (receipt.status) {
				console.log('Token withdrawal successful!', receipt);
				popMiningBox(22, receipt.transactionHash);
		    }
		    else {
				throw new Error("Blockchain transaction failed.");
		    }
		}
		catch (error) {
		    console.error('Error in token withdrawal process:', error);
		    ig.game.inspObjTxt = "Token withdrawal failed...";
		    ig.game.playAlertSound();
		    closeMiningBoxBox();
		}
}
	
</script>
<script>
		var miningBoxActive = false;
		
		function pauseGame(){
			ig.game.pause = true;
			console.log('game paused')
		}
		function unpauseGame(){
			ig.game.pause = true;
			console.log('game unpaused')
			ig.game.resetTxtVars();
		}
		function popAlert(which, positive){
			setAlertMsg(which);
			showAlertBox();
			if (positive == true){
				ig.game.playSuccessSound1();
			}
			else{
				ig.game.playAlertSound();	
			}
			pauseGame();
		}
		function popConfirm(which){
			setConfirmMsg(which);
			showConfirmBox();
			
			pauseGame();
		}
		function popMiningBox(which, data){
			setMiningBoxMsg(which, data);
			showMiningBoxBox();
			
			pauseGame();
		}
		function popInputBox(which){
			setInputBoxMsg(which);
			showInputBox();
			
			pauseGame();
		}
	
		//These Control Visibility of System Message Boxes
		function showAlertBox(){
			document.getElementById("sysMsgBoxBG").style.display = "block";
			document.getElementById("alertBox").style.display = "block";
		}
		function closeAlert(which){
			document.getElementById("sysMsgBoxBG").style.display = "none";
			document.getElementById("alertBox").style.display = "none";
			ig.game.playClickSound1();
			ig.game.resetTxtVars();
			unpauseGame();
			if (which == 1){
				ig.game.openDoor(12);
			}
			else if (which == 2){
				ig.game.openDoor(11);
			}
		}
		function showConfirmBox(){
			document.getElementById("sysMsgBoxBG").style.display = "block";
			document.getElementById("confirmBox").style.display = "block";
		}
		function closeConfirm(which){
			document.getElementById("sysMsgBoxBG").style.display = "none";
			document.getElementById("confirmBox").style.display = "none";
			if (which == 1){
				connectMyWallet(); //Trying to load game but not connected
				//popAlert(1);
			}
			else if (which == 2){
				//Switch Network to Sepolia
				switchNetwork(9);
			}
			else if (which == 3){
				//Decline Network Change
				popAlert(4)
			}
			else if (which == 4){
				//Add Sepolia
				switchNetwork(9);
			}
			ig.game.playClickSound1();
			unpauseGame();
		}
		function showInputBox(){
			document.getElementById("sysMsgBoxBG").style.display = "block";
			document.getElementById("inputBox").style.display = "block";
		}
		function closeInputBox(which){
			if (which == 1){
				var ethValue = document.getElementById('eth-input').value;	
				depositETHintoAAVE(ethValue);
			}
			else if (which == 2){
				var enteredAddress = document.getElementById('address-input').value;	
				ig.game.playersEnteredAddress = enteredAddress.toLowerCase();
				console.log(`window['userAccountNumber'] = ${window['userAccountNumber']} and ig.game.playersEnteredAddress = ${ig.game.playersEnteredAddress}`)
				if (ig.game.playersEnteredAddress == window['userAccountNumber'].toLowerCase()){
					popAlert(11, true);
				}
				else{
					popAlert(12, false);
				}
			}
			else if (which == 3){
				var enteredAddress = document.getElementById('address-input').value;	
				ig.game.playersEnteredAddress2 = enteredAddress.toLowerCase();
				console.log(`window['userAccountNumber'] = ${window['userAccountNumber']} and ig.game.playersEnteredAddress2 = ${ig.game.playersEnteredAddress}`)
				if (ig.game.playersEnteredAddress2 == window['userAccountNumber'].toLowerCase()){
					popAlert(18, true);
				}
				else{
					popAlert(12, false);
				}
			}
			ig.game.playClickSound2();
			document.getElementById("sysMsgBoxBG").style.display = "none";
			document.getElementById("inputBox").style.display = "none";
		}
		function showMiningBoxBox(){
			document.getElementById("sysMsgBoxBG").style.display = "block";
			document.getElementById("miningInfoBox").style.display = "block";
		}
		function delayCloseMiningBoxBox(which){
			if (which == 1 && miningBoxActive == 28){
				document.getElementById("sysMsgBoxBG").style.display = "none";
				document.getElementById("miningInfoBox").style.display = "none";
				unpauseGame();
				miningBoxActive = false;
			}
		}
		function closeMiningBoxBox(which){
			document.getElementById("sysMsgBoxBG").style.display = "none";
			document.getElementById("miningInfoBox").style.display = "none";
			unpauseGame();
			if (which == 18){
				ig.game.openThisDoor = 8; // Open Door 8
				ig.game.killThisObject = true; // Kill Terminal Interaction Object
				ig.game.inspObjTxt = "Door opening...";
				ig.game.promptBoxOpen = false;
				ig.game.objBoxOpen = true;
			}
			if (which == 20){
				ig.game.openThisDoor = 9; // Open Door 9
				ig.game.killThisObject = true; // Kill Terminal Interaction Object
				ig.game.inspObjTxt = "Door opening...";
				ig.game.promptBoxOpen = false;
				ig.game.objBoxOpen = true;
			}
			if (which == 22){
				ig.game.inspObjTxt = "Door opening...";
		        ig.game.openThisDoor = 10; // Open Door 10
		        ig.game.killThisObject = true;
		        ig.game.promptBoxOpen = false;
				ig.game.objBoxOpen = true;
			}
			if (which == 24){
				ig.game.inspObjTxt = "Door opening...";
		        ig.game.openThisDoor = 11; // Open Door 11
		        ig.game.killThisObject = true;
		        ig.game.promptBoxOpen = false;
				ig.game.objBoxOpen = true;
			}
			if (which == 29){
				ig.game.inspObjTxt = "Door opening...";
		        ig.game.openThisDoor = 13; // Open Door 13
		        ig.game.killThisObject = true;
		        ig.game.promptBoxOpen = false;
				ig.game.objBoxOpen = true;
				miningBoxActive = false;
			}
			
		}
		//setTimeout("closeMiningBoxBox()", 3000); //Close mining box after 3 seconds.
	
		function hideLoadingWheel(){
			document.getElementById("miningInfoLoadingWheel").style.display = "none";;
		}
		function showLoadingWheel(){
			document.getElementById("miningInfoLoadingWheel").style.display = "block";;
		}
	
	
		//These Control Messages and Button Actions
		function setAlertMsg(num){
			var title = document.getElementById("alertBoxTitle");
			var body = document.getElementById("alertBoxBody");
			var button = document.getElementById("sysAlertButtonDiv");
		
			// Default is to close alert but we can set it to other things too.		
			button.innerHTML = `<button class='button sysMsgButton' onclick="closeAlert()">OK</button>`;
			
			//Error Loading Game
			if (num == 1){
				title.innerHTML = "Error Loading Game Data";
				body.innerHTML = "No game data was found. Are you sure you've made progress in this game from account " + window['userAccountNumber'] + "?";
			}
			//You rejected the request to connect.
			else if (num == 2){
				title.innerHTML = "Error Fetching Data";
				body.innerHTML = "There was an error fetching the save data for user " + window['userAccountNumber'] + ". Maybe try again?";
			}
			//Request Already Pending
			else if (num == 3){
				title.innerHTML = "Connection Waiting";
				body.innerHTML = "You already have a pending connection request. Check your wallet.";
			}
			//Network Change Declined
			else if (num == 4){
				title.innerHTML = "Network Change Declined";
				body.innerHTML = "That's fine, but you need to be on Sepolia to use this Dapp.";
			}
			else if (num == 5){
				title.innerHTML = "Network Connection Failed";
				body.innerHTML = `You rejected the request to change the network. You must switch to the ${preferredNetwork1} to use this Dapp.`;
			}
			//Request Already Pending
			else if (num == 6){
				title.innerHTML = "Request Waiting";
				body.innerHTML = "You already have a pending network change request. Check your wallet.";
			}
			//Dont post collateral
			else if (num == 7){
				title.innerHTML = "Denied Posting Collateral";
				body.innerHTML = "Ok well you cannot join this game until you have sufficient collateral to cover the transaction value.";
			}
			//Dont Delegate
			else if (num == 8){
				title.innerHTML = "Denied Delegating Credit";
				body.innerHTML = "Ok well you cannot join this game until you have delegated sufficient borrowing power to the game contract.";
			}
			//Dont join
			else if (num == 9){
				title.innerHTML = "Denied Joining Game";
				body.innerHTML = "Ok well you can join the game whenever you want. Just press the 'Join Game' button.";
			}
			//Error Fetching Game Data
			else if (num == 10){
				title.innerHTML = "Connection Failed";
				body.innerHTML = "You rejected the request to connect.";
			}
			//Successfully Entered Address
			else if (num == 11){
				title.innerHTML = "Good News!";
				body.innerHTML = "You correctly entered your wallet address. You are now ready to get your test Ether";
			}
			//Unsuccessfully Entered Address
			else if (num == 12){
				title.innerHTML = "Whoops!";
				body.innerHTML = "Your wallet address is not " + ig.game.playersEnteredAddress + " 🙁 Look around for clues or ask the scientist for help!";
			}
			//Didnt Enter Address
			else if (num == 13){
				title.innerHTML = "Whoops!";
				body.innerHTML = "You haven't entered your wallet address. First enter your address into the terminal on the north wall then try again.";
			}
			//Eth Receive Failed
			else if (num == 14){
				title.innerHTML = "Something Went Wrong!";
				body.innerHTML = "If you haven't already received test ETH on this account, try again!";
			}
			else if (num == 15){
				title.innerHTML = "Transaction Failed for Some Reason.";
				body.innerHTML = "Oh no! What do now?";
			}
			else if (num == 16){
				title.innerHTML = "You Rejected the Transaction";
				body.innerHTML = "Blue Key token will not be purchased for .005 ETH.";
			}
			else if (num == 17){
				title.innerHTML = "Insufficient ETH";
				body.innerHTML = "You do not have enough ETH to purchase Blue Key token. Oh no! Is this game over?";
			}
			//Successfully Entered Address
			else if (num == 18){
				title.innerHTML = "You Did It. WTG!";
				body.innerHTML = "You correctly entered your wallet address. Door opening...";
				button.innerHTML = `<button class='button sysMsgButton' onclick="closeAlert(1)">OK</button>`;
			}
			else if (num == 19){
				title.innerHTML = "You Rejected the Transaction";
				body.innerHTML = "Graduation Gift token will not be purchased for .005 ETH.";
			}
			else if (num == 20){
				title.innerHTML = "Insufficient ETH";
				body.innerHTML = "You do not have enough ETH to mint the Graduation Gift token. Oh no! Is this game over?";
			}
			else if (num == 21){
				title.innerHTML = "You've Already Minted Your Graduation Gift Token";
				body.innerHTML = "Door Opening...";
				button.innerHTML = `<button class='button sysMsgButton' onclick="closeAlert(2)">OK</button>`;
			}
			else if (num == 22){
				title.innerHTML = "You Denied the Request";
				body.innerHTML = "Try again?";
			}
		}
		function setConfirmMsg(num){
			var title = document.getElementById("confirmBoxTitle");
			var body = document.getElementById("confirmBoxBody");
			var button = document.getElementById("sysConfirmButtonDiv");
		
			// Default is to close alert but we can set it to other things too.		
			button.innerHTML = `<button class='button sysMsgButton' onclick="closeConfirm(1)">Yes</button><button class='button sysMsgButton' onclick="closeConfirm(111)">No</button>`;

			if (num == 1){
				title.innerHTML = "You Are Not Connected To This Site";
				body.innerHTML = "Would you like to try to connect now?";
			}
			else if (num == 2){
				title.innerHTML = "Change Network?";
				body.innerHTML = `You must be on the ${preferredNetwork1} to your to play this game. Would you like to switch to Sepolia now?`;
				button.innerHTML = `<button class='button sysMsgButton' onclick="closeConfirm(2)">Yes</button><button class='button sysMsgButton' onclick="closeConfirm(3)">No</button>`;
			}
			else if (num == 3){
				title.innerHTML = "Add Network?";
				body.innerHTML = `You must add the ${preferredNetwork1} to your wallet to play this game. Would you like to do that now?`;
				button.innerHTML = `<button class='button sysMsgButton' onclick="closeConfirm(4)">Yes</button><button class='button sysMsgButton' onclick="closeConfirm(3)">No</button>`;
			}
			else if (num == 4){
				title.innerHTML = "Add Collateral?";
				body.innerHTML = `<strong>You do not have sufficient collateral</strong> in the Aave protocol to cover the transaction costs in the event that you lose the game. Would you like to <strong>deposit some ETH</strong>?`;
				button.innerHTML = `<button class='button sysMsgButton' onclick="closeConfirm(5)">Yes</button><button class='button sysMsgButton' onclick="closeConfirm(6)">No</button>`;
			}
			else if (num == 5){
				title.innerHTML = "Delegate Credit?";
				body.innerHTML = `You must <strong>delegate credit to the game contract</strong> to cover the transaction value in the event that you lose the game. Would you like to <strong>delegate credit now</strong>?`;
				button.innerHTML = `<button class='button sysMsgButton' onclick="closeConfirm(7)">Yes</button><button class='button sysMsgButton' onclick="closeConfirm(8)">No</button>`;
			}
			else if (num == 6){
				title.innerHTML = "Join Game?";
				body.innerHTML = `You are now <strong>ready to join the game</strong>. Would you like to <strong>sign the transaction</strong> to join the game?`;
				button.innerHTML = `<button class='button sysMsgButton' onclick="closeConfirm(9)">Yes</button><button class='button sysMsgButton' onclick="closeConfirm(10)">No</button>`;
		
			}
		}
	
		function setInputBoxMsg(which){
			var title = document.getElementById("inputBoxTitle");
			var body = document.getElementById("inputBoxBody");
			var button = document.getElementById("inputBoxButtons");
		
			if (which == 1){
				title.innerHTML = "Deposit ETH";
				body.innerHTML = `<strong>How much ETH</strong> would you like to <strong>deposit</strong> into the <strong>AAVE</strong> lending pool?`;
				button.innerHTML = `
					<div id="eth-input-field">
						<input id="eth-input" class="input-field" type="number" min="0.01" step="0.01" max="99999999" value="0.10" />
					</div>
					<div id="eth-submit-button">
						<button class='button sysMsgButton' onclick="closeInputBox(1)">OK</button>
					</div>`;
			}
			else if (which == 2){
				title.innerHTML = "Enter Your Wallet Address";
				body.innerHTML = `Enter your <strong>wallet address</strong> into the input field.`;
				button.innerHTML = `
					<div id="address-input-field">
						<input id="address-input" class="input-field-wide" type="text" maxlength="50" value="" />
					</div>
					<div id="address-submit-button">
						<button class='button sysMsgButton' onclick="closeInputBox(2)">OK</button>
					</div>`;
			}
			else if (which == 3){
				title.innerHTML = "Enter Your Wallet Address";
				body.innerHTML = `Enter your <strong>wallet address</strong> into the input field.`;
				button.innerHTML = `
					<div id="address-input-field">
						<input id="address-input" class="input-field-wide" type="text" maxlength="50" value="" />
					</div>
					<div id="address-submit-button">
						<button class='button sysMsgButton' onclick="closeInputBox(3)">OK</button>
					</div>`;
			}
		}
		function setMiningBoxMsg(num, data){
			var title = document.getElementById("miningInfoBoxTitle");
			var body = document.getElementById("miningInfomBoxBody");
			var loadingWheel = document.getElementById("miningInfoLoadingWheelDiv");
			var loader = `<img src="/images/loading.gif"/>`
			var loaded = `<img src="/images/check-mark.gif"/>`
			if (num == 1){
				title.innerHTML = "Initializing Game Settings";
				var slicedObj = data.slice(0, 10);
				slicedObj += "...";
				var link = "https://sepolia.etherscan.io/tx/" + data;
				body.innerHTML = `You are now setting up the game. The game contract will hold the <strong>number of players</strong>, the <strong>value</strong> of the game, and the destination <strong>address of the payment</strong>. <br/><br/>Transaction <a href='${link}' target='_blank'>${slicedObj}</a> is mining.`;
				loadingWheel.innerHTML = loader;
			}
			else if (num == 2){
				var slicedObj = data.blockHash.slice(0, 10);
				slicedObj += "...";
				var link = "https://sepolia.etherscan.io/tx/" + data.blockHash;
				title.innerHTML = "Game Settings Initialized";
				body.innerHTML = `This game has now been created.<br/><br/>Transaction <a href='${link}' target='_blank'>${slicedObj}</a> SUCCESSFULLY MINED!`;
				loadingWheel.innerHTML = loaded;
			}
			else if (num == 3){
				title.innerHTML = "Approving Credit Delegation";
				var slicedObj = data.slice(0, 10);
				slicedObj += "...";
				var link = "https://sepolia.etherscan.io/tx/" + data;
				body.innerHTML = `Game <strong>contract must be able to borrow $${transactionValue}</strong> against your collateral in the event you lose the game. You are approving this action.<br/><br/>Transaction <a href='${link}' target='_blank'>${slicedObj}</a> is mining.`;
				loadingWheel.innerHTML = loader;
			}
			else if (num == 4){
				var slicedObj = data.blockHash.slice(0, 10);
				slicedObj += "...";
				var link = "https://sepolia.etherscan.io/tx/" + data.blockHash;
				title.innerHTML = "Credit Delegation Successful!";
				body.innerHTML = `Transaction <a href='${link}' target='_blank'>${slicedObj}</a> successfully mined!<br/><br/>You have <strong>delegated your borrowing power</strong> to the game contract. You are ready to play the game.`;
				loadingWheel.innerHTML = loaded;
			}
			else if (num == 5){
				title.innerHTML = "Joining Game";
				var slicedObj = data.slice(0, 10);
				slicedObj += "...";
				var link = "https://sepolia.etherscan.io/tx/" + data;
				body.innerHTML = `You are now <strong>joining the game</strong>. Once all the players have joined, we can determine the results.<br/><br/>Transaction <a href='${link}' target='_blank'>${slicedObj}</a> is mining.`;
				loadingWheel.innerHTML = loader;
			}
			else if (num == 6){
				var slicedObj = data.blockHash.slice(0, 10);
				slicedObj += "...";
				var link = "https://sepolia.etherscan.io/tx/" + data.blockHash;
				title.innerHTML = "Game Joined!";
				body.innerHTML = `You have now joined the game.<br/><br/>Transaction <a href='${link}' target='_blank'>${slicedObj}</a> successfully mined!`;
				loadingWheel.innerHTML = loaded;
			
				//Player is locked make the checkbox and button disappear:
				document.getElementById('agreeToPlayCB').disabled = true;
				makeDisappear("lock-player-button", 1);
			}
			else if (num == 7){
				title.innerHTML = "Depositing Collateral to AAVE";
				var slicedObj = data.slice(0, 10);
				slicedObj += "...";
				var link = "https://sepolia.etherscan.io/tx/" + data;
				body.innerHTML = `You are now <strong>depositing collateral</strong> to AAVE. You are required to have sufficient collateral to cover the transaction amount in the event that you lose the game.<br/><br/>Transaction <a href='${link}' target='_blank'>${slicedObj}</a> is mining.`;
				loadingWheel.innerHTML = loader;
			}
			else if (num == 8){
				var slicedObj = data.blockHash.slice(0, 10);
				slicedObj += "...";
				var link = "https://sepolia.etherscan.io/tx/" + data.blockHash;
				title.innerHTML = "Collateral Deposited!";
				body.innerHTML = `You have <strong>deposited collateral</strong> to AAVE. You may now <strong>try to join the game again</strong>.<br/><br/>Transaction <a href='${link}' target='_blank'>${slicedObj}</a> successfully mined!`;
				loadingWheel.innerHTML = loaded;
			}
			else if (num == 9){
				title.innerHTML = "Starting Game...";
				var slicedObj = data.slice(0, 10);
				slicedObj += "...";
				var link = "https://sepolia.etherscan.io/tx/" + data;
				body.innerHTML = `You are now <strong>starting the game</strong>. Once this transaction has mined, we will request a verifiably random number from a Chainlink DON.<br/><br/>Transaction <a href='${link}' target='_blank'>${slicedObj}</a> is mining.`;
				loadingWheel.innerHTML = loader;
			}
			else if (num == 10){
				var slicedObj = data.slice(0, 10);
				slicedObj += "...";
				title.innerHTML = "Game Started!";
				body.innerHTML = `We have <strong>requested a random number</strong> from a Chainlink oracle network. It will take <strong>3 confirmations</strong> to return the results. Please be patient.<br/><br/><strong>Oracle Request ID ${slicedObj} sent!</strong> Click <a href='https://vrf.chain.link/sepolia/8512' target='_blank'>here</a> to check the status of the request.`;
				//loadingWheel.innerHTML = loader;
			}
			else if (num == 11){
				title.innerHTML = "Waiting for Oracle Return...";
				var slicedObj = data.slice(0, 10);
				slicedObj += "...";
				body.innerHTML = `You are now <strong>starting the game</strong>. Once this transaction has mined, we will request a verifiably random number from a Chainlink DON.<br/><br/><strong>Oracle Request ${slicedObj} has been sent</strong>. Click <a href='https://vrf.chain.link/sepolia/8512' target='_blank'>here</a> to check the status of the request.`;
				loadingWheel.innerHTML = loader;
			}
			else if (num == 12){
				title.innerHTML = "Ether Requested...";
				body.innerHTML = `You have entered your address correctly into the terminal. This machine is now processing your request...`;
				loadingWheel.innerHTML = loader;
			}
			else if (num == 13){
				title.innerHTML = "Ether Sending...";
				var slicedObj = data.slice(0, 10);
				slicedObj += "...";
				body.innerHTML = `Your ETHER request has been approved and the ETHER has been sent. The transaction is mining. View the transaction here: <a href='https://sepolia.arbiscan.io/tx/${data}' target='_blank'>${slicedObj}</a>. `;
				loadingWheel.innerHTML = loader;
			}
			else if (num == 14){
				title.innerHTML = "Transaction Mined!";
				body.innerHTML = `Your test Ether should now be in your wallet on the Arbitrum Sepolia network!`;
				loadingWheel.innerHTML = loaded;
				setTimeout("closeMiningBoxBox()", 3000); //Close mining box after 3 seconds.
			}
			else if (num == 15){
				title.innerHTML = "Buying Blue Key...";
				var slicedObj = data.slice(0, 10);
				slicedObj += "...";
				body.innerHTML = `Your request to purchase Blue Key token has been sent. The transaction is mining. View the transaction here: <a href='https://sepolia.arbiscan.io/tx/${data}' target='_blank'>${slicedObj}</a>. `;
				loadingWheel.innerHTML = loader;
			}
			else if (num == 16){
				title.innerHTML = "Blue Key Purchased!";
				body.innerHTML = `Your <strong>Blue Key token</strong> should now be in your wallet!`;
				loadingWheel.innerHTML = loaded;
				ig.game.playSuccessSound2();
				setTimeout("closeMiningBoxBox()", 3000); //Close mining box after 3 seconds.
			}
			else if (num == 17){
				title.innerHTML = "Approving Blue Key Spend...";
				body.innerHTML = `You are giving a contract approval to spend your Blue Key token on your behalf. This is necessary to send your token to the contract.`;
				loadingWheel.innerHTML = loader;
			}
			else if (num == 18){
				title.innerHTML = "Blue Key Spend Approved!";
				body.innerHTML = `Approval successful! The contract can now spend your <strong>Blue Key token</strong>.`;
				loadingWheel.innerHTML = loaded;
				ig.game.playSuccessSound2();
				setTimeout("closeMiningBoxBox(18)", 3000); //Close mining box after 3 seconds.
			}
			else if (num == 19){
				title.innerHTML = "Transferring Blue Key Token...";
				body.innerHTML = `You are sending your Blue Key token to the holder contract. You have already granted the allowance. Now you are sending the token to the contract...`;
				loadingWheel.innerHTML = loader;
			}
			else if (num == 20){
				title.innerHTML = "Blue Key Token Transferred!";
				body.innerHTML = `Your Blue Key token is now held by the smart contract.`;
				loadingWheel.innerHTML = loaded;
				ig.game.playSuccessSound2();
				setTimeout("closeMiningBoxBox(20)", 3000); //Close mining box after 3 seconds.
			}
			else if (num == 21){
				title.innerHTML = "Attempting to Withdraw Blue Key Token...";
				body.innerHTML = `You are attempting to withdraw your Blue Key token from the holder contract. Your transaction is waiting to be mined (included in a block)...`;
				loadingWheel.innerHTML = loader;
			}
			else if (num == 22){
				title.innerHTML = "Blue Key Token Withdrawn!";
				body.innerHTML = `You have successfully withdrawn your Blue Key token from the holding contract.`;
				loadingWheel.innerHTML = loaded;
				ig.game.playSuccessSound2();
				setTimeout("closeMiningBoxBox(22)", 3000); //Close mining box after 3 seconds.
			}
			else if (num == 23){
				title.innerHTML = "Submitting Transaction to Mint Graduation Gift Token...";
				var slicedObj = data.slice(0, 10);
				slicedObj += "...";
				body.innerHTML = `You are attempting to mint a token redeemable for your graduation gift. Your transaction (<a href='https://sepolia.arbiscan.io/tx/${data}' target='_blank'>${slicedObj}</a>) is waiting to be mined (included in a block)...`;
				loadingWheel.innerHTML = loader;
			}
			else if (num == 24){
				title.innerHTML = "Token Mint Successful!";
				body.innerHTML = `You have minted a token redeemable for your graduation gift!`;
				loadingWheel.innerHTML = loaded;
				ig.game.playSuccessSound2();
				setTimeout("closeMiningBoxBox()", 3000); //Close mining box after 3 seconds.
			}
			else if (num == 25){
				title.innerHTML = "Approving Token Transfer";
				body.innerHTML = `You are granting the Graduation Gift NFT minter permission to spend your Graduation Gift token. Your transaction is waiting to be mined...`;
				loadingWheel.innerHTML = loader;
			}
			else if (num == 26){
				title.innerHTML = "Permission Granted!";
				body.innerHTML = `You have granted permission for the NFT minter to spend your Graduation Gift token. Next you will sign a request to transfer the token...`;
				loadingWheel.innerHTML = loaded;
				ig.game.playSuccessSound1();
			}
			else if (num == 27){
				title.innerHTML = "Initiating Graduation Gift Redemption";
				body.innerHTML = `You are transferring your Graduation Gift token to the NFT minting contract. The contract will use a Chainlink VRF request to determine your unique graduation gift...`;
				loadingWheel.innerHTML = loader;
			}
			else if (num == 28){
				title.innerHTML = "Transaction Mined!";
				body.innerHTML = `Chainlink VRF request is currently determining your unique graduation gift. Congratulations on making it!`;
				loadingWheel.innerHTML = loaded;
				ig.game.playSuccessSound1();
				miningBoxActive = 28;
			}
			else if (num == 29){
				title.innerHTML = "Graduation Gift Minted!";
				body.innerHTML = `A Chainlink VRF request has determined your gift. You have received a ${graduationGiftDescription} Congratulations again on your graduation. Through that last door is the wide world of Web3.`;
				loadingWheel.innerHTML = loaded;
				ig.game.playSuccessSound2();
				setTimeout("closeMiningBoxBox(29)", 5000); //Close mining box after 5 seconds.
			}
			
		}
	</script>
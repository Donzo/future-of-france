<script>
		
		function pauseGame(){
			ig.game.pause = true;
			console.log('game paused')
		}
		function unpauseGame(){
			ig.game.pause = true;
			console.log('game unpaused')
		}
		function popAlert(which){
			setAlertMsg(which);
			showAlertBox();
			
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
		function closeAlert(){
			document.getElementById("sysMsgBoxBG").style.display = "none";
			document.getElementById("alertBox").style.display = "none";
			
			unpauseGame();
		}
		function showConfirmBox(){
			document.getElementById("sysMsgBoxBG").style.display = "block";
			document.getElementById("confirmBox").style.display = "block";
		}
		function closeConfirm(which){
			document.getElementById("sysMsgBoxBG").style.display = "none";
			document.getElementById("confirmBox").style.display = "none";
			if (which == 1){
				popAlert(1);
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
			document.getElementById("sysMsgBoxBG").style.display = "none";
			document.getElementById("inputBox").style.display = "none";
		}
		function showMiningBoxBox(){
			document.getElementById("sysMsgBoxBG").style.display = "block";
			document.getElementById("miningInfoBox").style.display = "block";
		}
		function closeMiningBoxBox(){
			document.getElementById("sysMsgBoxBG").style.display = "none";
			document.getElementById("miningInfoBox").style.display = "none";
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

			if (num == 1){
				title.innerHTML = "Alert 1 Called";
				body.innerHTML = "Alert 1 has been called. Now that alert 1 has been called blah blah blah.";
			}
			//You rejected the request to connect.
			else if (num == 2){
				title.innerHTML = "Connection Failed";
				body.innerHTML = "You rejected the request to connect.";
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
		}
		function setConfirmMsg(num){
			var title = document.getElementById("confirmBoxTitle");
			var body = document.getElementById("confirmBoxBody");
			var button = document.getElementById("sysConfirmButtonDiv");
		
			// Default is to close alert but we can set it to other things too.		
			button.innerHTML = `<button class='button sysMsgButton' onclick="closeConfirm(1)">Yes</button><button class='button sysMsgButton' onclick="closeConfirm(1)">No</button>`;

			if (num == 1){
				title.innerHTML = "Confirm 1 Called";
				body.innerHTML = "Confirm 1 has been called. Now that confirm 1 has been called blah blah blah.";
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
		}
	</script>
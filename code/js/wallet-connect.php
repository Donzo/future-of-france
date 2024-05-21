<script>
		//Wallet Connection Variables
		var onPreferredNetwork = false;
		var preferredNetwork1 = "Ethereum Sepolia Testnet";
		var preferredNetworkChainID = "0xaa36a7";
		var preferredNetworkSwitchCode = 9;
		var preferredProviderNumber = 11155111;
		var chain = false;
		var chainId = false;
		var firstConnection = false;
		var alreadyOnNetwork = false;

		async function checkMyConnection(){ //Called at game start to see if player is already connected.
			
			try {
				await ethereum.request({ method: 'eth_requestAccounts' });
			}
			catch(error){
				console.log('no wallet connection');
			}
			
			const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
			
			if (accounts.length){
				console.log(`You're connected to: ${accounts[0]}`);	
			}
			
			account = accounts[0];
			window['userAccountNumber'] = account;
			
			if (account){
				window['userAccountNumber'] = account;
				
			}
			else{
				console.log('no account num.')
			}
		}
		
		async function connectMyWallet(){	//Called ingame
		
			try {
				await ethereum.request({ method: 'eth_requestAccounts' });
			}
			catch(error){
				//Handle Connection Errors
				if (error.code == 4001){
					if (firstConnection){
						ig.game.inspObjTxt = "You declined to connect.";
						ig.game.promptBoxOpen = false;
						ig.game.objBoxOpen = true;
						ig.game.playAlertSound();
					}
					else{
						popAlert(2); //Connection Declined
					}
						
				}
				else if (error.code == -32002){
					if (firstConnection){
						ig.game.inspObjTxt = "You already have a pending request. Check your browser wallet.";
						ig.game.promptBoxOpen = false;
						ig.game.objBoxOpen = true;
						ig.game.playAlertSound();
					}
					else{
						popAlert(3); //Request Pending / Check Wallet
					}
				}
				else{
					console.log('Something is wrong with your wallet.');
					ig.game.playAlertSound();
				}
				return;
			}
			
			const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
			
			if (accounts.length){
				console.log(`You're connected to: ${accounts[0]}`);	
			}
			
			account = accounts[0];
			window['userAccountNumber'] = account;
			
			if (account){
				window['userAccountNumber'] = account;
				
			}
			else{
				console.log('no account num.')
			}
			
			if(firstConnection && window['userAccountNumber']){
				loginUser(window['userAccountNumber'], 1);
			}
			else if (!window['userAccountNumber']){
				ig.game.inspObjTxt = "Something went wrong with the connection.";
				ig.game.promptBoxOpen = true;
				ig.game.playAlertSound();
			}
			else{
			
				//Create Web3 Object
				let web3 = new Web3(Web3.givenProvider);
				const chain = await web3.eth.getChainId();
						
				//Get Provider
				web3.eth.net.getId().then(
					function(value){
						provider = value;
						if (provider){
		  					reportProvider();
		  				}
  					}	
  				);
  			}
		}
		async function reportProvider(){
			
			if (window.ethereum){
  		 		chainId = await window.ethereum.request({
					"method": "eth_chainId",
					"params": []
				});
  		 	}
			
			//Get networkName
			if (chainId == "0xaa36a7" ){
  				networkName = "Ethereum Sepolia";
  			}	
			else if (chainId == "0x89" ){
  				networkName = "Polygon";
  			}	
			else if (chainId == "0x5" ){
  				networkName = "Goerli";
  			}
			else if (chainId == "0xa86a" ){
				networkName = "Avalanche";
			}
			else if (chainId == "0x1" ){
  				networkName = "Ethereum";
  			}
  			else if (chainId == "0x2a" ){
  				networkName = "Kovan";
  			}
  			else if (chainId == "0x4" ){
  				networkName = "Rinkeby";
  			}
  			else if (chainId == "0xa4b1"){
  				networkName = "Arbitrum";
  			}
  			else if (chainId == "0x66eed" ){
  				networkName = "ArbiGoerli";
  			}
  			else if (chainId == "0xa869"){
  				networkName = "Ava Fuji";
  			}
  			else if (chainId == "0x8274f"){
				//Scroll Sepolia
				networkName = "Scroll Sepolia";
			}
			else if (chainId == "0x66eee"){
				//Arbitrum Sepolia
				networkName = "Arbitrum Sepolia";
			}
			else if (chainId == "0xaa37dc"){
				//Arbitrum Sepolia
				networkName = "OP Sepolia";
			}
  			else if (window.ethereum){
  		 		networkName = "Unknown Ethereum Network";
			}
  			else{
  				networkName = "unhandled network";
  			}
  			
  			
		}
		async function switchNetwork(which, where){
			var theChainID = false;
			await reportProvider();

			if (which == 1){
				//Polygon
				theChainID = '0x89';
				theRPCURL = 'https://polygon-rpc.com';
				nn = "polygon";
			}
			else if (which == 2){
				//AVAX
				theChainID = '0xa86a';
				theRPCURL = 'https://api.avax.network/ext/bc/C/rpc';
				nn = "avalanche";
			}
			else if (which == 3){
				//Mainnet
				theChainID = '0x1';
				theRPCURL = 'https://main-light.eth.linkpool.io/';
				nn = "ethereum";
			}
			else if (which == 4){
				//Kovan
				theChainID = '0x2a';
				theRPCURL = 'https://kovan.infura.io';
				nn = "kovan";
			}
			else if (which == 5){
				//Rinkeby
				theChainID = '0x4';
				theRPCURL = 'https://rinkeby-light.eth.linkpool.io/';
				nn = "rinkeby";
			}
			else if (which == 6){
				//Arbitrum
				theChainID = '0xa4b1';
				theRPCURL = 'https://arb1.arbitrum.io/rpc';
				nn = 'arbitrum';
			}
			else if (which == 7){
				//Goerli
				theChainID = '0x5';
				theRPCURL = 'https://goerli.infura.io/v3/';
				nn = 'goerli';
			}
			else if (which == 8){
				//Arbitrum Goerli
				theChainID = '0x66eed';
				theRPCURL = 'https://arbitrum-goerli.publicnode.com';
				nn = 'arbi goerli';
			}
			else if (which == 9){
				//Sepolia
				theChainID = '0xaa36a7';
				theRPCURL = 'https://rpc.sepolia.org';
				nn = "Ethereum Sepolia";
				chainId = theChainID;
			}
			else if (which == 10){
				//Avalanche Fuji
				theChainID = '0xa869';
				theRPCURL = 'https://api.avax-test.network/ext/bc/C/rpc';
				nn = "Ava Fuji";
			}
			else if (which == 11){
				//Scroll Sepolia
				theChainID = '0x8274f';
				theRPCURL = 'https://sepolia-rpc.scroll.io';
				nn = "Scroll Sepolia";
			}
			else if (which == 12){
				//Arbitrum Sepolia
				theChainID = '0x66eee';
				theRPCURL = 'https://sepolia-rollup.arbitrum.io/rpc';
				nn = "Arbitrum Sepolia";
				chainId = theChainID;
				preferredNetwork1 = nn;
			}
			else if (which == 13){
				//OP Sepolia
				theChainID = '0xaa37dc'; //Chain ID 11155420
				theRPCURL = 'https://sepolia.optimism.io';
				nn = "OP Sepolia";
				chainId = theChainID;
			}
			try {
			
				alreadyOnNetwork = networkName == nn ? true: false;
				preferredNetwork1 = nn;
				preferredNetworkChainID = theChainID;
				
				if (where == "game2"){
					if (alreadyOnNetwork){
						ig.game.computerDispProgressLine = "You are already connected to " + preferredNetwork1 + ".";
						ig.game.playAlertSound();
					}
					else{
						ig.game.computerDispProgressLine = "Attempting to connect to " + nn + ".";
					}
				}
					await window.ethereum.request({
						method: 'wallet_switchEthereumChain',
						params: [{ chainId: theChainID }],
					});
					if (where == "game2"){
						ig.game.playChangeNetworkSound()
						ig.game.computerDispProgressLine = "You are now connected to " + preferredNetwork1 + ".";
					}
					//If On Correct Chain Now, Run the Start Checks To See If User is Signed In
				} catch (switchError){
  				//This error code indicates that the chain has not been added to MetaMask.
				if (switchError.code == 4902){
					try {
						await window.ethereum.request({
							method: 'wallet_addEthereumChain',
							params: [{ chainId: theChainID, 
										chainName: preferredNetwork1,
										rpcUrls: [theRPCURL],
										nativeCurrency:{
											name: "Ethereum",
											symbol: "ETH",
											decimals: 18,
										},
									}],
						});
						checkAgain();
					}
					catch (addError){
						if (addError.code == 4001 && where == "game2"){
							ig.game.computerDispProgressLine =  "You declined to connect.";
							ig.game.playAlertSound();
						}
					}
				}
				else if (switchError.code == -32002){
					if (where == "game1"){
						ig.game.inspObjTxt = "You already have a pending request. Check your browser wallet.";
						ig.game.promptBoxOpen = false;
						ig.game.objBoxOpen = true;
						ig.game.playAlertSound();
					}
					else if (where == "game2"){
						ig.game.computerDispProgressLine = "You already have a pending request. Check your browser wallet.";
						ig.game.playAlertSound();
					}
					else {
						popAlert(6); //Request Pending / Check Wallet
					}
				}
				else if (switchError.code == 4001){
					if (where == "game1"){
						ig.game.inspObjTxt = "You declined to connect.";
						ig.game.promptBoxOpen = false;
						ig.game.objBoxOpen = true;
						ig.game.playAlertSound();
					}
					else if (where == "game2"){
						ig.game.computerDispProgressLine = "You declined to connect.";
						ig.game.playAlertSound();
					}
					else{	
						//popAlert(5); //Connection Declined
					}
				}
				else{
					try {
						await window.ethereum.request({
							method: 'wallet_addEthereumChain',
							params: [{ chainId: theChainID, 
										chainName: preferredNetwork1,
										rpcUrls: [theRPCURL],
										nativeCurrency:{
											name: "Ethereum",
											symbol: "ETH",
											decimals: 18,
										},
									}],
						});
						if (where == "game2"){
							if (alreadyOnNetwork){
								ig.game.computerDispProgressLine = "You are already connected to " + preferredNetwork1 + ".";
								ig.game.playAlertSound();
							}
							else{
								ig.game.computerDispProgressLine = preferredNetwork1 + " has been added to your wallet. Click the logo again to connect.";
								ig.game.playChangeNetworkSound();
							}
						}
						else{
							checkAgain();
						}
					}
					catch (addError){
						if (addError.code == 4001 && where == "game2"){
							ig.game.computerDispProgressLine =  "You declined to connect.";
							ig.game.playAlertSound();
						}
					}
				}
				checkAgain();
			}
		}
		async function checkAgain(){
			if (window.ethereum){
  		 		chainId = await window.ethereum.request({
					"method": "eth_chainId",
					"params": []
				});
  		 	}  		 	
		}
	</script>
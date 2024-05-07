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
		
		function popAlert(which){
			alert(which);
		}
		function popConfirm(which){
			if (which == 2 || which == 3){
				var sysMsg = `You must be on the ${preferredNetwork1} to your to play this game. Would you like to switch to ${preferredNetwork1} now?`;
				if (confirm(sysMsg) == true) {
					switchNetwork(preferredNetworkSwitchCode);
				}
				else{
					alert(`Ok, but you can't play this game until you connect to this site on the  ${preferredNetwork1}.'`);
				}
			}
		}
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
					}
					else{
						popAlert(2); //Connection Declined
					}
						
				}
				else if (error.code == -32002){
					if (firstConnection){
						ig.game.inspObjTxt = "You already have a pending request. Check your browser wallet.";
						ig.game.promptBoxOpen = true;
					}
					else{
						popAlert(3); //Request Pending / Check Wallet
					}
				}
				else{
					console.log('Something is wrong with your wallet.');
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
			if (chainId == "0xaa36a7" || provider == 11155111){
  				networkName = "Sepolia";
  			}	
			else if (chainId == "0x89" || provider == 137){
  				networkName = "Polygon";
  			}	
			else if (chainId == "0x5" || provider == 5){
  				networkName = "Goerli";
  			}
			else if (chainId == "0xa86a" || provider == 43114){
				networkName = "Avalanche";
			}
			else if (chainId == "0x1" || provider == 1){
  				networkName = "Ethereum";
  			}
  			else if (chainId == "0x2a" || provider == 42){
  				networkName = "Kovan";
  			}
  			else if (chainId == "0x4" || provider == 4){
  				networkName = "Rinkeby";
  			}
  			else if (chainId == "0xa4b1" || provider == 42161){
  				networkName = "Arbitrum";
  			}
  			else if (chainId == "0x66eed" || provider == 421613){
  				networkName = "ArbiGoerli";
  			}
  			else if (chainId == "0xa869" || provider == 43113){
  				networkName = "Ava Fuji";
  			}
  			else if (chainId == "0x8274f" || provider == 534351){
				//Scroll Sepolia
				networkName = "Scroll Sepolia";
			}  			
  			else if (window.ethereum){
  		 		networkName = "Unknown Ethereum Network";
			}
  			else{
  				networkName = "unhandled network";
  			}
  			
  			//console.log('User is on ' + networkName + ' with ID number ' + provider + ' and chainid ' + chainId + '.');
  			
  			//This is the preferred chain
  			if (chainId == preferredNetworkChainID || provider == preferredProviderNumber){
  				onPreferredNetwork = true;
  				startCheck();
			}	
  			else{
  				popConfirm(2); //Ask to change network
  			}
  			
  			
		}
		async function switchNetwork(which){
			var theChainID = false;
			
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
				nn = "Ethereum Sepolia Testnet";
				checkAgain();
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
			try {
					await window.ethereum.request({
						method: 'wallet_switchEthereumChain',
						params: [{ chainId: theChainID }],
					});
					checkAgain();
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
						popConfirm(3); //Ask to change (add) network
					}
				}
				else if (switchError.code == -32002){
					popAlert(6); //Request Pending / Check Wallet
				}
				else if (switchError.code == 4001){
					popAlert(5); //Connection Declined
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
						checkAgain();
					}
					catch (addError){
						popConfirm(3); //Ask to change (add) network
					}
				}
				checkAgain();
			}
		}
		function startCheck(){
			if (window['userAccountNumber'] && chainId == "0x8274f"){
				console.log('connected and on the correct network - begin game setup');
				alert('start game');
			}
			else{
				console.log(`something is wrong maybe chainId = ${chainId} or window['userAccountNumber'] = ${window['userAccountNumber']}`);
			}
		}
		async function checkAgain(){
			if (window.ethereum){
  		 		chainId = await window.ethereum.request({
					"method": "eth_chainId",
					"params": []
				});
				startCheck();
  		 	}  		 	
		}
	</script>
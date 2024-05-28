<script>
		var transactionValue = 10; 
		var pymntAddress = false;
		var properAddress = true;
		var userMaxCredit = 0;
		var myHash = false;
		
		//AAVE Contract Addresses
		var aavePoolContractAddress = "0x6Ae43d3271ff6888e7Fc43Fd7321a503ff738951";
		var aGhoDebtTokenContractAddress = "0x67ae46EF043F7A4508BD1d6B94DB6c33F0915844";
		var wethGatewayContractAddress = "0x387d311e47e80b498169e6fb51d3193167d89F7D";
		var gameContractAddress = "0x27BdE4E675a081b125B4C9510c2591b8fe9C9C25";
		
		//Main Sending Function
		async function sendGHOAcrossChain(){
			
			let web3 = new Web3(Web3.givenProvider);
			var contract = new web3.eth.Contract(abi11, gameContractAddress, {});
			
			var tValue = convertNumForBN2(transactionValue);
			tValue = web3.utils.toBN(tValue);
			
			console.log('tValue = ' + tValue)
			await contract.methods.initSettings(tValue, window['userAccountNumber']).send({
				from: window['userAccountNumber'],
			}).on('transactionHash', function(hash){
				myHash = hash;
				popMiningBox(1, hash);
			}).on('receipt', function(receipt){
				popMiningBox(2, receipt);
				setTimeout("closeMiningBoxBox()", 5000); //Close Mining Box
			}).on('error', console.error);
		}
		
		//Part of obligation checks.
		async function getUserMaxCredit(){
			
			let web3 = new Web3(Web3.givenProvider);
			var contract = new web3.eth.Contract(abi9, aavePoolContractAddress, {});
			
			//Max Credit Power? (based on collateral)
			var usrAcctData = await contract.methods.getUserAccountData(window['userAccountNumber']).call();
			userMaxCredit = usrAcctData.availableBorrowsBase;
			var scTValue = processNumberForContract(transactionValue);
			//User Has Enough Collateral
			if (parseFloat(userMaxCredit) > parseFloat(scTValue)){
				//Step 2 - Check to see contract has been delegated appropriate amount
				getUserDelgationAmount();
			}
			//Prompt a Collateral Deposit
			else{
				popConfirm(4);
			}
			
		}
		//Part of obligation checks.
		async function getUserDelgationAmount(){
			let web3 = new Web3(Web3.givenProvider);
			var contract = new web3.eth.Contract(abi8, aGhoDebtTokenContractAddress, {});
			var delegatedAmount = await contract.methods.borrowAllowance(window['userAccountNumber'], gameContractAddress).call();
			delegatedAmountBN = web3.utils.toBN(delegatedAmount);
			var tValue = convertNumForBN(transactionValue);
			tValue = web3.utils.toBN(tValue);
			
			//If user has delegated LESS to this contract than required, request credit delegation.
			if (delegatedAmount < tValue){
				popConfirm(5); // Prompt Credit Delegation
			}
			else{
				sendGHOAcrossChain();
			}
		}
		function convertNumForBN(value) {
			return (parseFloat(value) * 1e18).toLocaleString('fullwide', {useGrouping: false});
		}
		function convertNumForBN2(value) {
			return (parseFloat(value) * 1e8).toLocaleString('fullwide', {useGrouping: false});
		}
		//Part of obligation checks.
		async function approveBorrowingDelegation(){
			let web3 = new Web3(Web3.givenProvider);
			var contract = new web3.eth.Contract(abi8, aGhoDebtTokenContractAddress, {});
			
			var tValue = convertNumForBN(transactionValue);
			tValue = web3.utils.toBN(tValue);

			await contract.methods.approveDelegation(gameContractAddress, tValue).send({
				from: window['userAccountNumber'],
			}).on('transactionHash', function(hash){
				myHash = hash;
				popMiningBox(3, hash);
			}).on('receipt', function(receipt){
				popMiningBox(4, receipt);
				setTimeout("closeMiningBoxBox(2)", 3000); //Close Mining Box
			}).on('error', console.error);
		}
		
		//Deposits ETH into AAVE if user needs more collateral
		async function depositETHintoAAVE(amount){
			if (!amount){
				console.log('no eth sent');
				return;
			}
			var amount = amount.toString();
		    amount	= amount.replace('.', '');
		    amount = amount + '0000000000000000'; // Append zeros

			let web3 = new Web3(Web3.givenProvider);
			var contract = new web3.eth.Contract(abi10, wethGatewayContractAddress, {});
			var ethSepoliaAaveTknPoolAddress = "0x5b071b590a59395fE4025A0Ccc1FcC931AAc1830";
			await contract.methods.depositETH(ethSepoliaAaveTknPoolAddress, window['userAccountNumber'], 0).send({
				from: window['userAccountNumber'],
				value: amount
				//value: web3.toWei(1, "ether"), 
			}).on('transactionHash', function(hash){
				myHash = hash;
				popMiningBox(7, hash);
			}).on('receipt', function(receipt){
				popMiningBox(8, receipt);
				setTimeout("closeMiningBoxBox(1)", 3000); //Close Mining Box
				
			}).on('error', console.error);
		}
		
	</script>
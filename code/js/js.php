<script>
	//General Purpose JavaScript Functions
	
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

	
</script>
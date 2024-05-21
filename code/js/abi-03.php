	<script>
		//ABI for Blue Key Token Holding Contract
		//https://sepolia.arbiscan.io/address/0x4060ff3e9a8a5fb7e6e3f84c50767cbee8dd47b5#code
		var abi3 = [
			{
			  "anonymous": false,
			  "inputs": [
			    {
			      "indexed": true,
			      "internalType": "address",
			      "name": "user",
			      "type": "address"
			    },
			    {
			      "indexed": false,
			      "internalType": "uint256",
			      "name": "amount",
			      "type": "uint256"
			    }
			  ],
			  "name": "FofTokensDeposited",
			  "type": "event"
			},
			{
			  "anonymous": false,
			  "inputs": [
			    {
			      "indexed": true,
			      "internalType": "address",
			      "name": "user",
			      "type": "address"
			    },
			    {
			      "indexed": false,
			      "internalType": "uint256",
			      "name": "amount",
			      "type": "uint256"
			    }
			  ],
			  "name": "FofTokensWithdrawn",
			  "type": "event"
			},
			{
			  "inputs": [],
			  "name": "fofBlueKeyTokenContract",
			  "outputs": [
			    {
			      "internalType": "contract FOFBlueKeyToken",
			      "name": "",
			      "type": "address"
			    }
			  ],
			  "stateMutability": "view",
			  "type": "function"
			},
			{
			  "inputs": [
			    {
			      "internalType": "uint256",
			      "name": "amount",
			      "type": "uint256"
			    }
			  ],
			  "name": "fofDepositTokens",
			  "outputs": [],
			  "stateMutability": "nonpayable",
			  "type": "function"
			},
			{
			  "inputs": [
			    {
			      "internalType": "address",
			      "name": "",
			      "type": "address"
			    }
			  ],
			  "name": "fofTokenBalance",
			  "outputs": [
			    {
			      "internalType": "uint256",
			      "name": "",
			      "type": "uint256"
			    }
			  ],
			  "stateMutability": "view",
			  "type": "function"
			},
			{
			  "inputs": [
			    {
			      "internalType": "address",
			      "name": "",
			      "type": "address"
			    }
			  ],
			  "name": "fofTokensWithdrawn",
			  "outputs": [
			    {
			      "internalType": "uint256",
			      "name": "",
			      "type": "uint256"
			    }
			  ],
			  "stateMutability": "view",
			  "type": "function"
			},
			{
			  "inputs": [
			    {
			      "internalType": "uint256",
			      "name": "amount",
			      "type": "uint256"
			    }
			  ],
			  "name": "fofWithdrawTokens",
			  "outputs": [],
			  "stateMutability": "nonpayable",
			  "type": "function"
			}
		];
	</script>
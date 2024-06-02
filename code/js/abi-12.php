<script>
		//ABI Blue Token Minter - CL Functions
		var abi12 = [
			{
			  "inputs": [],
			  "stateMutability": "nonpayable",
			  "type": "constructor"
			},
			{
			  "inputs": [],
			  "name": "EmptyArgs",
			  "type": "error"
			},
			{
			  "inputs": [],
			  "name": "EmptySource",
			  "type": "error"
			},
			{
			  "inputs": [],
			  "name": "NoInlineSecrets",
			  "type": "error"
			},
			{
			  "inputs": [],
			  "name": "OnlyRouterCanFulfill",
			  "type": "error"
			},
			{
			  "inputs": [
			    {
			      "internalType": "bytes32",
			      "name": "requestId",
			      "type": "bytes32"
			    }
			  ],
			  "name": "UnexpectedRequestID",
			  "type": "error"
			},
			{
			  "anonymous": false,
			  "inputs": [
			    {
			      "indexed": false,
			      "internalType": "address",
			      "name": "buyer",
			      "type": "address"
			    },
			    {
			      "indexed": false,
			      "internalType": "uint256",
			      "name": "amountOfETH",
			      "type": "uint256"
			    }
			  ],
			  "name": "MintBlueCoins",
			  "type": "event"
			},
			{
			  "anonymous": false,
			  "inputs": [
			    {
			      "indexed": true,
			      "internalType": "address",
			      "name": "from",
			      "type": "address"
			    },
			    {
			      "indexed": true,
			      "internalType": "address",
			      "name": "to",
			      "type": "address"
			    }
			  ],
			  "name": "OwnershipTransferRequested",
			  "type": "event"
			},
			{
			  "anonymous": false,
			  "inputs": [
			    {
			      "indexed": true,
			      "internalType": "address",
			      "name": "from",
			      "type": "address"
			    },
			    {
			      "indexed": true,
			      "internalType": "address",
			      "name": "to",
			      "type": "address"
			    }
			  ],
			  "name": "OwnershipTransferred",
			  "type": "event"
			},
			{
			  "anonymous": false,
			  "inputs": [
			    {
			      "indexed": true,
			      "internalType": "bytes32",
			      "name": "id",
			      "type": "bytes32"
			    }
			  ],
			  "name": "RequestFulfilled",
			  "type": "event"
			},
			{
			  "anonymous": false,
			  "inputs": [
			    {
			      "indexed": true,
			      "internalType": "bytes32",
			      "name": "id",
			      "type": "bytes32"
			    }
			  ],
			  "name": "RequestSent",
			  "type": "event"
			},
			{
			  "anonymous": false,
			  "inputs": [
			    {
			      "indexed": true,
			      "internalType": "bytes32",
			      "name": "requestId",
			      "type": "bytes32"
			    },
			    {
			      "indexed": false,
			      "internalType": "string",
			      "name": "blueCoins",
			      "type": "string"
			    },
			    {
			      "indexed": false,
			      "internalType": "bytes",
			      "name": "response",
			      "type": "bytes"
			    },
			    {
			      "indexed": false,
			      "internalType": "bytes",
			      "name": "err",
			      "type": "bytes"
			    }
			  ],
			  "name": "Response",
			  "type": "event"
			},
			{
			  "inputs": [],
			  "name": "acceptOwnership",
			  "outputs": [],
			  "stateMutability": "nonpayable",
			  "type": "function"
			},
			{
			  "inputs": [],
			  "name": "blueCoins",
			  "outputs": [
			    {
			      "internalType": "string",
			      "name": "",
			      "type": "string"
			    }
			  ],
			  "stateMutability": "view",
			  "type": "function"
			},
			{
			  "inputs": [],
			  "name": "blueCoinsToMint",
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
			      "internalType": "uint64",
			      "name": "_subscriptionId",
			      "type": "uint64"
			    },
			    {
			      "internalType": "string[]",
			      "name": "_args",
			      "type": "string[]"
			    }
			  ],
			  "name": "checkAndMintBlueCoins",
			  "outputs": [],
			  "stateMutability": "payable",
			  "type": "function"
			},
			{
			  "inputs": [
			    {
			      "internalType": "bytes32",
			      "name": "requestId",
			      "type": "bytes32"
			    },
			    {
			      "internalType": "bytes",
			      "name": "response",
			      "type": "bytes"
			    },
			    {
			      "internalType": "bytes",
			      "name": "err",
			      "type": "bytes"
			    }
			  ],
			  "name": "handleOracleFulfillment",
			  "outputs": [],
			  "stateMutability": "nonpayable",
			  "type": "function"
			},
			{
			  "inputs": [],
			  "name": "mintersAddress",
			  "outputs": [
			    {
			      "internalType": "address",
			      "name": "",
			      "type": "address"
			    }
			  ],
			  "stateMutability": "view",
			  "type": "function"
			},
			{
			  "inputs": [],
			  "name": "owner",
			  "outputs": [
			    {
			      "internalType": "address",
			      "name": "",
			      "type": "address"
			    }
			  ],
			  "stateMutability": "view",
			  "type": "function"
			},
			{
			  "inputs": [],
			  "name": "s_lastError",
			  "outputs": [
			    {
			      "internalType": "bytes",
			      "name": "",
			      "type": "bytes"
			    }
			  ],
			  "stateMutability": "view",
			  "type": "function"
			},
			{
			  "inputs": [],
			  "name": "s_lastRequestId",
			  "outputs": [
			    {
			      "internalType": "bytes32",
			      "name": "",
			      "type": "bytes32"
			    }
			  ],
			  "stateMutability": "view",
			  "type": "function"
			},
			{
			  "inputs": [],
			  "name": "s_lastResponse",
			  "outputs": [
			    {
			      "internalType": "bytes",
			      "name": "",
			      "type": "bytes"
			    }
			  ],
			  "stateMutability": "view",
			  "type": "function"
			},
			{
			  "inputs": [
			    {
			      "internalType": "uint64",
			      "name": "subscriptionId",
			      "type": "uint64"
			    },
			    {
			      "internalType": "string[]",
			      "name": "args",
			      "type": "string[]"
			    }
			  ],
			  "name": "sendRequest",
			  "outputs": [
			    {
			      "internalType": "bytes32",
			      "name": "requestId",
			      "type": "bytes32"
			    }
			  ],
			  "stateMutability": "nonpayable",
			  "type": "function"
			},
			{
			  "inputs": [
			    {
			      "internalType": "string",
			      "name": "_str",
			      "type": "string"
			    }
			  ],
			  "name": "strToUint",
			  "outputs": [
			    {
			      "internalType": "uint256",
			      "name": "res",
			      "type": "uint256"
			    },
			    {
			      "internalType": "bool",
			      "name": "err",
			      "type": "bool"
			    }
			  ],
			  "stateMutability": "pure",
			  "type": "function"
			},
			{
			  "inputs": [
			    {
			      "internalType": "address",
			      "name": "_toAddress",
			      "type": "address"
			    }
			  ],
			  "name": "transferBlueCoinContractOwnership",
			  "outputs": [],
			  "stateMutability": "nonpayable",
			  "type": "function"
			},
			{
			  "inputs": [
			    {
			      "internalType": "address",
			      "name": "to",
			      "type": "address"
			    }
			  ],
			  "name": "transferOwnership",
			  "outputs": [],
			  "stateMutability": "nonpayable",
			  "type": "function"
			},
			{
			  "inputs": [],
			  "name": "withdraw",
			  "outputs": [],
			  "stateMutability": "nonpayable",
			  "type": "function"
			}
		];
	</script>
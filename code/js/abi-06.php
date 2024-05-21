	<script>
		//ABI for Graduation Gift Token Minter (CL FUNCTIONS)
		//https://sepolia.arbiscan.io/address/0xf17dac41182523c3d73e133d55f271ee1dcf6042#code
		var abi6 = [
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
						"name": "graduate",
						"type": "address"
					}
				],
				"name": "MintGraduationGift",
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
						"name": "ggMinted",
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
				"inputs": [
					{
						"internalType": "string[]",
						"name": "_args",
						"type": "string[]"
					}
				],
				"name": "checkGraduationGiftMint",
				"outputs": [],
				"stateMutability": "payable",
				"type": "function"
			},
			{
				"inputs": [],
				"name": "ggMinted",
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
				"name": "ggMintedConverted",
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
				"name": "transferGGTokenMinterContractOwnership",
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
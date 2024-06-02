//SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import {FunctionsClient} from "@chainlink/contracts/src/v0.8/functions/v1_0_0/FunctionsClient.sol";
import {ConfirmedOwner} from "@chainlink/contracts/src/v0.8/shared/access/ConfirmedOwner.sol";
import {FunctionsRequest} from "@chainlink/contracts/src/v0.8/functions/v1_0_0/libraries/FunctionsRequest.sol";

interface BlueCoinToken {
	function mint(address, uint256) external;  
	function transferOwnership(address) external; //from and to
}


contract BlueCoinMinter is FunctionsClient, ConfirmedOwner {
	using FunctionsRequest for FunctionsRequest.Request;

	//State variables to store the last request ID, response, and error
	bytes32 public s_lastRequestId;
	bytes public s_lastResponse;
	bytes public s_lastError;
	uint32 gasLimit = 300000; //Callback gas limit
	bytes32 donID = 0x66756e2d617262697472756d2d7365706f6c69612d3100000000000000000000; //donID - Arbitrum Sepolia
	address private blueCoinContractAddress; //SET IN CONSTRUCTOR, REMEMBER TO CHANGE IF DEPLOYING NEW ORE TOKEN
	address public mintersAddress;
	string public blueCoins;
	uint256 public blueCoinsToMint;
	
	error UnexpectedRequestID(bytes32 requestId);

	//Event that log buy operation
	event MintBlueCoins(address buyer, uint256 amountOfETH);

	 //Fetch BlueCoint Amount
	string source = 
		"const wallet = args[0];"
		"const apiResponse = await Functions.makeHttpRequest({"
		"url: `https://fofrance.com/code/php/mint-bluecoin-check.php?wallet=${wallet}`"
		"});"
		"if (apiResponse.error) {"
		"throw Error('Request failed');"
		"}"
		"const { data } = apiResponse;"
		"return Functions.encodeString(data.blueCoins);";

	//Event to log responses
	event Response(
		bytes32 indexed requestId,
		string blueCoins,
		bytes response,
		bytes err
	);

	//Arbitrum Sepolia Router
	address router = 0x234a5fb5Bd614a7AA2FfAB244D603abFA0Ac5C5C;
 
	constructor() FunctionsClient(router) ConfirmedOwner(msg.sender) {
		blueCoinContractAddress = 0x488DF98082AF001Ac236EfDF2A63e27AA25A0C14; 
		//Change This if Deploying New BLUECOIN contract
	}

	function checkAndMintBlueCoins (uint64 _subscriptionId, string[] calldata _args) public payable{
		require(msg.value > 2500000000000000, "Send .025 ETH to mint BLUECOINS.");
		mintersAddress = msg.sender;
		//emit the event
		emit MintBlueCoins(msg.sender, msg.value);
		sendRequest(_subscriptionId, _args);
	}

	function sendRequest(
		uint64 subscriptionId,
		string[] calldata args
	) public returns (bytes32 requestId) {
		FunctionsRequest.Request memory req;
		req.initializeRequestForInlineJavaScript(source);
		if (args.length > 0) req.setArgs(args);

		s_lastRequestId = _sendRequest(
			req.encodeCBOR(),
			subscriptionId,
			gasLimit,
			donID
		);

		return s_lastRequestId;
	}

	function strToUint(string memory _str) public pure returns(uint256 res, bool err) {
	
		for (uint256 i = 0; i < bytes(_str).length; i++) {
			if ((uint8(bytes(_str)[i]) - 48) < 0 || (uint8(bytes(_str)[i]) - 48) > 9) {
				return (0, false);
			}
			res += (uint8(bytes(_str)[i]) - 48) * 10**(bytes(_str).length - i - 1);
		} 
		return (res, true);
	}
	function transferBlueCoinContractOwnership(address _toAddress) public onlyOwner{
		   BlueCoinToken blueCoinContract = BlueCoinToken(blueCoinContractAddress);
		   blueCoinContract.transferOwnership(_toAddress);
	}
	function fulfillRequest(
		bytes32 requestId,
		bytes memory response,
		bytes memory err
	) internal override {
		if (s_lastRequestId != requestId) {
			revert UnexpectedRequestID(requestId); //Check if request IDs match
		}
		//Update the contract's state variables with the response and any errors
		s_lastResponse = response;
		blueCoins = string(response);
		s_lastError = err;
	   
		//Convert string to uint and check for errors
		(uint256 convertedValue, bool conversionSuccess) = strToUint(blueCoins);
		if (conversionSuccess) {
			blueCoinsToMint = convertedValue;
			//Mint if More Than 0 BlueCoins
			if (blueCoinsToMint > 0){
				BlueCoinToken blueCoinContract = BlueCoinToken(blueCoinContractAddress);
				blueCoinsToMint *= 10**18;
				blueCoinContract.mint(mintersAddress, blueCoinsToMint);
			}
		}
		//Emit an event to log the response
		emit Response(requestId, blueCoins, s_lastResponse, s_lastError);
	}
	function withdraw() public onlyOwner {
		uint256 ownerBalance = address(this).balance;
		require(ownerBalance > 0, "Owner has no balance to withdraw");

		(bool sent,) = msg.sender.call{value: address(this).balance}("");
			require(sent, "Failed to send user balance back to the owner");
	}
}
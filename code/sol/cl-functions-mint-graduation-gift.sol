//SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import {FunctionsClient} from "@chainlink/contracts/src/v0.8/functions/v1_0_0/FunctionsClient.sol";
import {ConfirmedOwner} from "@chainlink/contracts/src/v0.8/shared/access/ConfirmedOwner.sol";
import {FunctionsRequest} from "@chainlink/contracts/src/v0.8/functions/v1_0_0/libraries/FunctionsRequest.sol";

interface GradGiftToken {
	function transferFrom(address, address, uint) external returns (bool); //from to amount
	function transfer(address, uint256) external returns (bool);
    function transferOwnership(address) external;
	function allowance(address, address) external returns (uint256); //owner, spender
	function balanceOf(address) external returns (uint256);
    function mint(address, uint256) external; //To , Amount
}
//5000000000000000 value in wei

contract FOFGraduationGiftMintCheckCLF is FunctionsClient, ConfirmedOwner {
	using FunctionsRequest for FunctionsRequest.Request;

	//State variables to store the last request ID, response, and error
	bytes32 public s_lastRequestId;
	bytes public s_lastResponse;
	bytes public s_lastError;
	uint32 gasLimit = 300000; //Callback gas limit
	bytes32 donID = 0x66756e2d617262697472756d2d7365706f6c69612d3100000000000000000000; //donID - Arbi Sep
	address private GradGiftTokenContractAddress = 0x0C9FC330cEa25d16871D7BD3294D10DC9d23b2a6;
	address public mintersAddress;
	string public ggMinted;
	uint256 public ggMintedConverted;
	uint64 mySubscriptionId = 62;

	error UnexpectedRequestID(bytes32 requestId);

	//Event that log buy operation
	event MintGraduationGift(address graduate);

    //Grad Gift Token Contract
    GradGiftToken GradGiftTokenContract = GradGiftToken(GradGiftTokenContractAddress);

	 //Fetch Graduation Gift Eligibility
	string source = 
		"const wallet = args[0];"
		"const tkn = args[1];"
		"const apiResponse = await Functions.makeHttpRequest({"
		"url: `https://fofrance.com/code/php/mint-gg-check.php?wallet=${wallet}`"
		"});"
		"if (apiResponse.error) {"
		"throw Error('Request failed');"
		"}"
		"const { data } = apiResponse;"
		"return Functions.encodeString(data.ggMinted);";

	//Event to log responses
	event Response(
		bytes32 indexed requestId,
		string ggMinted,
		bytes response,
		bytes err
	);

	//Arbi Sepolia Router
	address router = 0x234a5fb5Bd614a7AA2FfAB244D603abFA0Ac5C5C;
 
	constructor() FunctionsClient(router) ConfirmedOwner(msg.sender) {	}

	function checkGraduationGiftMint (string[] calldata _args) public payable{
		require(msg.value > 500000000000000, "Send .005 ETH to mint your Graduation Gift.");
		mintersAddress = msg.sender;
		//emit the event
		emit MintGraduationGift(msg.sender);
		sendRequest(mySubscriptionId, _args);
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
	function transferGGTokenMinterContractOwnership(address _toAddress) public onlyOwner{
		   GradGiftTokenContract.transferOwnership(_toAddress);
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
		ggMinted = string(response);
		s_lastError = err;
	   
		//Convert string to uint and check for errors
		(uint256 convertedValue, bool conversionSuccess) = strToUint(ggMinted);
		if (conversionSuccess) {
			ggMintedConverted = convertedValue;

			//Mint a GG token if GG Hasn't Been Minted
			if (ggMintedConverted < 1){
                GradGiftTokenContract.mint(mintersAddress, 1000000000000000000); 
			}
		}
		//Emit an event to log the response
		emit Response(requestId, ggMinted, s_lastResponse, s_lastError);
	}
	function withdraw() public onlyOwner {
		uint256 ownerBalance = address(this).balance;
		require(ownerBalance > 0, "Owner has no balance to withdraw");

		(bool sent,) = msg.sender.call{value: address(this).balance}("");
			require(sent, "Failed to send user balance back to the owner");
	}
}
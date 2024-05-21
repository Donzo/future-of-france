// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import {VRFConsumerBaseV2Plus} from "@chainlink/contracts/src/v0.8/vrf/dev/VRFConsumerBaseV2Plus.sol";
import {VRFV2PlusClient} from "@chainlink/contracts/src/v0.8/vrf/dev/libraries/VRFV2PlusClient.sol";

interface giftMinter {
    function setIMGURL(bool, bool, bool, bool, bool, bool, bool, bool, bool) external;
    function setValues (string memory, string memory, string memory, string memory) external; //_itemType, _material, _quality, _armorClass 
    function setDescription(string memory) external; //owner, spender
    function safeMint(address) external;
    function transferOwnership(address) external; //to
}

interface gradGiftToken {
	function transferFrom(address, address, uint) external returns (bool); //from to amount
	function transfer(address, uint256) external returns (bool);
}

contract FOFGraduationGiftMinterVRF is VRFConsumerBaseV2Plus {

    //Used to Set NFT Values Based on VRF Requests
	address public giftMinterContractAddress = 0x0794Cb70241A9D58Fee484529ddE714a9A3D2c6C;
    address public gradGiftTokenContractAddress = 0x0C9FC330cEa25d16871D7BD3294D10DC9d23b2a6;
    address public graduate;

   
    giftMinter giftMinterContract = giftMinter(giftMinterContractAddress);
    gradGiftToken gradGiftTokenContract = gradGiftToken(gradGiftTokenContractAddress);

   	event RequestFulfilled(uint256 requestId, address userAddress, uint256 randomNum1, uint256 randomNum2, uint256 randomNum3);
    
    uint256 subscriptionId = 24182996724671930902947298606122524986797109173711067921488041575674828116192;

    // Coordinator address for Arbitrum Sepolia (Ensure this is correct from Chainlink docs)
    address vrfCoordinator = 0x5CE8D5A2BC84beb22a398CCA51996F7930313D61;

    // Key Hash and Callback Gas Limit specific to the network and your needs
    bytes32 keyHash = 0x1770bdc7eec7771f7ba4ffd640f34260d7f095b79c92d34a5b2551d6f6cfd2be;
    uint32 callbackGasLimit = 2490000;
    uint256 public lastRequestID;
    uint16 requestConfirmations = 1;
    uint32 numWords =  3;

    //Mapped Random Numbers
	mapping(uint256 => uint256) public mapIdToWord1;
	mapping(uint256 => uint256) public mapIdToWord2;
	mapping(uint256 => uint256) public mapIdToWord3;
    mapping(uint256 => address) public mapIdToAddress; //Address to ID
	mapping(uint256 => bool) public mapIdToFulfilled; //Completion Status to ID

    string internal descSTR1;
    string public descSTR2;

    bool public lapelPin = false;
	bool public classRing = false;
	bool public medal = false;
	bool public platinum = false;
	bool public gold = false;
	bool public silver = false;
	bool public bronze = false;
	bool public copper = false;
	bool public brass = false;

    constructor() VRFConsumerBaseV2Plus(vrfCoordinator) {}

    function getGraduationGift(address _graduate) public {
        bool sT = false; //Successful Transfer
		sT = gradGiftTokenContract.transferFrom(msg.sender, address(this), 1000000000000000000);
		if (sT){
			graduate = _graduate;
		    requestRandomWords();
		}
        else{
            revert("You need to spend a Grad Gift token to mint a Graduation Gift NFT.");
        }
	}
    function requestRandomWords() internal returns (uint256 requestId) {
        // Requesting randomness
        requestId = s_vrfCoordinator.requestRandomWords(
            VRFV2PlusClient.RandomWordsRequest({
                keyHash: keyHash,
                subId: subscriptionId,
                requestConfirmations: requestConfirmations,
                callbackGasLimit: callbackGasLimit,
                numWords: numWords,
                // Set nativePayment to true to pay for VRF requests with Sepolia ETH instead of LINK
                extraArgs: VRFV2PlusClient._argsToBytes(VRFV2PlusClient.ExtraArgsV1({nativePayment: false}))
            })
        );
        lastRequestID = requestId;
        mapIdToAddress[requestId] = graduate;
		mapIdToFulfilled[requestId] = false;
    }
    function fulfillRandomWords(uint256 _requestId, uint256[] memory _randomWords) internal override {
		require(mapIdToFulfilled[_requestId] == false, 'request fulfilled already');
		mapIdToFulfilled[_requestId] = true;
		mapIdToWord1[_requestId] = (_randomWords[0] % 1000) + 1;
		mapIdToWord2[_requestId] = (_randomWords[1] % 1000) + 1; //Store it.
		mapIdToWord3[_requestId] = (_randomWords[2] % 1000) + 1;

        describeGift(mapIdToWord1[_requestId], mapIdToWord2[_requestId], mapIdToWord3[_requestId]);

		emit RequestFulfilled(_requestId, mapIdToAddress[_requestId], mapIdToWord1[_requestId], mapIdToWord2[_requestId], mapIdToWord3[_requestId]);
	}
    function describeGift(uint256 _adjectiveRandNum, uint256 _materialRandNum, uint256 _objectRandNum) internal {
        
        string memory adjSTR = "A corrosion resistant "; //Adjective String
        string memory matSTR = "copper ";
        string memory objSTR = "lapel pin.";

        lapelPin = false;
		classRing = false;
		medal = false;
		platinum = false;
		gold = false;
		silver = false;
		bronze = false;
		copper = false;
		brass = false;

        //Adjective Descriptors
        if (_adjectiveRandNum > 950){
            adjSTR = "A radiant ";
        }
        else if (_adjectiveRandNum > 850){
            adjSTR = "An ornate ";
        }
        else if (_adjectiveRandNum > 650){
            adjSTR = "A shimmering ";
        }
        else if (_adjectiveRandNum > 350){
            adjSTR = "A durable ";
        }

        //Material Descriptors
        if (_materialRandNum > 950){
            matSTR = "platinum ";
            platinum = true;
        }
        else if (_materialRandNum > 850){
            matSTR = "gold ";
            gold = true;
        }
        else if (_materialRandNum > 650){
            matSTR = "silver ";
            silver = true;
        }
        else if (_materialRandNum > 350){
            matSTR = "bronze ";
            bronze = true;
        }
        else if (_materialRandNum > 150){
            matSTR = "brass ";
            brass = true;
        }
        else{
            copper = true;
        }
         //Object Descriptors
        if (_objectRandNum > 750){
            objSTR = "class ring.";
            classRing = true;
        }
        else if (_objectRandNum > 500){
            objSTR = "medal.";
            medal = true;
        }
        else{
            lapelPin = true;
        }

        descSTR1 = string.concat(adjSTR, matSTR);
        descSTR2 = string.concat(descSTR1,objSTR);
        //giftDescription[_requestId] = descSTR2;

        //Set IMGURL
        giftMinterContract.setIMGURL(lapelPin, classRing, medal, platinum, gold, silver, bronze, copper, brass);
        //Set Description in NFT contract
        giftMinterContract.setDescription(descSTR2);
        //Mint the NFT
        giftMinterContract.safeMint(graduate);
    }
    //Change the Owner of the Giftminter Contract in Case of Redeploy
    function changeGiftMinterContractOwnership(address _newOwner) public onlyOwner{
        giftMinterContract.transferOwnership(_newOwner);
    }

}
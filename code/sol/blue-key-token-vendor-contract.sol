// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts@4.9.0/access/Ownable.sol";
import "@openzeppelin/contracts@4.9.0/security/ReentrancyGuard.sol";

interface FOFBlueKeyToken {
	function mint(address to, uint256 amount) external;
	function transferOwnership(address newOwner) external;
}

contract FOFBlueKeyTokenVendor is Ownable, ReentrancyGuard {
	FOFBlueKeyToken public fofBlueKeyTokenContract;
	address public fofBlueKeyTokenContractAddress;
	
	 //Address to which withdrawn funds should be sent
    address public constant faucetAddress = 0x006295696E67C5b65CF76F8Bc7AB28be54d3A36a;

	
	//Price of one Blue Key Token in wei
	uint256 public pricePerToken = 0.005 ether;

	//Event that logs buy operation
	event BuyTokens(address indexed buyer, uint256 amountOfETH, uint256 amountOfTokens);

	constructor(address _tokenAddress) {
		fofBlueKeyTokenContractAddress = _tokenAddress;
		fofBlueKeyTokenContract = FOFBlueKeyToken(_tokenAddress);
	}

	//Buy token for ETH
	
	function buyTokens() public payable nonReentrant {
		require(msg.value >= pricePerToken, "Insufficient ETH sent");

		uint256 amountToBuy = 1 * 10**18; // Calculate how many tokens to buy

		fofBlueKeyTokenContract.mint(msg.sender, amountToBuy);

		// Emit the event
		emit BuyTokens(msg.sender, msg.value, amountToBuy);
	}

	//Chainlink Keepers can call this function periodically to maintain the faucet.
	function triggerWithdrawal() public {
        uint256 contractBalance = address(this).balance;
        require(contractBalance > 0, "No funds to withdraw");

        _withdraw(faucetAddress, contractBalance);
    }

    function _withdraw(address recipient, uint256 amount) internal {
        (bool sent, ) = recipient.call{value: amount}("");
        require(sent, "Failed to send Ether");
    }

	//Transfer Blue Key Token in the event this contract needs to be redeployed.
	function transferBlueKeyTokenContractOwnership(address newOwner) public onlyOwner {
		fofBlueKeyTokenContract.transferOwnership(newOwner);
	}
}

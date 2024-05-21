//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

interface FOFBlueKeyToken {
    function balanceOf(address account) external view returns (uint256);
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    function transfer(address recipient, uint256 amount) external returns (bool);
}

contract FOFBlueKeyTokenHolderContract {
    FOFBlueKeyToken public fofBlueKeyTokenContract = FOFBlueKeyToken(0xa7807EC6Ab2E1cB00F9f24E705c9805C6582aC37);

    mapping(address => uint256) public fofTokenBalance;
    mapping(address => uint256) public fofTokensWithdrawn; //Mapping to track withdrawn tokens for game events

    event FofTokensDeposited(address indexed user, uint256 amount); //Check the token balance of a player in the contract
    event FofTokensWithdrawn(address indexed user, uint256 amount); //Retrieve the total amount of tokens a player has withdrawn

    //Deposit tokens into the contract
    function fofDepositTokens(uint256 amount) public {
        require(fofBlueKeyTokenContract.transferFrom(msg.sender, address(this), amount), "Transfer failed");
        fofTokenBalance[msg.sender] += amount;
        emit FofTokensDeposited(msg.sender, amount);
    }

    //Allow users to withdraw their tokens
    function fofWithdrawTokens(uint256 amount) public {
        require(fofTokenBalance[msg.sender] >= amount, "Insufficient balance");
        fofTokenBalance[msg.sender] -= amount;
        fofTokensWithdrawn[msg.sender] += amount; //Update the amount of withdrawn tokens
        require(fofBlueKeyTokenContract.transfer(msg.sender, amount), "Transfer failed");
        emit FofTokensWithdrawn(msg.sender, amount);
    }
}

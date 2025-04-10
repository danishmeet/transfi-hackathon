// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract Transfi {
    event Transfer(
        address indexed from,
        address indexed to,
        uint256 amount,
        string fiatCurrency,
        string message
    );

    constructor() payable {}

    function sendPayment(
        address payable recipient,
        string memory fiatCurrency,
        string memory message
    ) public payable {
        require(msg.value > 0, "Amount must be greater than 0");
        require(recipient != address(0), "Invalid recipient address");

        // Transfer ETH to the recipient
        recipient.transfer(msg.value);

        // Emit event for off-chain logging
        emit Transfer(msg.sender, recipient, msg.value, fiatCurrency, message);
    }

    // Optional: Get contract's ETH balance
    function getContractBalance() public view returns (uint256) {
        return address(this).balance;
    }
}

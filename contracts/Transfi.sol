// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract Transfi {
    address public owner;

    event Transfer(
        address indexed from,
        address indexed to,
        uint256 amount,
        string fiatCurrency,
        string message
    );

    constructor() {
        owner = msg.sender;
    }

    function sendPayment(
        address payable recipient,
        string memory fiatCurrency,
        string memory message
    ) public payable {
        require(msg.value > 0, "Amount must be greater than 0");
        recipient.transfer(msg.value);
        emit Transfer(msg.sender, recipient, msg.value, fiatCurrency, message);
    }

    function getContractBalance() public view returns (uint256) {
        return address(this).balance;
    }
}

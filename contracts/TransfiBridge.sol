// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

interface IERC20 {
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
}

contract TransfiBridge {
    /// @notice Emitted when a stablecoin transfer is initiated
    event TransferInitiated(address indexed sender, address indexed receiver, uint256 amount);

    /**
     * @notice Transfers stablecoin tokens from sender to a receiver
     * @param tokenAddress The address of the ERC20 token (e.g., USDC)
     * @param to The recipient's address
     * @param amount The amount to transfer
     */
    function transferStablecoin(address tokenAddress, address to, uint256 amount) external {
        require(tokenAddress != address(0), "Invalid token address");
        require(to != address(0), "Invalid receiver");
        require(to != address(this), "Receiver cannot be contract itself");
        require(amount > 0, "Amount must be greater than zero");

        bool success = IERC20(tokenAddress).transferFrom(msg.sender, to, amount);
        require(success, "Transfer failed");

        emit TransferInitiated(msg.sender, to, amount);
    }
}

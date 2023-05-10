# Balancer Integration

This project provides Solidity code for interacting with the Balancer decentralized exchange. The code includes functions for swapping tokens and adding/removing liquidity.

## Getting Started

1. Clone the repository.

2. Install the required dependencies:

   ```
   npm install
   ```

3. Compile the contracts:

   ```
   npx hardhat compile
   ```

4. Run the tests:

   ```
   npx hardhat test
   ```

## Usage

The main smart contract in this project is `BalancerInteract.sol`. This contract provides functions for swapping ETH for DAI and getting the spot price of ETH/DAI on the Balancer decentralized exchange.

To use this contract, you will need to provide the following parameters when deploying it:

- `_balancerPool`: The address of the Balancer pool that you want to interact with.

- `_dai`: The address of the DAI token.

- `_weth`: The address of the WETH token.

Once you have deployed the contract, you can call the `swapEthForDai` function to swap ETH for DAI on the Balancer decentralized exchange. This function takes a `daiAmount` parameter, which specifies how much DAI you want to receive in exchange for your ETH.

You can also call the `getSpotPrice` function to get the spot price of ETH/DAI on the Balancer decentralized exchange.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

pragma solidity ^0.7.3;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./interface/IBalancerPool.sol";
import "./interface/IWeth.sol";

contract BalancerInteract {
    IBalancerPool public balancerPool;
    IERC20 public dai;
    IWeth public weth;

    constructor(
        address _balancerPool,
        address _dai,
        address _weth
    ) {
        balancerPool = IBalancerPool(_balancerPool);
        dai = IERC20(_dai);
        weth = IWeth(_weth);
    }

    function swapEthForDai(uint256 daiAmount) external payable {
        weth.deposit{value: msg.value}();
        // considering 10% price slippage
        uint256 price = (110 *
            balancerPool.getSpotPrice(address(weth), address(dai))) / 100;
        uint256 wethAmount = price * daiAmount;
        weth.approve(address(balancerPool), wethAmount);
        balancerPool.swapExactAmountOut(
            address(weth),
            wethAmount,
            address(dai),
            daiAmount,
            price
        );

        dai.transfer(msg.sender, daiAmount);
        uint256 wethBalance = weth.balanceOf(address(this));
        if (wethBalance > 0) {
            msg.sender.transfer(address(this).balance);
        }
    }

    function getSpotPrice() external view returns (uint256) {
        return balancerPool.getSpotPrice(address(weth), address(dai));
    }
}

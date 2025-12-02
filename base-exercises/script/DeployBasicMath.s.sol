// SPDX-License-Identifier: MIT
pragma solidity ^0.8.25;

import "forge-std/Script.sol";
import "../src/00_BasicMath.sol";

contract DeployBasicMath is Script {
    function run() external returns (BasicMath) {
        vm.startBroadcast();
        BasicMath basicMath = new BasicMath();
        vm.stopBroadcast();
        return basicMath;
    }
}

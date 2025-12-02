// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

contract BasicMath {
    // Add two numbers.
    // On success: returns (sum, false)
    // On overflow: returns (0, true) and does NOT revert.
    function adder(
        uint _a,
        uint _b
    ) external pure returns (uint result, bool error) {
        unchecked {
            uint sum = _a + _b;

            // If sum wrapped around, we had an overflow.
            if (sum < _a) {
                return (0, true);
            }

            return (sum, false);
        }
    }

    // Subtract two numbers.
    // On success: returns (_a - _b, false)
    // If _b > _a (would underflow): returns (0, true) and does NOT revert.
    function subtractor(
        uint _a,
        uint _b
    ) external pure returns (uint result, bool error) {
        if (_b > _a) {
            // Underflow case
            return (0, true);
        }

        return (_a - _b, false);
    }
}

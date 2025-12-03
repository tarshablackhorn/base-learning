// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

contract ControlStructures {
    // -------------------------------------------------
    // FizzBuzz
    // -------------------------------------------------
    function fizzBuzz(uint _number) external pure returns (string memory) {
        if (_number % 15 == 0) {
            return "FizzBuzz";
        } else if (_number % 3 == 0) {
            return "Fizz";
        } else if (_number % 5 == 0) {
            return "Buzz";
        } else {
            return "Splat";
        }
    }

    // -------------------------------------------------
    // Do Not Disturb
    // -------------------------------------------------

    error AfterHours(uint time);

    function doNotDisturb(uint _time) external pure returns (string memory) {
        // PANIC: using assert(false)
        if (_time >= 2400) {
            assert(false); // triggers Panic(uint256)
        }

        // After hours: >2200 OR <800
        if (_time > 2200 || _time < 800) {
            revert AfterHours(_time);
        }

        // Lunch window: 1200–1259
        if (_time >= 1200 && _time <= 1259) {
            revert("At lunch!");
        }

        // Morning: 800–1199
        if (_time >= 800 && _time <= 1199) {
            return "Morning!";
        }

        // Afternoon: 1300–1799
        if (_time >= 1300 && _time <= 1799) {
            return "Afternoon!";
        }

        // Evening: 1800–2200
        if (_time >= 1800 && _time <= 2200) {
            return "Evening!";
        }

        // Should never hit here, but required for pure
        return "";
    }
}

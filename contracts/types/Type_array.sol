pragma solidity ^0.5.0;


contract Type_array
{
  uint[] public data;

  uint private testDummy = 1; // start with a non-zero value

  function count() public view returns (uint)
  {
    return data.length;
  }

  function write(uint value) public
  {
    data.push(value);
  }

  // Mutable functions to get a gas report on the cost

  function testReadCost(uint key) public
  {
    uint value = data[key];
    testDummy = value; // avoids view warning
  }

  function testCountCost() public
  {
    uint value = data.length;
    testDummy = value; // avoids view warning
  }
}
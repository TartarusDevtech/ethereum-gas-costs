pragma solidity ^0.5.0;


contract Type_mapping
{
  mapping(uint => uint) public data;
  uint public count;

  uint private testDummy = 1; // start with a non-zero value

  function write(uint value) public
  {
    data[count++] = value;
  }

  // Mutable functions to get a gas report on the cost

  function testReadCost(uint key) public
  {
    uint value = data[key];
    testDummy = value; // avoids view warning
  }

  function testCountCost() public
  {
    uint value = count;
    testDummy = value; // avoids view warning
  }
}
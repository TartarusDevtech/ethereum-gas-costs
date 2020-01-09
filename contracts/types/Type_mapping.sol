pragma solidity ^0.5.0;


contract Type_mapping
{
  mapping(uint => uint) public data;
  uint public count;

  function write(uint value) public
  {
    data[count++] = value;
  }

  // Mutable functions to get a gas report on the cost

  function testReadCost(uint key) public returns (uint)
  {
    return data[key];
  }

  function testCountCost() public returns (uint)
  {
    return count;
  }
}
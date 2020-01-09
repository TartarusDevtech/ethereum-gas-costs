pragma solidity ^0.5.0;


contract Type_mapOfMap
{
  mapping(uint => mapping(uint => uint)) public data;
  uint public count;

  function write(uint key, uint value) public
  {
    data[count++][key] = value;
  }

  // Mutable functions to get a gas report on the cost

  function testReadCost(uint key1, uint key2) public returns (uint)
  {
    return data[key1][key2];
  }

  function testCountCost() public returns (uint)
  {
    return count;
  }
}
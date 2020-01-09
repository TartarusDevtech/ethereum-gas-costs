pragma solidity ^0.5.0;


contract Type_array
{
  uint[] public data;

  function count() public view returns (uint)
  {
    return data.length;
  }

  function write(uint value) public
  {
    data.push(value);
  }

  // Mutable functions to get a gas report on the cost

  function testReadCost(uint key) public returns (uint)
  {
    return data[key];
  }

  function testCountCost() public returns (uint)
  {
    return data.length;
  }
}
pragma solidity ^0.5.0;


contract Type_uint
{
  uint8 public value_uint8;
  uint256 public value_uint256;

  function acceptParam_uint8(
    uint8 _value
  ) public {}

  function acceptParam_uint256(
    uint256 _value
  ) public {}

  function increment_uint8() public
  {
    value_uint8++;
  }

  function increment_uint256() public
  {
    value_uint256++;
  }
}
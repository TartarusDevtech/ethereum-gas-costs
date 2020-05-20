pragma solidity ^0.5.0;


contract Type_bool
{
  bool public value;

  function acceptParam(
    bool _value
  ) public {}

  function setTrue() public {
    value = true;
  }
  function setFalse() public {
    value = false;
  }
}

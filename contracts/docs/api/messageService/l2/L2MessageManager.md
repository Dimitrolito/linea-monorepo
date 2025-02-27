# Solidity API

## L2MessageManager

### L1_L2_MESSAGE_SETTER_ROLE

```solidity
bytes32 L1_L2_MESSAGE_SETTER_ROLE
```

The role required to anchor L1 to L2 message hashes.

### lastAnchoredL1MessageNumber

```solidity
uint256 lastAnchoredL1MessageNumber
```

Contains the last L1 message number anchored on L2.

### l1RollingHashes

```solidity
mapping(uint256 => bytes32) l1RollingHashes
```

Contains the L1 to L2 messaging rolling hashes mapped to message number computed on L2.

### anchorL1L2MessageHashes

```solidity
function anchorL1L2MessageHashes(bytes32[] _messageHashes, uint256 _startingMessageNumber, uint256 _finalMessageNumber, bytes32 _finalRollingHash) external
```

Add cross-chain L1->L2 message hashes in storage.

_Only address that has the role 'L1_L2_MESSAGE_SETTER_ROLE' are allowed to call this function.
NB: In the unlikely event of a duplicate anchoring, the lastAnchoredL1MessageNumber MUST NOT be incremented.
and the rolling hash not calculated, else synchronisation will break.
If starting number is zero, an underflow error is expected._

#### Parameters

| Name | Type | Description |
| ---- | ---- | ----------- |
| _messageHashes | bytes32[] | New message hashes to anchor on L2. |
| _startingMessageNumber | uint256 | The expected L1 message number to start when anchoring. |
| _finalMessageNumber | uint256 | The expected L1 message number to end on when anchoring. |
| _finalRollingHash | bytes32 | The expected L1 rolling hash to end on when anchoring. |


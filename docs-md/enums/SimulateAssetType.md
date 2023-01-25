[alchemy-sdk](../README.md) / [Exports](../modules.md) / SimulateAssetType

# Enumeration: SimulateAssetType

Asset type returned when calling [TransactNamespace.simulateAssetChanges](../classes/TransactNamespace.md#simulateassetchanges).
Allows you to determine if the assets approved or / and transferred are
native, tokens or NFTs.

## Table of contents

### Enumeration members

- [ERC1155](SimulateAssetType.md#erc1155)
- [ERC20](SimulateAssetType.md#erc20)
- [ERC721](SimulateAssetType.md#erc721)
- [NATIVE](SimulateAssetType.md#native)
- [SPECIAL\_NFT](SimulateAssetType.md#special_nft)

## Enumeration members

### ERC1155

• **ERC1155** = `"ERC1155"`

ERC1155 approval or transfers.

#### Defined in

[src/types/types.ts:1643](https://github.com/alchemyplatform/alchemy-sdk-js/blob/bed7d71/src/types/types.ts#L1643)

___

### ERC20

• **ERC20** = `"ERC20"`

ERC20 approval or transfers.

#### Defined in

[src/types/types.ts:1639](https://github.com/alchemyplatform/alchemy-sdk-js/blob/bed7d71/src/types/types.ts#L1639)

___

### ERC721

• **ERC721** = `"ERC721"`

ERC721 approval or transfers.

#### Defined in

[src/types/types.ts:1641](https://github.com/alchemyplatform/alchemy-sdk-js/blob/bed7d71/src/types/types.ts#L1641)

___

### NATIVE

• **NATIVE** = `"NATIVE"`

Native transfers that involve the currency of the chain the simulation is
run on (ex: ETH for Ethereum, MATIC for Polygon, ETH for Arbitrum).

#### Defined in

[src/types/types.ts:1637](https://github.com/alchemyplatform/alchemy-sdk-js/blob/bed7d71/src/types/types.ts#L1637)

___

### SPECIAL\_NFT

• **SPECIAL\_NFT** = `"SPECIAL_NFT"`

Special contracts that don't follow ERC 721/1155.Currently limited to
CryptoKitties and CryptoPunks.

#### Defined in

[src/types/types.ts:1648](https://github.com/alchemyplatform/alchemy-sdk-js/blob/bed7d71/src/types/types.ts#L1648)

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

[src/types/types.ts:1894](https://github.com/alchemyplatform/alchemy-sdk-js/blob/46e9716/src/types/types.ts#L1894)

___

### ERC20

• **ERC20** = `"ERC20"`

ERC20 approval or transfers.

#### Defined in

[src/types/types.ts:1890](https://github.com/alchemyplatform/alchemy-sdk-js/blob/46e9716/src/types/types.ts#L1890)

___

### ERC721

• **ERC721** = `"ERC721"`

ERC721 approval or transfers.

#### Defined in

[src/types/types.ts:1892](https://github.com/alchemyplatform/alchemy-sdk-js/blob/46e9716/src/types/types.ts#L1892)

___

### NATIVE

• **NATIVE** = `"NATIVE"`

Native transfers that involve the currency of the chain the simulation is
run on (ex: ETH for Ethereum, MATIC for Polygon, ETH for Arbitrum).

#### Defined in

[src/types/types.ts:1888](https://github.com/alchemyplatform/alchemy-sdk-js/blob/46e9716/src/types/types.ts#L1888)

___

### SPECIAL\_NFT

• **SPECIAL\_NFT** = `"SPECIAL_NFT"`

Special contracts that don't follow ERC 721/1155.Currently limited to
CryptoKitties and CryptoPunks.

#### Defined in

[src/types/types.ts:1899](https://github.com/alchemyplatform/alchemy-sdk-js/blob/46e9716/src/types/types.ts#L1899)

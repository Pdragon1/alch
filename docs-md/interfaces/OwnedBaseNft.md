[alchemy-sdk](../README.md) / [Exports](../modules.md) / OwnedBaseNft

# Interface: OwnedBaseNft

Represents an NFT without metadata owned by an address.

## Hierarchy

- [`BaseNft`](BaseNft.md)

  ↳ **`OwnedBaseNft`**

## Table of contents

### Properties

- [balance](OwnedBaseNft.md#balance)
- [contract](OwnedBaseNft.md#contract)
- [tokenId](OwnedBaseNft.md#tokenid)
- [tokenType](OwnedBaseNft.md#tokentype)

## Properties

### balance

• `Readonly` **balance**: `number`

The token balance of the NFT.

#### Defined in

[src/types/types.ts:630](https://github.com/alchemyplatform/alchemy-sdk-js/blob/5944626/src/types/types.ts#L630)

___

### contract

• **contract**: [`BaseNftContract`](BaseNftContract.md)

#### Inherited from

[BaseNft](BaseNft.md).[contract](BaseNft.md#contract)

#### Defined in

[src/api/nft.ts:35](https://github.com/alchemyplatform/alchemy-sdk-js/blob/5944626/src/api/nft.ts#L35)

___

### tokenId

• **tokenId**: `string`

The NFT token ID as an integer string.

#### Inherited from

[BaseNft](BaseNft.md).[tokenId](BaseNft.md#tokenid)

#### Defined in

[src/api/nft.ts:37](https://github.com/alchemyplatform/alchemy-sdk-js/blob/5944626/src/api/nft.ts#L37)

___

### tokenType

• **tokenType**: [`NftTokenType`](../enums/NftTokenType.md)

The type of ERC token, if known.

#### Inherited from

[BaseNft](BaseNft.md).[tokenType](BaseNft.md#tokentype)

#### Defined in

[src/api/nft.ts:39](https://github.com/alchemyplatform/alchemy-sdk-js/blob/5944626/src/api/nft.ts#L39)

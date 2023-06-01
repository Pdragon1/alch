[alchemy-sdk](../README.md) / [Exports](../modules.md) / Nft

# Interface: Nft

Alchemy representation of an NFT.

The BaseNft object does not hold any metadata information and only contains
the NFT contract and token ID. The Nft object additionally contains the NFT
metadata, token URI information, and media.

## Hierarchy

- **`Nft`**

  ↳ [`OwnedNft`](OwnedNft.md)

  ↳ [`TransferredNft`](TransferredNft.md)

## Table of contents

### Properties

- [acquiredAt](Nft.md#acquiredat)
- [contract](Nft.md#contract)
- [description](Nft.md#description)
- [image](Nft.md#image)
- [name](Nft.md#name)
- [raw](Nft.md#raw)
- [timeLastUpdated](Nft.md#timelastupdated)
- [tokenId](Nft.md#tokenid)
- [tokenType](Nft.md#tokentype)
- [tokenUri](Nft.md#tokenuri)

## Properties

### acquiredAt

• `Optional` **acquiredAt**: [`AcquiredAt`](AcquiredAt.md)

Time at which the NFT was most recently acquired by the user. Only
available when specifying `orderBy: NftOrdering.TRANSFERTIME` in the
request.

#### Defined in

[src/api/nft.ts:97](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c9dbbf0/src/api/nft.ts#L97)

___

### contract

• **contract**: `NftContractForNft`

The NFT's underlying contract and relevant contract metadata.

#### Defined in

[src/api/nft.ts:75](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c9dbbf0/src/api/nft.ts#L75)

___

### description

• `Optional` **description**: `string`

The NFT description.

#### Defined in

[src/api/nft.ts:83](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c9dbbf0/src/api/nft.ts#L83)

___

### image

• **image**: [`NftImage`](NftImage.md)

Media URLs and information for the NFT

#### Defined in

[src/api/nft.ts:85](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c9dbbf0/src/api/nft.ts#L85)

___

### name

• `Optional` **name**: `string`

The NFT name.

#### Defined in

[src/api/nft.ts:81](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c9dbbf0/src/api/nft.ts#L81)

___

### raw

• **raw**: `NftRawMetadata`

The raw metadata for the NFT based on the metadata URI on the NFT contract.

#### Defined in

[src/api/nft.ts:87](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c9dbbf0/src/api/nft.ts#L87)

___

### timeLastUpdated

• **timeLastUpdated**: `string`

When the NFT was last updated in the blockchain. Represented in ISO-8601 format.

#### Defined in

[src/api/nft.ts:91](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c9dbbf0/src/api/nft.ts#L91)

___

### tokenId

• **tokenId**: `string`

The NFT token ID as an integer string.

#### Defined in

[src/api/nft.ts:77](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c9dbbf0/src/api/nft.ts#L77)

___

### tokenType

• **tokenType**: [`NftTokenType`](../enums/NftTokenType.md)

The type of NFT.

#### Defined in

[src/api/nft.ts:79](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c9dbbf0/src/api/nft.ts#L79)

___

### tokenUri

• `Optional` **tokenUri**: `string`

URIs for accessing the NFT's metadata blob.

#### Defined in

[src/api/nft.ts:89](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c9dbbf0/src/api/nft.ts#L89)

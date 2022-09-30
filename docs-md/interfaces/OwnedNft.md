[alchemy-sdk](../README.md) / [Exports](../modules.md) / OwnedNft

# Interface: OwnedNft

Represents an NFT with metadata owned by an address.

## Hierarchy

- [`Nft`](Nft.md)

  ↳ **`OwnedNft`**

## Table of contents

### Properties

- [balance](OwnedNft.md#balance)
- [contract](OwnedNft.md#contract)
- [description](OwnedNft.md#description)
- [media](OwnedNft.md#media)
- [metadataError](OwnedNft.md#metadataerror)
- [rawMetadata](OwnedNft.md#rawmetadata)
- [timeLastUpdated](OwnedNft.md#timelastupdated)
- [title](OwnedNft.md#title)
- [tokenId](OwnedNft.md#tokenid)
- [tokenType](OwnedNft.md#tokentype)
- [tokenUri](OwnedNft.md#tokenuri)

## Properties

### balance

• `Readonly` **balance**: `number`

The token balance of the NFT.

#### Defined in

[src/types/types.ts:620](https://github.com/alchemyplatform/alchemy-sdk-js/blob/5944626/src/types/types.ts#L620)

___

### contract

• **contract**: [`NftContract`](NftContract.md)

The NFT's underlying contract and relevant contract metadata.

#### Inherited from

[Nft](Nft.md).[contract](Nft.md#contract)

#### Defined in

[src/api/nft.ts:49](https://github.com/alchemyplatform/alchemy-sdk-js/blob/5944626/src/api/nft.ts#L49)

___

### description

• **description**: `string`

The NFT description.

#### Inherited from

[Nft](Nft.md).[description](Nft.md#description)

#### Defined in

[src/api/nft.ts:55](https://github.com/alchemyplatform/alchemy-sdk-js/blob/5944626/src/api/nft.ts#L55)

___

### media

• **media**: [`Media`](Media.md)[]

URIs for accessing the NFT's media assets.

#### Inherited from

[Nft](Nft.md).[media](Nft.md#media)

#### Defined in

[src/api/nft.ts:73](https://github.com/alchemyplatform/alchemy-sdk-js/blob/5944626/src/api/nft.ts#L73)

___

### metadataError

• **metadataError**: `undefined` \| `string`

Holds an error message if there was an issue fetching metadata.

#### Inherited from

[Nft](Nft.md).[metadataError](Nft.md#metadataerror)

#### Defined in

[src/api/nft.ts:61](https://github.com/alchemyplatform/alchemy-sdk-js/blob/5944626/src/api/nft.ts#L61)

___

### rawMetadata

• **rawMetadata**: `undefined` \| [`NftMetadata`](NftMetadata.md)

The raw metadata fetched from the metadata URL specified by the NFT. The
field is undefined if Alchemy was unable to fetch metadata.

#### Inherited from

[Nft](Nft.md).[rawMetadata](Nft.md#rawmetadata)

#### Defined in

[src/api/nft.ts:67](https://github.com/alchemyplatform/alchemy-sdk-js/blob/5944626/src/api/nft.ts#L67)

___

### timeLastUpdated

• **timeLastUpdated**: `string`

When the NFT was last updated in the blockchain. Represented in ISO-8601 format.

#### Inherited from

[Nft](Nft.md).[timeLastUpdated](Nft.md#timelastupdated)

#### Defined in

[src/api/nft.ts:58](https://github.com/alchemyplatform/alchemy-sdk-js/blob/5944626/src/api/nft.ts#L58)

___

### title

• **title**: `string`

The NFT title.

#### Inherited from

[Nft](Nft.md).[title](Nft.md#title)

#### Defined in

[src/api/nft.ts:52](https://github.com/alchemyplatform/alchemy-sdk-js/blob/5944626/src/api/nft.ts#L52)

___

### tokenId

• **tokenId**: `string`

The NFT token ID as an integer string.

#### Inherited from

[Nft](Nft.md).[tokenId](Nft.md#tokenid)

#### Defined in

[src/api/nft.ts:37](https://github.com/alchemyplatform/alchemy-sdk-js/blob/5944626/src/api/nft.ts#L37)

___

### tokenType

• **tokenType**: [`NftTokenType`](../enums/NftTokenType.md)

The type of ERC token, if known.

#### Inherited from

[Nft](Nft.md).[tokenType](Nft.md#tokentype)

#### Defined in

[src/api/nft.ts:39](https://github.com/alchemyplatform/alchemy-sdk-js/blob/5944626/src/api/nft.ts#L39)

___

### tokenUri

• **tokenUri**: `undefined` \| [`TokenUri`](TokenUri.md)

URIs for accessing the NFT's metadata blob.

#### Inherited from

[Nft](Nft.md).[tokenUri](Nft.md#tokenuri)

#### Defined in

[src/api/nft.ts:70](https://github.com/alchemyplatform/alchemy-sdk-js/blob/5944626/src/api/nft.ts#L70)

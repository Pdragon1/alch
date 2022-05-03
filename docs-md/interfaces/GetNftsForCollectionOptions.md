[alchemy-evm-js](../README.md) / [Exports](../modules.md) / GetNftsForCollectionOptions

# Interface: GetNftsForCollectionOptions

Optional parameters object for the [getNftsForCollection](../modules.md#getnftsforcollection) and
[getNftsForCollectionIterator](../modules.md#getnftsforcollectioniterator) functions.

This interface is used to fetch NFTs with their associated metadata. To get
Nfts without their associated metadata, use [GetBaseNftsForCollectionOptions](GetBaseNftsForCollectionOptions.md).

## Table of contents

### Properties

- [omitMetadata](GetNftsForCollectionOptions.md#omitmetadata)
- [pageKey](GetNftsForCollectionOptions.md#pagekey)

## Properties

### omitMetadata

• `Optional` **omitMetadata**: `boolean`

Optional boolean flag to omit NFT metadata. Defaults to `false`.

#### Defined in

[types/types.ts:362](https://github.com/alchemyplatform/exploring-pioneer/blob/53a912f/src/types/types.ts#L362)

___

### pageKey

• `Optional` **pageKey**: `string`

Optional page key from an existing [CollectionBaseNftsResponse](CollectionBaseNftsResponse.md) or
[CollectionNftsResponse](CollectionNftsResponse.md)to use for pagination.

#### Defined in

[types/types.ts:359](https://github.com/alchemyplatform/exploring-pioneer/blob/53a912f/src/types/types.ts#L359)

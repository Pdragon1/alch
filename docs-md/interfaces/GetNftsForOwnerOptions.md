[alchemy-sdk](../README.md) / [Exports](../modules.md) / GetNftsForOwnerOptions

# Interface: GetNftsForOwnerOptions

Optional parameters object for the [getNftsForOwner](../classes/NftNamespace.md#getnftsforowner) and
[getNftsForOwnerIterator](../classes/NftNamespace.md#getnftsforowneriterator) functions.

This interface is used to fetch NFTs with their associated metadata. To get
Nfts without their associated metadata, use [GetBaseNftsForOwnerOptions](GetBaseNftsForOwnerOptions.md).

## Table of contents

### Properties

- [contractAddresses](GetNftsForOwnerOptions.md#contractaddresses)
- [excludeFilters](GetNftsForOwnerOptions.md#excludefilters)
- [omitMetadata](GetNftsForOwnerOptions.md#omitmetadata)
- [pageKey](GetNftsForOwnerOptions.md#pagekey)
- [pageSize](GetNftsForOwnerOptions.md#pagesize)
- [tokenUriTimeoutInMs](GetNftsForOwnerOptions.md#tokenuritimeoutinms)

## Properties

### contractAddresses

• `Optional` **contractAddresses**: `string`[]

Optional list of contract addresses to filter the results by. Limit is 20.

#### Defined in

[src/types/types.ts:429](https://github.com/alchemyplatform/alchemy-sdk-js/blob/145ea50/src/types/types.ts#L429)

___

### excludeFilters

• `Optional` **excludeFilters**: [`SPAM`](../enums/NftExcludeFilters.md#spam)[]

Optional list of filters applied to the query. NFTs that match one or more
of these filters are excluded from the response.

#### Defined in

[src/types/types.ts:435](https://github.com/alchemyplatform/alchemy-sdk-js/blob/145ea50/src/types/types.ts#L435)

___

### omitMetadata

• `Optional` **omitMetadata**: `boolean`

Optional boolean flag to omit NFT metadata. Defaults to `false`.

#### Defined in

[src/types/types.ts:444](https://github.com/alchemyplatform/alchemy-sdk-js/blob/145ea50/src/types/types.ts#L444)

___

### pageKey

• `Optional` **pageKey**: `string`

Optional page key from an existing [OwnedBaseNftsResponse](OwnedBaseNftsResponse.md) or
[OwnedNftsResponse](OwnedNftsResponse.md)to use for pagination.

#### Defined in

[src/types/types.ts:426](https://github.com/alchemyplatform/alchemy-sdk-js/blob/145ea50/src/types/types.ts#L426)

___

### pageSize

• `Optional` **pageSize**: `number`

Sets the total number of NFTs to return in the response. Defaults to 100.
Maximum page size is 100.

#### Defined in

[src/types/types.ts:441](https://github.com/alchemyplatform/alchemy-sdk-js/blob/145ea50/src/types/types.ts#L441)

___

### tokenUriTimeoutInMs

• `Optional` **tokenUriTimeoutInMs**: `number`

No set timeout by default - When metadata is requested, this parameter is
the timeout (in milliseconds) for the website hosting the metadata to
respond. If you want to only access the cache and not live fetch any
metadata for cache misses then set this value to 0.

#### Defined in

[src/types/types.ts:452](https://github.com/alchemyplatform/alchemy-sdk-js/blob/145ea50/src/types/types.ts#L452)

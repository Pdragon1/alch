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
- [includeFilters](GetNftsForOwnerOptions.md#includefilters)
- [omitMetadata](GetNftsForOwnerOptions.md#omitmetadata)
- [orderBy](GetNftsForOwnerOptions.md#orderby)
- [pageKey](GetNftsForOwnerOptions.md#pagekey)
- [pageSize](GetNftsForOwnerOptions.md#pagesize)
- [tokenUriTimeoutInMs](GetNftsForOwnerOptions.md#tokenuritimeoutinms)

## Properties

### contractAddresses

• `Optional` **contractAddresses**: `string`[]

Optional list of contract addresses to filter the results by. Limit is 20.

#### Defined in

[src/types/types.ts:629](https://github.com/alchemyplatform/alchemy-sdk-js/blob/ee5b9ee/src/types/types.ts#L629)

___

### excludeFilters

• `Optional` **excludeFilters**: [`NftFilters`](../enums/NftFilters.md)[]

Optional list of filters applied to the query. NFTs that match one or more
of these filters are excluded from the response.

#### Defined in

[src/types/types.ts:635](https://github.com/alchemyplatform/alchemy-sdk-js/blob/ee5b9ee/src/types/types.ts#L635)

___

### includeFilters

• `Optional` **includeFilters**: [`NftFilters`](../enums/NftFilters.md)[]

Optional list of filters applied to the query. NFTs that match one or more
of these filters are included in the response.

#### Defined in

[src/types/types.ts:641](https://github.com/alchemyplatform/alchemy-sdk-js/blob/ee5b9ee/src/types/types.ts#L641)

___

### omitMetadata

• `Optional` **omitMetadata**: `boolean`

Optional boolean flag to omit NFT metadata. Defaults to `false`.

#### Defined in

[src/types/types.ts:650](https://github.com/alchemyplatform/alchemy-sdk-js/blob/ee5b9ee/src/types/types.ts#L650)

___

### orderBy

• `Optional` **orderBy**: [`TRANSFERTIME`](../enums/NftOrdering.md#transfertime)

Order in which to return results. By default, results are ordered by
contract address and token ID in lexicographic order.

#### Defined in

[src/types/types.ts:664](https://github.com/alchemyplatform/alchemy-sdk-js/blob/ee5b9ee/src/types/types.ts#L664)

___

### pageKey

• `Optional` **pageKey**: `string`

Optional page key from an existing [OwnedBaseNftsResponse](OwnedBaseNftsResponse.md) or
[OwnedNftsResponse](OwnedNftsResponse.md)to use for pagination.

#### Defined in

[src/types/types.ts:626](https://github.com/alchemyplatform/alchemy-sdk-js/blob/ee5b9ee/src/types/types.ts#L626)

___

### pageSize

• `Optional` **pageSize**: `number`

Sets the total number of NFTs to return in the response. Defaults to 100.
Maximum page size is 100.

#### Defined in

[src/types/types.ts:647](https://github.com/alchemyplatform/alchemy-sdk-js/blob/ee5b9ee/src/types/types.ts#L647)

___

### tokenUriTimeoutInMs

• `Optional` **tokenUriTimeoutInMs**: `number`

No set timeout by default - When metadata is requested, this parameter is
the timeout (in milliseconds) for the website hosting the metadata to
respond. If you want to only access the cache and not live fetch any
metadata for cache misses then set this value to 0.

#### Defined in

[src/types/types.ts:658](https://github.com/alchemyplatform/alchemy-sdk-js/blob/ee5b9ee/src/types/types.ts#L658)

[alchemy-sdk](../README.md) / [Exports](../modules.md) / NftContractBaseNftsResponse

# Interface: NftContractBaseNftsResponse

The response object for the [getNftsForContract](../classes/NftNamespace.md#getnftsforcontract) function. The object
contains the NFTs without metadata inside the NFT contract.

## Table of contents

### Properties

- [nfts](NftContractBaseNftsResponse.md#nfts)
- [pageKey](NftContractBaseNftsResponse.md#pagekey)

## Properties

### nfts

• **nfts**: [`BaseNft`](BaseNft.md)[]

An array of NFTs without metadata.

#### Defined in

[src/types/types.ts:1027](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c3fdebb/src/types/types.ts#L1027)

___

### pageKey

• `Optional` **pageKey**: `string`

Pagination token that can be passed into another request to fetch the next
NFTs. If there is no page key, then there are no more NFTs to fetch.

#### Defined in

[src/types/types.ts:1033](https://github.com/alchemyplatform/alchemy-sdk-js/blob/c3fdebb/src/types/types.ts#L1033)

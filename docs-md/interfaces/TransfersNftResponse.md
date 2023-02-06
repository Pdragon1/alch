[alchemy-sdk](../README.md) / [Exports](../modules.md) / TransfersNftResponse

# Interface: TransfersNftResponse

Response object for NFT methods that fetch NFTs that were transferred or
minted (ex: [NftNamespace.getTransfersForOwner](../classes/NftNamespace.md#gettransfersforowner) or
[NftNamespace.getMintedNfts](../classes/NftNamespace.md#getmintednfts)).

## Table of contents

### Properties

- [nfts](TransfersNftResponse.md#nfts)
- [pageKey](TransfersNftResponse.md#pagekey)

## Properties

### nfts

• **nfts**: [`TransferredNft`](TransferredNft.md)[]

An array of NFTs.

#### Defined in

[src/types/types.ts:1100](https://github.com/alchemyplatform/alchemy-sdk-js/blob/a8bc079/src/types/types.ts#L1100)

___

### pageKey

• `Optional` **pageKey**: `string`

Optional page key to use to fetch the next group of NFTs.

#### Defined in

[src/types/types.ts:1102](https://github.com/alchemyplatform/alchemy-sdk-js/blob/a8bc079/src/types/types.ts#L1102)

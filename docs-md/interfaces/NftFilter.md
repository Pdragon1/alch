[alchemy-sdk](../README.md) / [Exports](../modules.md) / NftFilter

# Interface: NftFilter

NFT to track on a [NftActivityWebhook](NftActivityWebhook.md).

## Table of contents

### Properties

- [contractAddress](NftFilter.md#contractaddress)
- [tokenId](NftFilter.md#tokenid)

## Properties

### contractAddress

• **contractAddress**: `string`

The contract address of the NFT.

#### Defined in

[src/types/types.ts:2141](https://github.com/alchemyplatform/alchemy-sdk-js/blob/dc20ee4/src/types/types.ts#L2141)

___

### tokenId

• `Optional` **tokenId**: `BigNumberish`

The token id of the NFT to track. If this field is omitted, defaults to
tracking all NFTs for the provided contract address.

#### Defined in

[src/types/types.ts:2146](https://github.com/alchemyplatform/alchemy-sdk-js/blob/dc20ee4/src/types/types.ts#L2146)

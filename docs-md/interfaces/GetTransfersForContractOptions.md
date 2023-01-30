[alchemy-sdk](../README.md) / [Exports](../modules.md) / GetTransfersForContractOptions

# Interface: GetTransfersForContractOptions

Optional parameters object for the [NftNamespace.getTransfersForOwner](../classes/NftNamespace.md#gettransfersforowner)
method.

## Table of contents

### Properties

- [fromBlock](GetTransfersForContractOptions.md#fromblock)
- [order](GetTransfersForContractOptions.md#order)
- [pageKey](GetTransfersForContractOptions.md#pagekey)
- [toBlock](GetTransfersForContractOptions.md#toblock)

## Properties

### fromBlock

• `Optional` **fromBlock**: `BlockTag`

Starting block (inclusive) to get transfers from.

#### Defined in

[src/types/types.ts:1004](https://github.com/alchemyplatform/alchemy-sdk-js/blob/dc20ee4/src/types/types.ts#L1004)

___

### order

• `Optional` **order**: [`SortingOrder`](../enums/SortingOrder.md)

Whether to return results in ascending or descending order by block number.
Defaults to ascending if omitted.

#### Defined in

[src/types/types.ts:1011](https://github.com/alchemyplatform/alchemy-sdk-js/blob/dc20ee4/src/types/types.ts#L1011)

___

### pageKey

• `Optional` **pageKey**: `string`

Optional page key from an existing [TransfersNftResponse](TransfersNftResponse.md) to use for
pagination.

#### Defined in

[src/types/types.ts:1016](https://github.com/alchemyplatform/alchemy-sdk-js/blob/dc20ee4/src/types/types.ts#L1016)

___

### toBlock

• `Optional` **toBlock**: `BlockTag`

Ending block (inclusive) to get transfers from.

#### Defined in

[src/types/types.ts:1006](https://github.com/alchemyplatform/alchemy-sdk-js/blob/dc20ee4/src/types/types.ts#L1006)

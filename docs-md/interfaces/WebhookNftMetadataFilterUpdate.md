[alchemy-sdk](../README.md) / [Exports](../modules.md) / WebhookNftMetadataFilterUpdate

# Interface: WebhookNftMetadataFilterUpdate

Params object when calling [NotifyNamespace.updateWebhook](../classes/NotifyNamespace.md#updatewebhook) to add and
remove NFT filters for a [NftMetadataUpdateWebhook](NftMetadataUpdateWebhook.md).

## Table of contents

### Properties

- [addMetadataFilters](WebhookNftMetadataFilterUpdate.md#addmetadatafilters)
- [removeMetadataFilters](WebhookNftMetadataFilterUpdate.md#removemetadatafilters)

## Properties

### addMetadataFilters

• **addMetadataFilters**: [`NftFilter`](NftFilter.md)[]

The filters to additionally track.

#### Defined in

[src/types/types.ts:2400](https://github.com/alchemyplatform/alchemy-sdk-js/blob/e05babb/src/types/types.ts#L2400)

___

### removeMetadataFilters

• **removeMetadataFilters**: [`NftFilter`](NftFilter.md)[]

Existing filters to remove.

#### Defined in

[src/types/types.ts:2402](https://github.com/alchemyplatform/alchemy-sdk-js/blob/e05babb/src/types/types.ts#L2402)

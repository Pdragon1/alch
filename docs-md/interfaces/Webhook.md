[alchemy-sdk](../README.md) / [Exports](../modules.md) / Webhook

# Interface: Webhook

SDK representation of a Webhook in the Notify API.

## Hierarchy

- **`Webhook`**

  ↳ [`MinedTransactionWebhook`](MinedTransactionWebhook.md)

  ↳ [`DroppedTransactionWebhook`](DroppedTransactionWebhook.md)

  ↳ [`AddressActivityWebhook`](AddressActivityWebhook.md)

  ↳ [`NftActivityWebhook`](NftActivityWebhook.md)

  ↳ [`NftMetadataUpdateWebhook`](NftMetadataUpdateWebhook.md)

  ↳ [`CustomGraphqlWebhook`](CustomGraphqlWebhook.md)

## Table of contents

### Properties

- [appId](Webhook.md#appid)
- [id](Webhook.md#id)
- [isActive](Webhook.md#isactive)
- [network](Webhook.md#network)
- [signingKey](Webhook.md#signingkey)
- [timeCreated](Webhook.md#timecreated)
- [type](Webhook.md#type)
- [url](Webhook.md#url)
- [version](Webhook.md#version)

## Properties

### appId

• `Optional` **appId**: `string`

The app id of the app used for the webhook. This field is only present on
[MinedTransactionWebhook](MinedTransactionWebhook.md) and [DroppedTransactionWebhook](DroppedTransactionWebhook.md)

#### Defined in

[src/types/types.ts:2172](https://github.com/alchemyplatform/alchemy-sdk-js/blob/4483414/src/types/types.ts#L2172)

___

### id

• **id**: `string`

The webhook's unique id.

#### Defined in

[src/types/types.ts:2153](https://github.com/alchemyplatform/alchemy-sdk-js/blob/4483414/src/types/types.ts#L2153)

___

### isActive

• **isActive**: `boolean`

Whether the webhook is currently active

#### Defined in

[src/types/types.ts:2161](https://github.com/alchemyplatform/alchemy-sdk-js/blob/4483414/src/types/types.ts#L2161)

___

### network

• **network**: [`Network`](../enums/Network.md)

The network the webhook is on.

#### Defined in

[src/types/types.ts:2155](https://github.com/alchemyplatform/alchemy-sdk-js/blob/4483414/src/types/types.ts#L2155)

___

### signingKey

• **signingKey**: `string`

The signing key used to verify payloads for the webhook.

#### Defined in

[src/types/types.ts:2165](https://github.com/alchemyplatform/alchemy-sdk-js/blob/4483414/src/types/types.ts#L2165)

___

### timeCreated

• **timeCreated**: `string`

The creation time of the webhook as an ISO string.

#### Defined in

[src/types/types.ts:2163](https://github.com/alchemyplatform/alchemy-sdk-js/blob/4483414/src/types/types.ts#L2163)

___

### type

• **type**: [`WebhookType`](../enums/WebhookType.md)

The type of webhook.

#### Defined in

[src/types/types.ts:2157](https://github.com/alchemyplatform/alchemy-sdk-js/blob/4483414/src/types/types.ts#L2157)

___

### url

• **url**: `string`

The url that the webhook sends its payload to.

#### Defined in

[src/types/types.ts:2159](https://github.com/alchemyplatform/alchemy-sdk-js/blob/4483414/src/types/types.ts#L2159)

___

### version

• **version**: [`WebhookVersion`](../enums/WebhookVersion.md)

The webhook version. All newly created webhooks default to V2.

#### Defined in

[src/types/types.ts:2167](https://github.com/alchemyplatform/alchemy-sdk-js/blob/4483414/src/types/types.ts#L2167)

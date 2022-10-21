[alchemy-sdk](../README.md) / [Exports](../modules.md) / DroppedTransactionWebhook

# Interface: DroppedTransactionWebhook

A Dropped Transaction webhook is used to notify your app whenever a
transaction sent through your API key gets dropped. This can be useful if you
want to notify customers that their transactions were dropped.

## Hierarchy

- [`Webhook`](Webhook.md)

  ↳ **`DroppedTransactionWebhook`**

## Table of contents

### Properties

- [appId](DroppedTransactionWebhook.md#appid)
- [id](DroppedTransactionWebhook.md#id)
- [isActive](DroppedTransactionWebhook.md#isactive)
- [network](DroppedTransactionWebhook.md#network)
- [signingKey](DroppedTransactionWebhook.md#signingkey)
- [timeCreated](DroppedTransactionWebhook.md#timecreated)
- [type](DroppedTransactionWebhook.md#type)
- [url](DroppedTransactionWebhook.md#url)
- [version](DroppedTransactionWebhook.md#version)

## Properties

### appId

• `Optional` **appId**: `string`

The app id of the app used for the webhook. This field is only present on
[MinedTransactionWebhook](MinedTransactionWebhook.md) and [DroppedTransactionWebhook](DroppedTransactionWebhook.md)

#### Inherited from

[Webhook](Webhook.md).[appId](Webhook.md#appid)

#### Defined in

[src/types/types.ts:1224](https://github.com/alchemyplatform/alchemy-sdk-js/blob/3091a11/src/types/types.ts#L1224)

___

### id

• **id**: `string`

The webhook's unique id.

#### Inherited from

[Webhook](Webhook.md).[id](Webhook.md#id)

#### Defined in

[src/types/types.ts:1205](https://github.com/alchemyplatform/alchemy-sdk-js/blob/3091a11/src/types/types.ts#L1205)

___

### isActive

• **isActive**: `boolean`

Whether the webhook is currently active

#### Inherited from

[Webhook](Webhook.md).[isActive](Webhook.md#isactive)

#### Defined in

[src/types/types.ts:1213](https://github.com/alchemyplatform/alchemy-sdk-js/blob/3091a11/src/types/types.ts#L1213)

___

### network

• **network**: [`Network`](../enums/Network.md)

The network the webhook is on.

#### Inherited from

[Webhook](Webhook.md).[network](Webhook.md#network)

#### Defined in

[src/types/types.ts:1207](https://github.com/alchemyplatform/alchemy-sdk-js/blob/3091a11/src/types/types.ts#L1207)

___

### signingKey

• **signingKey**: `string`

The signing key used to verify payloads for the webhook.

#### Inherited from

[Webhook](Webhook.md).[signingKey](Webhook.md#signingkey)

#### Defined in

[src/types/types.ts:1217](https://github.com/alchemyplatform/alchemy-sdk-js/blob/3091a11/src/types/types.ts#L1217)

___

### timeCreated

• **timeCreated**: `string`

The creation time of the webhook as an ISO string.

#### Inherited from

[Webhook](Webhook.md).[timeCreated](Webhook.md#timecreated)

#### Defined in

[src/types/types.ts:1215](https://github.com/alchemyplatform/alchemy-sdk-js/blob/3091a11/src/types/types.ts#L1215)

___

### type

• **type**: [`DROPPED_TRANSACTION`](../enums/WebhookType.md#dropped_transaction)

The type of webhook.

#### Overrides

[Webhook](Webhook.md).[type](Webhook.md#type)

#### Defined in

[src/types/types.ts:1256](https://github.com/alchemyplatform/alchemy-sdk-js/blob/3091a11/src/types/types.ts#L1256)

___

### url

• **url**: `string`

The url that the webhook sends its payload to.

#### Inherited from

[Webhook](Webhook.md).[url](Webhook.md#url)

#### Defined in

[src/types/types.ts:1211](https://github.com/alchemyplatform/alchemy-sdk-js/blob/3091a11/src/types/types.ts#L1211)

___

### version

• **version**: [`WebhookVersion`](../enums/WebhookVersion.md)

The webhook version. All newly created webhooks default to V2.

#### Inherited from

[Webhook](Webhook.md).[version](Webhook.md#version)

#### Defined in

[src/types/types.ts:1219](https://github.com/alchemyplatform/alchemy-sdk-js/blob/3091a11/src/types/types.ts#L1219)

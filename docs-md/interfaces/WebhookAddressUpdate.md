[alchemy-sdk](../README.md) / [Exports](../modules.md) / WebhookAddressUpdate

# Interface: WebhookAddressUpdate

Params object when calling [NotifyNamespace.updateWebhook](../classes/NotifyNamespace.md#updatewebhook) to add and
remove addresses for a [AddressActivityWebhook](AddressActivityWebhook.md).

## Table of contents

### Properties

- [addAddresses](WebhookAddressUpdate.md#addaddresses)
- [removeAddresses](WebhookAddressUpdate.md#removeaddresses)

## Properties

### addAddresses

• **addAddresses**: `string`[]

The addresses to additionally track.

#### Defined in

[src/types/types.ts:2411](https://github.com/alchemyplatform/alchemy-sdk-js/blob/8dc500a/src/types/types.ts#L2411)

___

### removeAddresses

• **removeAddresses**: `string`[]

Existing addresses to remove.

#### Defined in

[src/types/types.ts:2413](https://github.com/alchemyplatform/alchemy-sdk-js/blob/8dc500a/src/types/types.ts#L2413)

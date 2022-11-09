import {
  Alchemy,
  GasOptimizedTransactionStatus,
  Network,
  Wallet
} from '../../src';
import { TESTING_PRIVATE_KEY, loadAlchemyEnv } from '../test-util';

jest.setTimeout(50000);
describe('E2E integration tests', () => {
  let alchemy: Alchemy;

  beforeAll(async () => {
    await loadAlchemyEnv();
    alchemy = await new Alchemy({
      apiKey: process.env.ALCHEMY_API_KEY,
      network: Network.ETH_MAINNET
    });
  });

  it('sendPrivateTransaction()', async () => {
    const transaction = {
      to: '0xa238b6008Bc2FBd9E386A5d4784511980cE504Cd',
      // Use random number to allow back to back runs.
      value: Math.floor(Math.random() * 10000),
      nonce: 2,
      type: 2,
      chainId: 5
    };

    const wallet = new Wallet(TESTING_PRIVATE_KEY);
    const signed = await wallet.signTransaction(transaction);
    const response = await alchemy.transact.sendPrivateTransaction(signed);
    expect(typeof response).toEqual('string');
  });

  describe('sendGasOptimizedTransaction()', () => {
    it('can send signed transactions', async () => {
      const response = await alchemy.transact.sendGasOptimizedTransaction([
        '0x02f86f0107847735940085174876e8008252089415fdad99a4b0c72fc5c2761542e1b17cff7357de843b9aca0080c080a0db73b4c108202f2a0d22d8836ccb2052b24aaffbcbd8222e2030d0b8d68c3218a01ec636ff8a3a6125ba524d72348e91c96be5ac8330eadab31e70e753fbe00236'
      ]);
      const tx = await alchemy.transact.getTransaction(
        response.transactionHashes[0]
      );
      expect(tx).toBeDefined();
    });

    it('can send a raw transaction', async () => {
      const transaction = {
        to: '0xa238b6008Bc2FBd9E386A5d4784511980cE504Cd',
        value: 10000,
        nonce: 2,
        type: 2,
        chainId: 5
      };

      const wallet = new Wallet(TESTING_PRIVATE_KEY);
      const response = await alchemy.transact.sendGasOptimizedTransaction(
        transaction,
        wallet
      );
      expect(typeof response.trackingId).toEqual('string');
      expect(response.transactionHashes.length).toEqual(5);
    });
  });

  describe('getGasOptimizedTransactionStatus()', () => {
    it('can get the transaction state', async () => {
      const response = await alchemy.transact.sendGasOptimizedTransaction([
        '0x02f86f0107847735940085174876e8008252089415fdad99a4b0c72fc5c2761542e1b17cff7357de843b9aca0080c080a0db73b4c108202f2a0d22d8836ccb2052b24aaffbcbd8222e2030d0b8d68c3218a01ec636ff8a3a6125ba524d72348e91c96be5ac8330eadab31e70e753fbe00236'
      ]);

      const response2 = await alchemy.transact.getGasOptimizedTransactionStatus(
        response.trackingId
      );
      expect(
        Object.values(GasOptimizedTransactionStatus).includes(
          response2.jobStatus
        )
      ).toBe(true);
      expect(typeof response2.minedTransactionHash).toEqual('string');
    });
  });
});

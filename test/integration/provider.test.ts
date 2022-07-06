import { initializeAlchemy } from '../../src';
import { EthersNetwork } from '../../src/util/const';
import { AlchemyProvider } from '@ethersproject/providers';

/**
 * These integrations are sanity checks to ensure that the SDK's overriden
 * implementation of {@link AlchemyProvider} is working as expected.
 */
// TODO(ethers): Figure out appropriate unit tests for the SDK's custom AlchemyProvider.
describe('AlchemyProvider', () => {
  const alchemy = initializeAlchemy();
  const ethersProvider = new AlchemyProvider(
    EthersNetwork[alchemy.network],
    alchemy.apiKey
  ) as AlchemyProvider;

  const wsProvider = alchemy.getWebsocketProvider();
  const provider = alchemy.getProvider();

  // TODO(ethers): Extract into helper method to verify all inputs.
  it('methods should return the same result', async () => {
    const expected = await ethersProvider.send('eth_getBalance', [
      '0xc94770007dda54cF92009BFF0dE90c06F603a09f',
      'latest'
    ]);
    const actual = await provider.send('eth_getBalance', [
      '0xc94770007dda54cF92009BFF0dE90c06F603a09f',
      'latest'
    ]);
    expect(actual).toEqual(expected);
  });

  // TODO(wss): Add unit test coverage for websocket provider.
  it('filtered transactions', done => {
    let eventCount = 0;
    const address = '0xdAC17F958D2ee523a2206206994597C13D831ec7';
    wsProvider.on(
      {
        method: 'alchemy_filteredNewFullPendingTransactions',
        address
      },
      res => {
        expect(res.to).toEqual(address.toLowerCase());
        if (eventCount === 10) {
          done();
        }
        eventCount++;
      }
    );
  });

  it('can send normal json-rpc methods', async () => {
    const res = await wsProvider.getBlockNumber();
    expect(typeof res).toBe('number');
  });

  it('full transactions', done => {
    let eventCount = 0;
    wsProvider.on(
      {
        method: 'alchemy_newFullPendingTransactions'
      },
      msg => {
        console.log('message', msg);
        if (eventCount === 10) {
          done();
        }
        eventCount++;
      }
    );
  });

  it('handles blocks', done => {
    let eventCount = 0;
    ethersProvider.on('block', res => {
      console.log('block from ethers', res);
    });
    wsProvider.on('block', res => {
      console.log('block from provider', res);
      if (eventCount == 10) {
        done();
      }
      eventCount++;
    });
  });

  // TODO(ethers): Write tests to make sure that the SDK's provider instance
  // has the correct network mappings compared to Ethers.
  it('network mappings should be correct', () => {});
});

import {
  CollectionBaseNftsResponse,
  CollectionNftsResponse,
  fromHex,
  getNftMetadata,
  getNfts,
  getNftsForCollection,
  getNftsPaginated,
  getOwnersForToken,
  initializeAlchemy,
  Nft,
  NftTokenType,
  OwnedBaseNft,
  OwnedBaseNftsResponse,
  OwnedNft,
  OwnedNftsResponse,
  toHex
} from '../src';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { Alchemy } from '../src/api/alchemy';
import {
  createBaseNft,
  createNft,
  createOwnedBaseNft,
  createOwnedNft,
  createRawCollectionBaseNft,
  createRawNft,
  createRawOwnedBaseNft,
  createRawOwnedNft
} from './test-util';
import {
  RawGetBaseNftsForCollectionResponse,
  RawGetBaseNftsResponse,
  RawGetNftsForCollectionResponse,
  RawGetNftsResponse
} from '../src/internal/raw-interfaces';

describe('NFT module', () => {
  let alchemy: Alchemy;
  let mock: MockAdapter;

  beforeAll(async () => {
    alchemy = await initializeAlchemy();
    mock = new MockAdapter(axios);

    // Skip all timeouts for testing.
    jest.useFakeTimers();
    jest.spyOn(global, 'setTimeout').mockImplementation((f: any) => f());
  });

  afterEach(() => {
    mock.reset();
  });

  describe('getNftMetadata()', () => {
    const contractAddress = '0xABC';
    const tokenId = 42;
    // Special case token ID as an integer string, since that's what the NFT
    // API endpoint returns.
    const rawNftResponse = createRawNft(contractAddress, tokenId.toString());
    const expectedNft = Nft.fromResponse(rawNftResponse, contractAddress);

    beforeEach(() => {
      mock.onGet().reply(200, rawNftResponse);
    });

    function verifyNftMetadata(
      actualNft: Nft,
      expectedNft: Nft,
      contractAddress: string,
      tokenId: number,
      tokenType?: NftTokenType
    ) {
      expect(actualNft).toEqual(expectedNft);
      expect(actualNft.tokenId).toEqual(toHex(tokenId));
      expect(mock.history.get.length).toEqual(1);
      expect(mock.history.get[0].params).toHaveProperty(
        'contractAddress',
        contractAddress
      );
      expect(mock.history.get[0].params).toHaveProperty(
        'tokenId',
        toHex(tokenId)
      );
      expect(mock.history.get[0].params).toHaveProperty(
        'tokenType',
        tokenType ?? undefined
      );
    }

    it('can be called with a BaseNft', async () => {
      const nft = createBaseNft(
        contractAddress,
        toHex(tokenId),
        NftTokenType.ERC721
      );
      verifyNftMetadata(
        await getNftMetadata(alchemy, nft),
        expectedNft,
        contractAddress,
        tokenId,
        NftTokenType.ERC721
      );
    });

    it('can be called with raw parameters', async () => {
      verifyNftMetadata(
        await getNftMetadata(
          alchemy,
          contractAddress,
          tokenId,
          NftTokenType.ERC1155
        ),
        expectedNft,
        contractAddress,
        tokenId,
        NftTokenType.ERC1155
      );
    });

    it('normalizes tokenId as a hex string', async () => {
      verifyNftMetadata(
        await getNftMetadata(
          alchemy,
          contractAddress,
          toHex(tokenId),
          NftTokenType.ERC1155
        ),
        expectedNft,
        contractAddress,
        tokenId,
        NftTokenType.ERC1155
      );
    });

    it('sets tokenType to undefined if tokenType is UNKNOWN', async () => {
      verifyNftMetadata(
        await getNftMetadata(
          alchemy,
          contractAddress,
          toHex(tokenId),
          NftTokenType.UNKNOWN
        ),
        expectedNft,
        contractAddress,
        tokenId
      );
    });

    it('surfaces errors', async () => {
      mock.reset();
      mock.onGet().reply(500, { message: 'Internal Server Error' });
      await expect(
        getNftMetadata(alchemy, contractAddress, tokenId)
      ).rejects.toThrow('Internal Server Error');
    });
  });

  describe('getNfts()', () => {
    const ownerAddress = '0xABC';
    const pageKey = 'page-key0';
    const contractAddresses = ['0xCA1', '0xCA2'];
    const getNftsParams = {
      owner: ownerAddress,
      pageKey,
      contractAddresses
    };
    const baseNftResponse: RawGetBaseNftsResponse = {
      ownedNfts: [
        createRawOwnedBaseNft('0xCA1', '0x1', '1'),
        createRawOwnedBaseNft('0xCA2', '0x2', '2', NftTokenType.ERC721)
      ],
      pageKey: 'page-key1',
      totalCount: 3
    };

    const nftResponse: RawGetNftsResponse = {
      ownedNfts: [
        createRawOwnedNft('a', '0xCA1', '0x1', '1'),
        createRawOwnedNft('b', '0xCA2', '0x2', '2', NftTokenType.ERC1155)
      ],
      pageKey: 'page-key1',
      totalCount: 3
    };

    const withMetadata = [
      [true, true],
      [false, false],
      [undefined, true]
    ];
    it.each(withMetadata)(
      'called with the correct parameters',
      async (withMetadata, expected) => {
        mock.onGet().reply(200, nftResponse);
        await getNfts(alchemy, {
          ...getNftsParams,
          withMetadata
        });
        expect(mock.history.get.length).toEqual(1);
        expect(mock.history.get[0].params).toHaveProperty(
          'owner',
          ownerAddress
        );
        expect(mock.history.get[0].params).toHaveProperty(
          'contractAddresses',
          contractAddresses
        );
        expect(mock.history.get[0].params).toHaveProperty('pageKey', pageKey);
        expect(mock.history.get[0].params).toHaveProperty(
          'withMetadata',
          expected
        );
      }
    );

    const baseExpected: OwnedBaseNftsResponse = {
      ownedNfts: [
        createOwnedBaseNft('0xCA1', '0x1', 1),
        createOwnedBaseNft('0xCA2', '0x2', 2, NftTokenType.ERC721)
      ],
      pageKey: 'page-key1',
      totalCount: 3
    };
    const nftExpected: OwnedNftsResponse = {
      ownedNfts: [
        createOwnedNft('a', '0xCA1', '0x1', 1),
        createOwnedNft('b', '0xCA2', '0x2', 2, NftTokenType.ERC1155)
      ],
      pageKey: 'page-key1',
      totalCount: 3
    };
    const responseCases: Array<
      [
        boolean,
        RawGetBaseNftsResponse | RawGetNftsResponse,
        OwnedBaseNftsResponse | OwnedNftsResponse
      ]
    > = [
      [false, baseNftResponse, baseExpected],
      [true, nftResponse, nftExpected]
    ];
    it.each(responseCases)(
      'normalizes fields in response',
      async (withMetadata, rawResponse, expected) => {
        mock.onGet().reply(200, rawResponse);
        const response = await getNfts(alchemy, {
          ...getNftsParams,
          withMetadata
        });
        expect(response).toEqual(expected);
      }
    );

    it.each(responseCases)('surfaces errors', async withMetadata => {
      mock.reset();
      mock.onGet().reply(500, { message: 'Internal Server Error' });
      await expect(
        getNfts(alchemy, { ...getNftsParams, withMetadata })
      ).rejects.toThrow('Internal Server Error');
    });
  });

  describe('getNftsPaginated()', () => {
    const ownerAddress = '0xABC';
    const contractAddresses = ['0xCA1', '0xCA2'];
    const baseResponses: RawGetBaseNftsResponse[] = [
      {
        ownedNfts: [
          createRawOwnedBaseNft('0xCA1', '0x1', '1'),
          createRawOwnedBaseNft('0xCA2', '0x2', '2', NftTokenType.ERC721)
        ],
        pageKey: 'page-key1',
        totalCount: 3
      },
      {
        ownedNfts: [
          createRawOwnedBaseNft('0xCA2', '0x3', '1', NftTokenType.ERC721)
        ],
        totalCount: 3
      }
    ];
    const nftResponses: RawGetNftsResponse[] = [
      {
        ownedNfts: [
          createRawOwnedNft('a', '0xCA1', '0x1', '1'),
          createRawOwnedNft('b', '0xCA2', '0x2', '2', NftTokenType.ERC1155)
        ],
        pageKey: 'page-key1',
        totalCount: 3
      },
      {
        ownedNfts: [
          createRawOwnedNft('c', '0xCA2', '0x3', '1', NftTokenType.ERC1155)
        ],
        totalCount: 3
      }
    ];

    function setupMock(
      mockResponses: RawGetBaseNftsResponse[] | RawGetNftsResponse[]
    ): void {
      mock
        .onGet()
        .replyOnce(200, mockResponses[0])
        .onGet()
        .replyOnce(200, mockResponses[1]);
    }

    const paramCases: Array<
      [
        RawGetBaseNftsResponse[] | RawGetNftsResponse[],
        boolean | undefined,
        boolean
      ]
    > = [
      [baseResponses, false, false],
      [nftResponses, true, true],
      [nftResponses, undefined, true]
    ];
    it.each(paramCases)(
      'traverses all page keys and uses correct parameters',
      async (mockResponses, withMetadata, expectedWithMetadata) => {
        setupMock(mockResponses);
        const ownedNfts = [];
        for await (const ownedNft of getNftsPaginated(alchemy, {
          owner: ownerAddress,
          contractAddresses,
          withMetadata
        })) {
          ownedNfts.push(ownedNft);
        }

        expect(mock.history.get.length).toEqual(2);
        expect(mock.history.get[0].params).not.toHaveProperty('pageKey');
        expect(mock.history.get[0].params).toHaveProperty(
          'owner',
          ownerAddress
        );
        expect(mock.history.get[0].params).toHaveProperty(
          'contractAddresses',
          contractAddresses
        );
        expect(mock.history.get[0].params).toHaveProperty(
          'withMetadata',
          expectedWithMetadata
        );
        expect(mock.history.get[1].params).toHaveProperty(
          'pageKey',
          'page-key1'
        );
        expect(mock.history.get[1].params).toHaveProperty(
          'owner',
          ownerAddress
        );
        expect(mock.history.get[1].params).toHaveProperty(
          'contractAddresses',
          contractAddresses
        );
        expect(mock.history.get[1].params).toHaveProperty(
          'withMetadata',
          expectedWithMetadata
        );
      }
    );

    it.each(paramCases)(
      'can paginate starting from a given page key',
      async (mockResponses, withMetadata) => {
        setupMock(mockResponses);
        const ownedNfts = [];
        for await (const ownedNft of getNftsPaginated(alchemy, {
          owner: ownerAddress,
          pageKey: 'page-key0',
          withMetadata
        })) {
          ownedNfts.push(ownedNft);
        }

        expect(mock.history.get.length).toEqual(2);
        expect(mock.history.get[0].params).toHaveProperty(
          'pageKey',
          'page-key0'
        );
        expect(mock.history.get[1].params).toHaveProperty(
          'pageKey',
          'page-key1'
        );
      }
    );

    const baseExpected = [
      createOwnedBaseNft('0xCA1', '0x1', 1),
      createOwnedBaseNft('0xCA2', '0x2', 2, NftTokenType.ERC721),
      createOwnedBaseNft('0xCA2', '0x3', 1, NftTokenType.ERC721)
    ];
    const nftExpected = [
      createOwnedNft('a', '0xCA1', '0x1', 1),
      createOwnedNft('b', '0xCA2', '0x2', 2, NftTokenType.ERC1155),
      createOwnedNft('c', '0xCA2', '0x3', 1, NftTokenType.ERC1155)
    ];
    const responseCases: Array<
      [
        boolean,
        RawGetBaseNftsResponse[] | RawGetNftsResponse[],
        OwnedBaseNft[] | OwnedNft[]
      ]
    > = [
      [false, baseResponses, baseExpected],
      [true, nftResponses, nftExpected]
    ];
    it.each(responseCases)(
      'normalizes responses',
      async (withMetadata, mockResponses, expected) => {
        setupMock(mockResponses);
        const nfts = [];
        for await (const ownedNft of getNftsPaginated(alchemy, {
          owner: ownerAddress,
          contractAddresses,
          withMetadata
        })) {
          nfts.push(ownedNft);
        }

        expect(nfts).toEqual(expected);
      }
    );

    it.each(responseCases)(
      'yields NFTs until an error is thrown',
      async (withMetadata, mockResponses) => {
        mock
          .onGet()
          .replyOnce(200, mockResponses[0])
          .onGet()
          .replyOnce(500, { message: 'Internal Server Error' });

        const tokenIds: number[] = [];
        try {
          for await (const ownedNft of getNftsPaginated(alchemy, {
            owner: ownerAddress,
            withMetadata
          })) {
            tokenIds.push(fromHex(ownedNft.nft.tokenId));
          }
          fail('getNftsPaginated should have surfaced error');
        } catch (e) {
          expect(tokenIds).toEqual([1, 2]);
          expect((e as Error).message).toContain('Internal Server Error');
        }
      }
    );
  });

  describe('getNftsForCollection()', () => {
    const contractAddress = '0xCA1';
    const pageKey = 'page-key0';
    const baseResponse: RawGetBaseNftsForCollectionResponse = {
      nfts: [
        createRawCollectionBaseNft('0x1'),
        createRawCollectionBaseNft('0x2')
      ],
      nextToken: 'page-key1'
    };

    const nftResponse: RawGetNftsForCollectionResponse = {
      nfts: [
        createRawNft('a', '0x1', NftTokenType.ERC1155),
        createRawNft('b', '0x2', NftTokenType.ERC1155)
      ],
      nextToken: 'page-key1'
    };

    beforeEach(() => {
      mock.onGet().reply(200, baseResponse);
    });

    const paramCases: Array<
      [
        RawGetBaseNftsForCollectionResponse | RawGetNftsForCollectionResponse,
        boolean | undefined,
        boolean
      ]
    > = [
      [baseResponse, false, false],
      [nftResponse, true, true],
      [nftResponse, undefined, true]
    ];
    it.each(paramCases)(
      'called with the correct parameters',
      async (mockResponse, withMetadata, expectedWithMetadata) => {
        mock.onGet().reply(200, mockResponse);
        await getNftsForCollection(alchemy, {
          contractAddress,
          pageKey,
          withMetadata
        });
        expect(mock.history.get.length).toEqual(1);
        expect(mock.history.get[0].params).toHaveProperty(
          'contractAddress',
          contractAddress
        );
        expect(mock.history.get[0].params).toHaveProperty(
          'startToken',
          pageKey
        );
        expect(mock.history.get[0].params).toHaveProperty(
          'withMetadata',
          expectedWithMetadata
        );
      }
    );

    const baseExpected: CollectionBaseNftsResponse = {
      nfts: [createBaseNft('0xCA1', '0x1'), createBaseNft('0xCA1', '0x2')],
      pageKey: 'page-key1'
    };
    const nftExpected: CollectionNftsResponse = {
      nfts: [
        createNft('a', '0xCA1', '0x1', NftTokenType.ERC1155),
        createNft('b', '0xCA1', '0x2', NftTokenType.ERC1155)
      ],
      pageKey: 'page-key1'
    };
    const responseCases: Array<
      [
        boolean,
        RawGetBaseNftsForCollectionResponse | RawGetNftsForCollectionResponse,
        CollectionBaseNftsResponse | CollectionNftsResponse
      ]
    > = [
      [false, baseResponse, baseExpected],
      [true, nftResponse, nftExpected]
    ];
    it.each(responseCases)(
      'normalizes responses',
      async (withMetadata, mockResponse, expected) => {
        mock.onGet().reply(200, mockResponse);
        const response = await getNftsForCollection(alchemy, {
          contractAddress,
          pageKey,
          withMetadata
        });
        expect(response).toEqual(expected);
      }
    );

    it.each(responseCases)('surfaces errors', async withMetadata => {
      mock.reset();
      mock.onGet().reply(500, { message: 'Internal Server Error' });
      await expect(
        getNftsForCollection(alchemy, {
          contractAddress,
          withMetadata
        })
      ).rejects.toThrow('Internal Server Error');
    });
  });

  describe('getOwnersForToken()', () => {
    const contractAddress = '0xCA1';
    const tokenIdHex = '0x1b7';
    const tokenIdNumber = 439;
    const owners = ['0x1', '0x2', '0x3'];

    beforeEach(() => {
      mock.onGet().reply(200, {
        owners
      });
    });

    it('calls with the correct parameters', async () => {
      await getOwnersForToken(alchemy, contractAddress, tokenIdHex);
      expect(mock.history.get.length).toEqual(1);
      expect(mock.history.get[0].params).toHaveProperty(
        'contractAddress',
        contractAddress
      );
      expect(mock.history.get[0].params).toHaveProperty(
        'tokenId',
        toHex(tokenIdNumber)
      );

      await getOwnersForToken(alchemy, contractAddress, tokenIdNumber);
      expect(mock.history.get[0].params).toHaveProperty(
        'tokenId',
        toHex(tokenIdNumber)
      );
    });

    it('can be called with BaseNft', async () => {
      const response = await getOwnersForToken(
        alchemy,
        createBaseNft(contractAddress, tokenIdHex)
      );
      expect(mock.history.get.length).toEqual(1);
      expect(mock.history.get[0].params).toHaveProperty(
        'contractAddress',
        contractAddress
      );
      expect(mock.history.get[0].params).toHaveProperty(
        'tokenId',
        toHex(tokenIdNumber)
      );

      expect(response).toEqual({ owners });
    });

    it('retries with maxAttempts', async () => {
      mock.reset();
      mock.onGet().reply(429, { message: 'Too many requests' });

      await expect(
        getOwnersForToken(alchemy, contractAddress, tokenIdHex)
      ).rejects.toThrow('Too many requests');
    });
  });
});

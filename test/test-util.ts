import {
  RawBaseNft,
  RawCollectionBaseNft,
  RawNft,
  RawOwnedBaseNft,
  RawOwnedNft
} from '../src/internal/raw-interfaces';
import {
  BaseNft,
  Nft,
  NftTokenType,
  OwnedBaseNft,
  OwnedNft,
  toHex
} from '../src';

export function createRawOwnedBaseNft(
  address: string,
  tokenId: string,
  balance: string,
  tokenType?: NftTokenType
): RawOwnedBaseNft {
  const response: RawOwnedBaseNft = {
    balance,
    contract: {
      address
    },
    id: {
      tokenId
    }
  };
  if (tokenType) {
    response.id.tokenMetadata = { tokenType };
  }
  return response;
}

export function createOwnedBaseNft(
  address: string,
  tokenId: string,
  balance: number,
  tokenType = NftTokenType.UNKNOWN
): OwnedBaseNft {
  return {
    nft: new BaseNft(address, tokenId, tokenType),
    balance
  };
}

export function createRawBaseNft(
  tokenId: string,
  tokenType = NftTokenType.UNKNOWN
): RawBaseNft {
  return {
    id: {
      tokenId,
      tokenMetadata: { tokenType }
    }
  };
}

export function createBaseNft(
  address: string,
  tokenId: number,
  tokenType = NftTokenType.UNKNOWN
): BaseNft {
  return new BaseNft(address, toHex(tokenId), tokenType);
}

export function createNft(
  title: string,
  address: string,
  tokenId: string,
  tokenType = NftTokenType.UNKNOWN
): Nft {
  return Nft.fromResponse(createRawNft(title, tokenId, tokenType), address);
}

export function createRawNft(
  title: string,
  tokenId: string,
  tokenType = NftTokenType.UNKNOWN
): RawNft {
  return {
    title,
    description: `a truly unique NFT: ${title}`,
    timeLastUpdated: '2022-02-16T17:12:00.280Z',
    id: {
      tokenId,
      tokenMetadata: {
        tokenType
      }
    }
  };
}

export function createRawOwnedNft(
  title: string,
  address: string,
  tokenId: string,
  balance: string,
  tokenType = NftTokenType.UNKNOWN
): RawOwnedNft {
  return {
    ...createRawNft(title, tokenId, tokenType),
    contract: {
      address
    },
    id: {
      tokenId,
      tokenMetadata: {
        tokenType
      }
    },
    balance
  };
}

export function createOwnedNft(
  title: string,
  address: string,
  tokenId: string,
  balance: number,
  tokenType = NftTokenType.UNKNOWN
): OwnedNft {
  return {
    nft: createNft(title, address, tokenId, tokenType),
    balance
  };
}

export function createRawCollectionBaseNft(
  tokenId: string
): RawCollectionBaseNft {
  return {
    id: {
      tokenId
    }
  };
}

import { NftMetadata, NftTokenType, TokenUri } from '../types/types';
import { RawBaseNft, RawNft } from '../internal/raw-interfaces';
import { BigNumber } from 'ethers';

/**
 * Represents an NFT contract.
 *
 * @public
 */
export interface NftContract {
  /** The NFT contract address. */
  address: string;
}

/**
 * Alchemy representation of a base NFT that doesn't contain metadata.
 *
 * @public
 */
export class BaseNft {
  readonly contract: NftContract;

  /**
   * This constructor should never be called directly. All Nft instances should
   * be created from a backend response via the `fromResponse` method.
   */
  protected constructor(
    address: string,
    /** The NFT token ID as a hex string */
    readonly tokenId: string,
    /** The type of ERC token, if known. */
    readonly tokenType: NftTokenType
  ) {
    this.contract = { address };
  }

  /** @internal */
  static fromResponse(ownedNft: RawBaseNft, contractAddress: string): BaseNft {
    return new BaseNft(
      contractAddress,
      // We have to normalize the token id here since the backend sometimes
      // returns the token ID as a hex string and sometimes as an integer.
      normalizeTokenIdToHex(ownedNft.id.tokenId),
      ownedNft.id.tokenMetadata?.tokenType ?? NftTokenType.UNKNOWN
    );
  }
}

/**
 * Alchemy representation of an NFT.
 *
 * @public
 */
export class Nft extends BaseNft {
  /** The NFT title. */
  readonly title: string;

  /** The NFT description. */
  readonly description: string;

  /** When the NFT was last updated in the blockchain. Represented in ISO-8601 format. */
  readonly timeLastUpdated: string;

  /** Holds an error message if there was an issue fetching metadata. */
  readonly metadataError: string | undefined;

  /**
   * The raw metadata fetched from the metadata URL specified by the NFT. The
   * field is undefined if Alchemy was unable to fetch metadata.
   */
  readonly rawMetadata: NftMetadata | undefined;

  /** URIs for accessing the NFT's metadata blob. */
  readonly tokenUri: TokenUri | undefined;

  /** URIs for accessing the NFT's media assets. */
  readonly media: TokenUri[] = [];

  /**
   * This constructor should never be called directly. All Nft instances should
   * be created from a backend response via the `fromResponse` method.
   *
   * @internal
   */
  private constructor(
    address: string,
    tokenId: string,
    tokenType: NftTokenType,
    title: string,
    description: string,
    timeLastUpdated: string,
    tokenUri?: TokenUri,
    media?: TokenUri[],
    metadata?: NftMetadata,
    error?: string
  ) {
    super(address, tokenId, tokenType);
    this.title = title;
    this.description = description;
    this.timeLastUpdated = timeLastUpdated;
    this.metadataError = error;
    this.rawMetadata = metadata;
    this.tokenUri = Nft.parseTokenUri(tokenUri);
    this.media = Nft.parseTokenUriArray(media);
  }

  /** @internal */
  static fromResponse(ownedNft: RawNft, contractAddress: string): Nft {
    return new Nft(
      contractAddress,
      // We have to normalize the token id here since the backend sometimes
      // returns the token ID as a hex string and sometimes as an integer.
      normalizeTokenIdToHex(ownedNft.id.tokenId),
      ownedNft.id.tokenMetadata?.tokenType ?? NftTokenType.UNKNOWN,
      ownedNft.title,
      ownedNft.description,
      ownedNft.timeLastUpdated,
      ownedNft.tokenUri,
      ownedNft.media,
      ownedNft.metadata,
      ownedNft.error
    );
  }

  /**
   * Returns undefined if the uri has empty string fields.
   *
   * @internal
   */
  private static parseTokenUri(
    uri: TokenUri | undefined
  ): TokenUri | undefined {
    if (uri && uri.raw.length === 0 && uri.gateway.length == 0) {
      return undefined;
    }
    return uri;
  }

  /**
   * Removes empty URIs from the array.
   *
   * @internal
   */
  private static parseTokenUriArray(arr: TokenUri[] | undefined): TokenUri[] {
    if (arr === undefined) {
      return [];
    }
    return arr.filter(uri => this.parseTokenUri(uri) !== undefined);
  }
}

/**
 * Helper method that returns the token ID input as hex string.
 *
 * @param tokenId The token ID as an integer or hex string.
 * @internal
 */
export function normalizeTokenIdToHex(tokenId: string | number): string {
  return BigNumber.from(tokenId).toHexString();
}

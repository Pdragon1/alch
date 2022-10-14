import {
  EventType,
  TransactionReceipt
} from '@ethersproject/abstract-provider';
import { BaseNft, Nft } from '../api/nft';

// TODO: separate this file into other files.

/**
 * Options object used to configure the Alchemy SDK.
 *
 * @public
 */
export interface AlchemySettings {
  /** The Alchemy API key that can be found in the Alchemy dashboard. */
  apiKey?: string;

  /**
   * The name of the network. Once configured, the network cannot be changed. To
   * use a different network, instantiate a new `Alchemy` instance
   */
  network?: Network;

  /** The maximum number of retries to attempt if a request fails. Defaults to 5. */
  maxRetries?: number;

  /**
   * Optional URL endpoint to use for all requests. Setting this field will
   * override the URL generated by the {@link network} and {@link apiKey} fields.
   *
   * This field is useful for testing or for using a custom node endpoint. Note
   * that not all methods will work with custom URLs.
   */
  url?: string;

  /**
   * Alchemy auth token required to use the Notify API. This token can be found
   * in the Alchemy Dashboard on the Notify tab.
   */
  notifyAuthToken?: string;
}

/**
 * The supported networks by Alchemy. Note that some functions are not available
 * on all networks. Please refer to the Alchemy documentation for which APIs are
 * available on which networks
 * {@link https://docs.alchemy.com/alchemy/apis/feature-support-by-chain}
 *
 * @public
 */
export enum Network {
  ETH_MAINNET = 'eth-mainnet',
  /** @deprecated - Will be removed in subsequent versions */
  ETH_ROPSTEN = 'eth-ropsten',
  ETH_GOERLI = 'eth-goerli',
  /** @deprecated - Will be removed in subsequent versions */
  ETH_KOVAN = 'eth-kovan',
  /** @deprecated - Will be removed in subsequent versions */
  ETH_RINKEBY = 'eth-rinkeby',
  OPT_MAINNET = 'opt-mainnet',
  /** @deprecated - Will be removed in subsequent versions */
  OPT_KOVAN = 'opt-kovan',
  OPT_GOERLI = 'opt-goerli',
  ARB_MAINNET = 'arb-mainnet',
  /** @deprecated - Will be removed in subsequent versions */
  ARB_RINKEBY = 'arb-rinkeby',
  ARB_GOERLI = 'arb-goerli',
  MATIC_MAINNET = 'polygon-mainnet',
  MATIC_MUMBAI = 'polygon-mumbai',
  ASTAR_MAINNET = 'astar-mainnet'
}

/** Token Types for the `getTokenBalances()` endpoint. */
export enum TokenBalanceType {
  /**
   * Option to fetch the top 100 tokens by 24-hour volume. This option is only
   * available on Mainnet in Ethereum, Polygon, and Arbitrum.
   */
  DEFAULT_TOKENS = 'DEFAULT_TOKENS',

  /**
   * Option to fetch the set of ERC-20 tokens that the address as ever held. his
   * list is produced by an address's historical transfer activity and includes
   * all tokens that the address has ever received.
   */
  ERC20 = 'erc20'
}

/**
 * Optional params to pass into `getTokenBalances()` to fetch all ERC-20 tokens
 * instead of passing in an array of contract addresses to fetch balances for.
 */
export interface TokenBalancesOptionsErc20 {
  /** The ERC-20 token type. */
  type: TokenBalanceType.ERC20;

  /** Optional page key for pagination (only applicable to TokenBalanceType.ERC20) */
  pageKey?: string;
}

/**
 * Optional params to pass into `getTokenBalances()` to fetch the top 100 tokens
 * instead of passing in an array of contract addresses to fetch balances for.
 */
export interface TokenBalancesOptionsDefaultTokens {
  /** The top 100 token type. */
  type: TokenBalanceType.DEFAULT_TOKENS;
}

/**
 * Response object for when the {@link TokenBalancesOptionsErc20} options are
 * used. A page key may be returned if the provided address has many transfers.
 */
export interface TokenBalancesResponseErc20 extends TokenBalancesResponse {
  /**
   * An optional page key to passed into the next request to fetch the next page
   * of token balances.
   */
  pageKey?: string;
}

/** @public */
export interface TokenBalancesResponse {
  address: string;
  tokenBalances: TokenBalance[];
}

/** @public */
export type TokenBalance = TokenBalanceSuccess | TokenBalanceFailure;

/** @public */
export interface TokenBalanceSuccess {
  contractAddress: string;
  tokenBalance: string;
  error: null;
}

/** @public */
export interface TokenBalanceFailure {
  contractAddress: string;
  tokenBalance: null;
  error: string;
}

/**
 * Response object for the {@link CoreNamespace.getTokenMetadata} method.
 *
 * @public
 */
export interface TokenMetadataResponse {
  /**
   * The token's name. Is `null` if the name is not defined in the contract and
   * not available from other sources.
   */
  name: string | null;

  /**
   * The token's symbol. Is `null` if the symbol is not defined in the contract
   * and not available from other sources.
   */
  symbol: string | null;

  /**
   * The number of decimals of the token. Returns `null` if not defined in the
   * contract and not available from other sources.
   */
  decimals: number | null;

  /** URL link to the token's logo. Is `null` if the logo is not available. */
  logo: string | null;
}

/**
 * Parameters for the {@link CoreNamespace.getAssetTransfers} method.
 *
 * @public
 */
export interface AssetTransfersParams {
  /**
   * The starting block to check for transfers. This value is inclusive and
   * defaults to `0x0` if omitted.
   */
  fromBlock?: string;

  /**
   * The ending block to check for transfers. This value is inclusive and
   * defaults to the latest block if omitted.
   */
  toBlock?: string;

  /**
   * Whether to return results in ascending or descending order by block number.
   * Defaults to ascending if omitted.
   */
  order?: AssetTransfersOrder;

  /**
   * The from address to filter transfers by. This value defaults to a wildcard
   * for all addresses if omitted.
   */
  fromAddress?: string;

  /**
   * The to address to filter transfers by. This value defaults to a wildcard
   * for all address if omitted.
   */
  toAddress?: string;

  /**
   * List of contract addresses to filter for - only applies to "erc20",
   * "erc721", "erc1155" transfers. Defaults to all address if omitted.
   */
  contractAddresses?: string[];

  /**
   * Whether to exclude transfers with zero value. Note that zero value is
   * different than null value. Defaults to `false` if omitted.
   */
  excludeZeroValue?: boolean;

  /** REQUIRED field. An array of categories to get transfers for. */
  category: AssetTransfersCategory[];

  /** The maximum number of results to return per page. Defaults to 1000 if omitted. */
  maxCount?: number;

  /**
   * Optional page key from an existing {@link OwnedBaseNftsResponse}
   * {@link AssetTransfersResult}to use for pagination.
   */
  pageKey?: string;

  /**
   * Whether to include additional metadata about each transfer event. Defaults
   * to `false` if omitted.
   */
  withMetadata?: boolean;
}

/**
 * Parameters for the {@link CoreNamespace.getAssetTransfers} method that
 * includes metadata.
 *
 * @public
 */
export interface AssetTransfersWithMetadataParams extends AssetTransfersParams {
  withMetadata: true;
}

/**
 * Categories of transfers to use with the {@link AssetTransfersParams} request
 * object when using {@link CoreNamespace.getAssetTransfers}.
 *
 * @public
 */
export enum AssetTransfersCategory {
  /**
   * Top level ETH transactions that occur where the `fromAddress` is an
   * external user-created address. External addresses have private keys and are
   * accessed by users.
   */
  EXTERNAL = 'external',

  /**
   * Top level ETH transactions that occur where the `fromAddress` is an
   * internal, smart contract address. For example, a smart contract calling
   * another smart contract or sending
   */
  INTERNAL = 'internal',

  /** ERC20 transfers. */
  ERC20 = 'erc20',

  /** ERC721 transfers. */
  ERC721 = 'erc721',

  /** ERC1155 transfers. */
  ERC1155 = 'erc1155',

  /** Special contracts that don't follow ERC 721/1155, (ex: CryptoKitties). */
  SPECIALNFT = 'specialnft'
}

/**
 * Enum for the order of the {@link AssetTransfersParams} request object when
 * using {@link CoreNamespace.getAssetTransfers}.
 *
 * @public
 */
export enum AssetTransfersOrder {
  ASCENDING = 'asc',
  DESCENDING = 'desc'
}

/**
 * An enum for specifying the token type on NFTs.
 *
 * @public
 */
export enum NftTokenType {
  ERC721 = 'ERC721',
  ERC1155 = 'ERC1155',
  UNKNOWN = 'UNKNOWN'
}

/**
 * Response object for the {@link CoreNamespace.getAssetTransfers} method.
 *
 * @public
 */
export interface AssetTransfersResponse {
  transfers: AssetTransfersResult[];
  /** Page key for the next page of results, if one exists. */
  pageKey?: string;
}

/**
 * Response object for the {@link CoreNamespace.getAssetTransfers} method when
 * the {@link AssetTransfersWithMetadataParams} are used.
 *
 * @public
 */
export interface AssetTransfersWithMetadataResponse {
  transfers: AssetTransfersWithMetadataResult[];
  pageKey?: string;
}

/**
 * Represents a transfer event that is returned in a {@link AssetTransfersResponse}.
 *
 * @public
 */
export interface AssetTransfersResult {
  /** The category of the transfer. */
  category: AssetTransfersCategory;

  /** The block number where the transfer occurred. */
  blockNum: string;

  /** The from address of the transfer. */
  from: string;

  /** The to address of the transfer. */
  to: string | null;

  /**
   * Converted asset transfer value as a number (raw value divided by contract
   * decimal). `null` if ERC721 transfer or contract decimal not available.
   */
  value: number | null;

  /**
   * The raw ERC721 token id of the transfer as a hex string. `null` if not an
   * ERC721 transfer.
   */
  erc721TokenId: string | null;

  /**
   * A list of ERC1155 metadata objects if the asset transferred is an ERC1155
   * token. `null` if not an ERC1155 transfer.
   */
  erc1155Metadata: ERC1155Metadata[] | null;

  /** The token id of the token transferred. */
  tokenId: string | null;

  /**
   * Returns the token's symbol or ETH for other transfers. `null` if the
   * information was not available.
   */
  asset: string | null;

  /** The transaction hash of the transfer transaction. */
  hash: string;

  /** Information about the raw contract of the asset transferred. */
  rawContract: RawContract;
}

/**
 * Represents a transfer event that is returned in a
 * {@link AssetTransfersResponse} when {@link AssetTransfersWithMetadataParams} are used.
 *
 * @public
 */
export interface AssetTransfersWithMetadataResult extends AssetTransfersResult {
  /** Additional metadata about the transfer event. */
  metadata: AssetTransfersMetadata;
}

/**
 * The metadata object for a {@link AssetTransfersResult} when the
 * {@link AssetTransfersParams.withMetadata} field is set to true.
 *
 * @public
 */
export interface AssetTransfersMetadata {
  /** Timestamp of the block from which the transaction event originated. */
  blockTimestamp: string;
}

/**
 * Represents NFT metadata that holds fields. Note that since there is no
 * standard metadata format, the fields are not guaranteed to be present.
 *
 * @public
 */
export interface NftMetadata extends Record<string, any> {
  /** Name of the NFT asset. */
  name?: string;

  /** A human-readable description of the NFT asset. */
  description?: string;

  /** URL to the NFT asset image. */
  image?: string;

  /**
   * The image URL that appears along the top of the NFT asset page. This tends
   * to be the highest resolution image.
   */
  external_url?: string;

  /** Background color of the NFT item. Usually defined as a 6 character hex string. */
  background_color?: string;

  /** The traits, attributes, and characteristics for the NFT asset. */
  attributes?: Array<Record<string, any>>;
}

/**
 * Represents the URI information the NFT's metadata.
 *
 * @public
 */
export interface TokenUri {
  /**
   * URI for the location of the NFT's original metadata blob (ex: the original
   * IPFS link).
   */
  raw: string;

  /** Public gateway URI for the raw URI. Generally offers better performance. */
  gateway: string;
}

/**
 * Represents the URI information for the NFT's media assets.
 *
 * @public
 */
export interface Media {
  /**
   * URI for the location of the NFT's original metadata blob for media (ex: the
   * original IPFS link).
   */
  raw: string;

  /** Public gateway URI for the raw URI. Generally offers better performance. */
  gateway: string;

  /** URL for a resized thumbnail of the NFT media asset. */
  thumbnail?: string;

  /**
   * The media format (ex: jpg, gif, png) of the {@link gateway} and
   * {@link thumbnail} assets.
   */
  format?: string;

  /**
   * DEPRECATED - The size of the media asset in bytes
   *
   * @deprecated - Please use {@link bytes} instead. This field will be removed
   *   in a subsequent release.
   */
  size?: number;

  /** The size of the media asset in bytes. */
  bytes?: number;
}

/** Potential reasons why an NFT contract was classified as spam. */
export enum NftSpamClassification {
  Erc721TooManyOwners = 'Erc721TooManyOwners',
  Erc721TooManyTokens = 'Erc721TooManyTokens',
  Erc721DishonestTotalSupply = 'Erc721DishonestTotalSupply',
  MostlyHoneyPotOwners = 'MostlyHoneyPotOwners',
  OwnedByMostHoneyPots = 'OwnedByMostHoneyPots'
}

/** Detailed information on whether and why an NFT contract was classified as spam. */
export interface SpamInfo {
  isSpam: boolean;

  /** A list of reasons why an NFT contract was marked as spam. */
  classifications: NftSpamClassification[];
}

/**
 * Optional parameters object for the {@link getNftsForOwner} and
 * {@link getNftsForOwnerIterator} functions.
 *
 * This interface is used to fetch NFTs with their associated metadata. To get
 * Nfts without their associated metadata, use {@link GetBaseNftsForOwnerOptions}.
 *
 * @public
 */
export interface GetNftsForOwnerOptions {
  /**
   * Optional page key from an existing {@link OwnedBaseNftsResponse} or
   * {@link OwnedNftsResponse}to use for pagination.
   */
  pageKey?: string;

  /** Optional list of contract addresses to filter the results by. Limit is 20. */
  contractAddresses?: string[];

  /**
   * Optional list of filters applied to the query. NFTs that match one or more
   * of these filters are excluded from the response.
   */
  excludeFilters?: NftExcludeFilters[];

  /**
   * Sets the total number of NFTs to return in the response. Defaults to 100.
   * Maximum page size is 100.
   */
  pageSize?: number;

  /** Optional boolean flag to omit NFT metadata. Defaults to `false`. */
  omitMetadata?: boolean;

  /**
   * No set timeout by default - When metadata is requested, this parameter is
   * the timeout (in milliseconds) for the website hosting the metadata to
   * respond. If you want to only access the cache and not live fetch any
   * metadata for cache misses then set this value to 0.
   */
  tokenUriTimeoutInMs?: number;
}

/**
 * Optional parameters object for the {@link getNftsForOwner} and
 * {@link getNftsForOwnerIterator} functions.
 *
 * This interface is used to fetch NFTs without their associated metadata. To
 * get Nfts with their associated metadata, use {@link GetNftsForOwnerOptions}.
 *
 * @public
 */
export interface GetBaseNftsForOwnerOptions {
  /**
   * Optional page key from an existing {@link OwnedBaseNftsResponse} or
   * {@link OwnedNftsResponse}to use for pagination.
   */
  pageKey?: string;

  /** Optional list of contract addresses to filter the results by. Limit is 20. */
  contractAddresses?: string[];

  /**
   * Optional list of filters applied to the query. NFTs that match one or more
   * of these filters are excluded from the response.
   */
  excludeFilters?: NftExcludeFilters[];

  /**
   * Sets the total number of NFTs to return in the response. Defaults to 100.
   * Maximum page size is 100.
   */
  pageSize?: number;

  /** Optional boolean flag to include NFT metadata. Defaults to `false`. */
  omitMetadata: true;

  /**
   * No set timeout by default - When metadata is requested, this parameter is
   * the timeout (in milliseconds) for the website hosting the metadata to
   * respond. If you want to only access the cache and not live fetch any
   * metadata for cache misses then set this value to 0.
   */
  tokenUriTimeoutInMs?: number;
}

/**
 * Enum of NFT filters that can be applied to a {@link getNftsForOwner} request.
 * NFTs that match one or more of these filters are excluded from the response.
 *
 * @beta
 */
export enum NftExcludeFilters {
  /** Exclude NFTs that have been classified as spam. */
  SPAM = 'SPAM',

  /** Exclude NFTs that have been airdropped to a user. */
  AIRDROPS = 'AIRDROPS'
}

/**
 * The response object for the {@link getNftsForOwner} and
 * {@link getNftsForOwnerIterator} functions. The object contains the NFTs with
 * metadata owned by the provided address, along with pagination information and
 * the total count.
 *
 * @public
 */
export interface OwnedNftsResponse {
  /** The NFTs owned by the provided address. */
  readonly ownedNfts: OwnedNft[];

  /**
   * Pagination token that can be passed into another request to fetch the next
   * NFTs. If there is no page key, then there are no more NFTs to fetch.
   */
  readonly pageKey?: string;

  /** The total count of NFTs owned by the provided address. */
  readonly totalCount: number;
}

/**
 * The response object for the {@link getNftsForOwner} and
 * {@link getNftsForOwnerIterator)} functions. The object contains the NFTs
 * without metadata owned by the provided address, along with pagination
 * information and the total count.
 *
 * @public
 */
export interface OwnedBaseNftsResponse {
  /** The NFTs owned by the provided address. */
  readonly ownedNfts: OwnedBaseNft[];

  /**
   * Pagination token that can be passed into another request to fetch the next
   * NFTs. If there is no page key, then there are no more NFTs to fetch.
   */
  readonly pageKey?: string;

  /** The total count of NFTs owned by the provided address. */
  readonly totalCount: number;
}

/**
 * Represents an NFT with metadata owned by an address.
 *
 * @public
 */
export interface OwnedNft extends Nft {
  /** The token balance of the NFT. */
  readonly balance: number;
}

/**
 * Represents an NFT without metadata owned by an address.
 *
 * @public
 */
export interface OwnedBaseNft extends BaseNft {
  /** The token balance of the NFT. */
  readonly balance: number;
}

/**
 * The response object for the {@link getOwnersForNft}.
 *
 * @public
 */
export interface GetOwnersForNftResponse {
  /** An array of owner addresses for the provided token. */
  readonly owners: string[];
}

/**
 * The response object for the {@link getOwnersForContract}.
 *
 * @public
 */
export interface GetOwnersForContractResponse {
  /** An array of owner addresses for the provided contract address */
  owners: string[];
}

/**
 * The response object for the {@link getOwnersForContract}.
 *
 * @public
 */
export interface GetOwnersForContractWithTokenBalancesResponse {
  /** An array of owner addresses for the provided contract address */
  owners: NftContractOwner[];

  /** Optional page key that is returned when a collection has more than 50,000 owners. */
  pageKey?: string;
}

/**
 * An object representing the owner of an NFT and its corresponding token
 * balances in a {@link GetOwnersForContractWithTokenBalancesResponse} object.
 */
export interface NftContractOwner {
  /** The NFT's owner address. */
  ownerAddress: string;

  /** A list of objects containing token balances for the provided NFT contract. */
  tokenBalances: NftContractTokenBalance[];
}

/**
 * An object representing the owned token and balance values in a
 * {@link GetOwnersForContractWithTokenBalancesResponse} object.
 */
export interface NftContractTokenBalance {
  /** The token id owned in the NFT contract. */
  tokenId: string;

  /** The token Id balance for the provided owner. */
  balance: number;
}

/**
 * The successful object returned by the {@link getFloorPrice} call for each
 * marketplace (e.g. looksRare).
 *
 * @public
 */
export interface FloorPriceMarketplace {
  /** The floor price of the collection on the given marketplace */
  readonly floorPrice: number;
  /** The currency in which the floor price is denominated */
  readonly priceCurrency: string;
  /** The link to the collection on the given marketplace */
  readonly collectionUrl: string;
  /** UTC timestamp of when the floor price was retrieved from the marketplace */
  readonly retrievedAt: string;
}

/**
 * The failing object returned by the {@link getFloorPrice} call for each
 * marketplace (e.g. looksRare).
 *
 * @public
 */
export interface FloorPriceError {
  /** Error fetching floor prices from the given marketplace */
  readonly error: string;
}

/**
 * The response object for the {@link getFloorPrice} method.
 *
 * @public
 */
export interface GetFloorPriceResponse {
  /**
   * Name of the NFT marketplace where the collection is listed. Current
   * marketplaces supported: OpenSea, LooksRare
   */
  readonly openSea: FloorPriceMarketplace | FloorPriceError;
  readonly looksRare: FloorPriceMarketplace | FloorPriceError;
}

/** The refresh result response object returned by {@link refreshContract}. */
export interface RefreshContractResult {
  /** The NFT contract address that was passed in to be refreshed. */
  contractAddress: string;

  /** The current state of the refresh request. */
  refreshState: RefreshState;

  /**
   * Percentage of tokens currently refreshed, represented as an integer string.
   * Field can be null if the refresh has not occurred.
   */
  progress: string | null;
}

/** The current state of the NFT contract refresh process. */
export enum RefreshState {
  /** The provided contract is not an NFT or does not contain metadata. */
  DOES_NOT_EXIST = 'does_not_exist',

  /** The contract has already been queued for refresh. */
  ALREADY_QUEUED = 'already_queued',

  /** The contract is currently being refreshed. */
  IN_PROGRESS = 'in_progress',

  /** The contract refresh is complete. */
  FINISHED = 'finished',

  /** The contract refresh has been queued and await execution. */
  QUEUED = 'queued',

  /** The contract was unable to be queued due to an internal error. */
  QUEUE_FAILED = 'queue_failed'
}

/**
 * The parameter field of {@link TransactionReceiptsParams}.
 *
 * @public
 */
export interface TransactionReceiptsBlockNumber {
  /** The block number to get transaction receipts for. */
  blockNumber: string;
}

/**
 * The parameter field of {@link TransactionReceiptsParams}.
 *
 * @public
 */
export interface TransactionReceiptsBlockHash {
  /** The block hash to get transaction receipts for. */
  blockHash: string;
}

/**
 * The parameters to use with the {@link CoreNamespace.getTransactionReceipts} method.
 *
 * @public
 */
export type TransactionReceiptsParams =
  | TransactionReceiptsBlockNumber
  | TransactionReceiptsBlockHash;

/**
 * Response object for a {@link CoreNamespace.getTransactionReceipts} call.
 *
 * @public
 */
export interface TransactionReceiptsResponse {
  /** A list of transaction receipts for the queried block. */
  receipts: TransactionReceipt[] | null;
}

/**
 * Metadata object returned in a {@link AssetTransfersResult} object if the asset
 * transferred is an ERC1155.
 *
 * @public
 */
export interface ERC1155Metadata {
  tokenId: string;
  value: string;
}

/**
 * Information about the underlying contract for the asset that was transferred
 * in a {@link AssetTransfersResult} object.
 *
 * @public
 */
export interface RawContract {
  /**
   * The raw transfer value as a hex string. `null` if the transfer was for an
   * ERC721 or ERC1155 token.
   */
  value: string | null;

  /** The contract address. `null` if it was an internal or external transfer. */
  address: string | null;

  /**
   * The number of decimals in the contract as a hex string. `null` if the value
   * is not in the contract and not available from other sources.
   */
  decimal: string | null;
}

/**
 * Optional parameters object for the {@link getNftsForContract} and
 * {@link getNftsForContractIterator} functions.
 *
 * This interface is used to fetch NFTs with their associated metadata. To get
 * Nfts without their associated metadata, use {@link GetBaseNftsForContractOptions}.
 *
 * @public
 */
export interface GetNftsForContractOptions {
  /**
   * Optional page key from an existing {@link NftContractBaseNftsResponse} or
   * {@link NftContractNftsResponse}to use for pagination.
   */
  pageKey?: string;

  /** Optional boolean flag to omit NFT metadata. Defaults to `false`. */
  omitMetadata?: boolean;

  /**
   * Sets the total number of NFTs to return in the response. Defaults to 100.
   * Maximum page size is 100.
   */
  pageSize?: number;

  /**
   * No set timeout by default - When metadata is requested, this parameter is
   * the timeout (in milliseconds) for the website hosting the metadata to
   * respond. If you want to only access the cache and not live fetch any
   * metadata for cache misses then set this value to 0.
   */
  tokenUriTimeoutInMs?: number;
}

/**
 * Optional parameters object for the {@link getNftsForContract} and
 * {@link getNftsForContractIterator} functions.
 *
 * This interface is used to fetch NFTs without their associated metadata. To
 * get Nfts with their associated metadata, use {@link GetNftsForContractOptions}.
 *
 * @public
 */
export interface GetBaseNftsForContractOptions {
  /**
   * Optional page key from an existing {@link NftContractBaseNftsResponse} or
   * {@link NftContractNftsResponse}to use for pagination.
   */
  pageKey?: string;

  /** Optional boolean flag to omit NFT metadata. Defaults to `false`. */
  omitMetadata: false;

  /**
   * Sets the total number of NFTs to return in the response. Defaults to 100.
   * Maximum page size is 100.
   */
  pageSize?: number;
}

/**
 * Optional parameters object for the {@link getNftsForContract} method.
 *
 * This interface configures options when fetching the owner addresses of the
 * provided contract.
 *
 * @public
 */
export interface GetOwnersForContractOptions {
  /**
   * Whether to include the token balances per token id for each owner. Defaults
   * to false when omitted.
   */
  withTokenBalances?: boolean;

  /** The block number in hex or decimal to fetch owners for. */
  block?: string;

  /** Optional page key to paginate the next page for large requests. */
  pageKey?: string;
}

/**
 * Optional parameters object for the {@link getNftsForContract} method.
 *
 * This interface configures options when fetching the owner addresses of the
 * provided contract.
 *
 * @public
 */
export interface GetOwnersForContractWithTokenBalancesOptions {
  /**
   * Whether to include the token balances per token id for each owner. Defaults
   * to false when omitted.
   */
  withTokenBalances: true;

  /** The block number in hex or decimal to fetch owners for. */
  block?: string;

  /** Optional page key to paginate the next page for large requests. */
  pageKey?: string;
}

/**
 * The response object for the {@link getNftsForContract} function. The object
 * contains the NFTs without metadata inside the NFT contract.
 *
 * @public
 */
export interface NftContractBaseNftsResponse {
  /** An array of NFTs without metadata. */
  nfts: BaseNft[];

  /**
   * Pagination token that can be passed into another request to fetch the next
   * NFTs. If there is no page key, then there are no more NFTs to fetch.
   */
  pageKey?: string;
}

/**
 * The response object for the {@link getNftsForContract} function. The object
 * contains the NFTs with metadata inside the NFT contract.
 *
 * @public
 */
export interface NftContractNftsResponse {
  /** An array of NFTs with metadata. */
  nfts: Nft[];

  /**
   * Pagination token that can be passed into another request to fetch the next
   * NFTs. If there is no page key, then there are no more NFTs to fetch.
   */
  pageKey?: string;
}

/**
 * The response object for the {@link findContractDeployer} function.
 *
 * @public
 */
export interface DeployResult {
  /** The address of the contract deployer, if it is available. */
  readonly deployerAddress?: string;

  /** The block number the contract was deployed in. */
  readonly blockNumber: number;
}

/**
 * Event filter for the {@link AlchemyWebSocketProvider.on} and
 * {@link AlchemyWebSocketProvider.once} methods to use Alchemy's custom
 * `alchemy_pendingTransactions` endpoint.
 *
 * Returns the transaction information for all pending transactions that match a
 * given filter. For full documentation, see:
 * https://docs.alchemy.com/alchemy/enhanced-apis/subscription-api-websockets#alchemy_pendingtransactions
 *
 * Note that excluding all optional parameters will return transaction
 * information for ALL pending transactions that are added to the mempool.
 *
 * @public
 */
export type AlchemyPendingTransactionsEventFilter = {
  method: 'alchemy_pendingTransactions' /** Filter pending transactions sent FROM the provided address or array of addresses. */;
  fromAddress?: string | string[];

  /** Filter pending transactions sent TO the provided address or array of addresses. */
  toAddress?: string | string[];

  /**
   * Whether to only include transaction hashes and exclude the rest of the
   * transaction response for a smaller payload. Defaults to false (by default,
   * the entire transaction response is included).
   *
   * Note that setting only {@link hashesOnly} to true will return the same
   * response as subscribing to `newPendingTransactions`.
   */
  hashesOnly?: boolean;
};

/**
 * Alchemy's event filter that extends the default {@link EventType} interface to
 * also include Alchemy's Subscription API.
 *
 * @public
 */
export type AlchemyEventType =
  | EventType
  | AlchemyPendingTransactionsEventFilter;

/** Options for the {@link TransactNamespace.sendPrivateTransaction} method. */
export interface SendPrivateTransactionOptions {
  /**
   * Whether to use fast-mode. Defaults to false. Please note that fast mode
   * transactions cannot be cancelled using
   * {@link TransactNamespace.cancelPrivateTransaction}. method.
   *
   * See {@link https://docs.flashbots.net/flashbots-protect/rpc/fast-mode} for
   * more details.
   */
  fast: boolean;
}

export interface TransactionJobResponse {
  /**
   * The job id. This can be used to check the status of the job via
   * {@link TransactNamespace.getTransactionJobStatus}.
   */
  transactionJobId: string;

  /* An array of the transaction hashes from the different options */
  transactionHashes: string[];
}

/** Response object for the {@link TransactNamespace.getTransactionJobStatus} method. */
export interface TransactionJobStatusResponse {
  /** The status of the transaction job. */
  jobStatus: string;

  /** An array of the submitted transactions hashes that have been attempted. */
  transactionHashesAttempted: string[];

  /** The final mined transaction hash if the job was completed successfully. */
  minedTransactionHash?: string;
}

/** Potential transaction job statuses for a {@link TransactionJobResponse} */
export enum TransactionJobStatus {
  UNSPECIFIED = 'TRANSACTION_JOB_STATUS_UNSPECIFIED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETE = 'COMPLETE',
  ABANDONED = 'ABANDONED'
}

/** SDK representation of a Webhook in the Notify API. */
export interface Webhook {
  /** The webhook's unique id. */
  id: string;
  /** The network the webhook is on. */
  network: Network;
  /** The type of webhook. */
  type: WebhookType;
  /** The url that the webhook sends its payload to. */
  url: string;
  /** Whether the webhook is currently active */
  isActive: boolean;
  /** The creation time of the webhook as an ISO string. */
  timeCreated: string;
  /** The signing key used to verify payloads for the webhook. */
  signingKey: string;
  /** The webhook version. All newly created webhooks default to V2. */
  version: WebhookVersion;
  /**
   * The app id of the app used for the webhook. This field is only present on
   * {@link MinedTransactionWebhook} and {@link DroppedTransactionWebhook}
   */
  appId?: string;
}

/** The version of the webhook. All newly created webhooks default to V2. */
export enum WebhookVersion {
  V1 = 'V1',
  V2 = 'V2'
}

/** The type of {@link Webhook}. */
export enum WebhookType {
  MINED_TRANSACTION = 'MINED_TRANSACTION',
  DROPPED_TRANSACTION = 'DROPPED_TRANSACTION',
  ADDRESS_ACTIVITY = 'ADDRESS_ACTIVITY',
  NFT_ACTIVITY = 'NFT_ACTIVITY'
}

/**
 * A Mined Transaction Webhook is used to notify your app whenever a transaction
 * sent through your API key gets successfully mined. This is useful if you want
 * to notify customers that their transaction went through.
 */
export interface MinedTransactionWebhook extends Webhook {
  type: WebhookType.MINED_TRANSACTION;
}

/**
 * A Dropped Transaction webhook is used to notify your app whenever a
 * transaction sent through your API key gets dropped. This can be useful if you
 * want to notify customers that their transactions were dropped.
 */
export interface DroppedTransactionWebhook extends Webhook {
  type: WebhookType.DROPPED_TRANSACTION;
}

/**
 * An Address Activity Webhook tracks ETH, ERC-20, and ERC721 transfers for the
 * provided addresses. This can be used to notify your app with real-time state
 * changes when your tracked addresses send or receive tokens.
 */
export interface AddressActivityWebhook extends Webhook {
  type: WebhookType.ADDRESS_ACTIVITY;
}

/**
 * The NFT Activity Webhook tracks all ERC821 and ERC1155 activity. This can be
 * used to notify your app with real time state changes when an NFT is
 * transferred between addresses.
 */
export interface NftActivityWebhook extends Webhook {
  type: WebhookType.NFT_ACTIVITY;
}

/** The response for a {@link NotifyNamespace.getAll} method. */
export interface GetAllWebhooksResponse {
  /** All webhooks attached to the provided auth token. */
  webhooks: Webhook[];
  /** The total number of webhooks. */
  totalCount: number;
}

/** Options object for the {@link NotifyNamespace.getAddresses} method. */
export interface GetAddressesOptions {
  /** Number of addresses to fetch. */
  limit?: number;

  /** Page */
  pageKey?: string;
}

/** Response object for the {@link NotifyNamespace.getAddresses} method. */
export interface AddressActivityResponse {
  /** The addresses for the webhook. */
  addresses: string[];
  /** The total number of addresses. */
  totalCount: number;
  /** Optional page key used to fetch the remaining addresses. */
  pageKey?: string;
}

/**
 * Params to pass in when calling {@link NotifyNamespace.createWebhook} in order
 * to create a {@link MinedTransactionWebhook} or {@link DroppedTransactionWebhook}.
 *
 * The webhook will be created on the app and network associated with the appId.
 * To find the app id of a project, go to the Alchemy Dashboard in the Apps tab.
 * After clicking on an app, the app id is the string in the URL following 'apps/'.
 *
 * This is a temporary workaround for now. We're planning on detecting the app
 * id from the provided api key directly. Stay tuned!
 */
export interface TransactionWebhookParams {
  /** The app id of the project to create the webhook on. */
  appId: string;
}

/**
 * Params to pass in when calling {@link NotifyNamespace.createWebhook} in order
 * to create a {@link NftActivityWebhook}.
 */
export interface NftWebhookParams {
  /** Array of NFT filters the webhook should track. */
  filters: NftFilter[];
  /**
   * Optional network to create the webhook on. If omitted, the webhook will be
   * created on network of the app provided in the api key config.
   */
  network?: Network;
}

/**
 * Params to pass in when calling {@link NotifyNamespace.createWebhook} in order
 * to create a {@link AddressActivityWebhook}.
 */
export interface AddressWebhookParams {
  /** Array of addresses the webhook should activity for. */
  addresses: string[];
  /**
   * Optional network to create the webhook on. If omitted, the webhook will be
   * created on network of the app provided in the api key config.
   */
  network?: Network;
}

/** NFT to track on a {@link NftActivityWebhook}. */
export interface NftFilter {
  /** The contract address of the NFT. */
  contractAddress: string;
  /** The token id of the NFT. */
  tokenId: string;
}

/** Response object for the {@link NotifyNamespace.getNftFilters} method. */
export interface NftFiltersResponse {
  /** The NFT filters on the provided webhook. */
  filters: NftFilter[];
  /** The total number of NFT filters on the webhook. */
  totalCount: number;
  /** Optional page key used to fetch the remaining filters. */
  pageKey?: string;
}

/**
 * Params object when calling {@link NotifyNamespace.updateWebhook} to mark a
 * webhook as active or inactive.
 */
export interface WebhookStatusUpdate {
  /** Whether the webhook is active. */
  isActive: boolean;
}

/**
 * Params object when calling {@link NotifyNamespace.updateWebhook} to add and
 * remove NFT filters for a {@link NftActivityWebhook}.
 */
export interface WebhookNftFilterUpdate {
  /** The filters to additionally track. */
  addFilters: NftFilter[];
  /** Existing filters to remove. */
  removeFilters: NftFilter[];
}

/**
 * Params object when calling {@link NotifyNamespace.updateWebhook} to add and
 * remove addresses for a {@link AddressActivityWebhook}.
 */
export interface WebhookAddressUpdate {
  /** The addresses to additionally track. */
  addAddresses: string[];
  /** Existing addresses to remove. */
  removeAddresses: string[];
}

/**
 * Params object when calling {@link NotifyNamespace.updateWebhook} to replace
 * all existing addresses for a {@link AddressActivityWebhook}.
 */
export interface WebhookAddressOverride {
  /** The new addresses to track. Existing addresses will be removed. */
  newAddresses: string[];
}

/**
 * Params object when calling {@link NotifyNamespace.updateWebhook} to update a
 * {@link NftActivityWebhook}.
 */

export type NftWebhookUpdate = WebhookStatusUpdate | WebhookNftFilterUpdate;

/**
 * Params object when calling {@link NotifyNamespace.updateWebhook} to update a
 * {@link AddressActivityWebhook}.
 */
export type AddressWebhookUpdate =
  | WebhookStatusUpdate
  | WebhookAddressUpdate
  | WebhookAddressOverride;

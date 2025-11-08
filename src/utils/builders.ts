/**
 * Configuration builder utilities
 *
 * Easy construction of TokenConfig, NFTConfig, and GovernanceConfig objects
 * with sensible defaults and validation
 */

import { generateSalt } from './salt.js';
import { validateTokenConfig, validateGovernanceConfig } from './validation.js';

/**
 * Token type enum
 */
export type TokenType = 'Allowlist' | 'Blocklist' | 'Capped' | 'Pausable' | 'Vault';

/**
 * NFT type enum
 */
export type NFTType = 'Enumerable' | 'Royalties' | 'AccessControl';

/**
 * Governance type enum
 */
export type GovernanceType = 'MerkleVoting';

/**
 * Token configuration parameters
 */
export interface TokenConfigParams {
  token_type: TokenType;
  admin: string;
  manager: string;
  initial_supply: string;
  name: string;
  symbol: string;
  decimals?: number; // Default: 7
  cap?: string; // Required for Capped tokens
  salt?: string; // Auto-generated if not provided
  // Vault-specific
  asset?: string;
  decimals_offset?: number;
}

/**
 * Build token configuration with validation
 * @param params - Token parameters
 * @returns Complete TokenConfig object
 */
export function buildTokenConfig(params: TokenConfigParams) {
  const config = {
    token_type: params.token_type,
    admin: params.admin,
    manager: params.manager,
    initial_supply: params.initial_supply,
    cap: params.cap || undefined,
    name: params.name,
    symbol: params.symbol.toUpperCase(),
    decimals: params.decimals ?? 7, // Default 7 decimals
    salt: params.salt || generateSalt(),
    asset: params.asset || undefined,
    decimals_offset: params.decimals_offset || undefined,
  };

  // Validate based on token type
  if (params.token_type === 'Capped' && !params.cap) {
    throw new Error('Capped token requires cap parameter');
  }

  if (params.token_type === 'Vault') {
    if (!params.asset) {
      throw new Error('Vault token requires asset parameter');
    }
    if (params.decimals_offset === undefined) {
      throw new Error('Vault token requires decimals_offset parameter');
    }
  }

  // Run validation
  const validation = validateTokenConfig(config);
  if (!validation.valid) {
    throw new Error(`Invalid token config:\n${validation.errors.join('\n')}`);
  }

  return config;
}

/**
 * NFT configuration parameters
 */
export interface NFTConfigParams {
  nft_type: NFTType;
  owner: string;
  admin?: string; // Required for Royalties and AccessControl
  manager?: string; // Required for Royalties
  salt?: string; // Auto-generated if not provided
}

/**
 * Build NFT configuration with validation
 * @param params - NFT parameters
 * @returns Complete NFTConfig object
 */
export function buildNFTConfig(params: NFTConfigParams) {
  const config = {
    nft_type: params.nft_type,
    owner: params.owner,
    admin: params.admin || null,
    manager: params.manager || null,
    salt: params.salt || generateSalt(),
  };

  // Type-specific validation
  if (params.nft_type === 'Royalties' || params.nft_type === 'AccessControl') {
    if (!params.admin) {
      throw new Error(`${params.nft_type} NFT requires admin parameter`);
    }
  }

  if (params.nft_type === 'Royalties' && !params.manager) {
    throw new Error('Royalties NFT requires manager parameter');
  }

  return config;
}

/**
 * Governance configuration parameters
 */
export interface GovernanceConfigParams {
  governance_type: 'MerkleVoting';
  admin: string;
  root_hash: string;
  salt?: string; // Auto-generated if not provided
}

/**
 * Build MerkleVoting governance configuration with validation
 * @param params - Governance parameters
 * @returns Complete GovernanceConfig object
 */
export function buildGovernanceConfig(params: GovernanceConfigParams) {
  const config = {
    governance_type: 'MerkleVoting' as const,
    admin: params.admin,
    root_hash: params.root_hash,
    salt: params.salt || generateSalt(),
  };

  // Run validation
  const validation = validateGovernanceConfig(config);
  if (!validation.valid) {
    throw new Error(`Invalid governance config:\n${validation.errors.join('\n')}`);
  }

  return config;
}

/**
 * Quick builder: Create capped token config
 * @param admin - Admin address
 * @param name - Token name
 * @param symbol - Token symbol
 * @param initialSupply - Initial supply
 * @param cap - Maximum cap
 * @returns TokenConfig for capped token
 */
export function buildCappedTokenConfig(
  admin: string,
  name: string,
  symbol: string,
  initialSupply: string,
  cap: string
) {
  return buildTokenConfig({
    token_type: 'Capped',
    admin,
    manager: admin, // Default manager to admin
    initial_supply: initialSupply,
    cap,
    name,
    symbol,
  });
}

/**
 * Quick builder: Create simple token config (Pausable)
 * @param admin - Admin address
 * @param name - Token name
 * @param symbol - Token symbol
 * @param initialSupply - Initial supply
 * @returns TokenConfig for pausable token
 */
export function buildSimpleTokenConfig(
  admin: string,
  name: string,
  symbol: string,
  initialSupply: string
) {
  return buildTokenConfig({
    token_type: 'Pausable',
    admin,
    manager: admin,
    initial_supply: initialSupply,
    name,
    symbol,
  });
}

/**
 * Quick builder: Create enumerable NFT config
 * @param owner - Owner address
 * @returns NFTConfig for enumerable NFT
 */
export function buildEnumerableNFTConfig(owner: string) {
  return buildNFTConfig({
    nft_type: 'Enumerable',
    owner,
  });
}

/**
 * Quick builder: Create merkle voting config with voter addresses
 * @param admin - Admin address
 * @param voterAddresses - Array of voter addresses
 * @returns GovernanceConfig with merkle root generated
 */
export async function buildMerkleVotingConfig(
  admin: string,
  voterAddresses: string[]
): Promise<ReturnType<typeof buildGovernanceConfig>> {
  const { createMerkleRootFromAddresses } = await import('./merkle.js');
  const root_hash = createMerkleRootFromAddresses(voterAddresses);

  return buildGovernanceConfig({
    governance_type: 'MerkleVoting',
    admin,
    root_hash,
  });
}


/**
 * Format token amount with decimals
 * Converts human-readable amount to contract amount
 * @param amount - Human readable amount (e.g., "100")
 * @param decimals - Number of decimals (default: 7)
 * @returns Contract amount as string
 * @example formatTokenAmount("100", 7) => "1000000000"
 */
export function formatTokenAmount(amount: string, decimals: number = 7): string {
  const value = parseFloat(amount);
  if (isNaN(value)) {
    throw new Error(`Invalid amount: ${amount}`);
  }

  const multiplier = BigInt(10) ** BigInt(decimals);
  const result = BigInt(Math.floor(value * Math.pow(10, decimals)));

  return result.toString();
}

/**
 * Parse contract token amount to human-readable
 * @param amount - Contract amount
 * @param decimals - Number of decimals (default: 7)
 * @returns Human readable amount
 * @example parseTokenAmount("1000000000", 7) => "100"
 */
export function parseTokenAmount(amount: string, decimals: number = 7): string {
  const value = BigInt(amount);
  const divisor = BigInt(10) ** BigInt(decimals);

  const whole = value / divisor;
  const fraction = value % divisor;

  if (fraction === BigInt(0)) {
    return whole.toString();
  }

  const fractionStr = fraction.toString().padStart(decimals, '0').replace(/0+$/, '');
  return `${whole}.${fractionStr}`;
}

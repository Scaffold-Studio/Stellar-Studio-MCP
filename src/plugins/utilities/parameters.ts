/**
 * Utility tool parameter schemas
 */

import { z } from 'zod';

export const GenerateSaltSchema = z.object({});

export const GenerateMultipleSaltsSchema = z.object({
  count: z.number().min(1).max(100).describe('Number of salts to generate (1-100)'),
});

export const CreateMerkleRootSchema = z.object({
  addresses: z
    .array(z.string())
    .min(1)
    .describe('Array of Stellar addresses for voters'),
});

export const BuildMerkleTreeSchema = z.object({
  voters: z
    .array(
      z.object({
        address: z.string().describe('Voter Stellar address'),
        weight: z.number().optional().describe('Optional voting weight'),
      })
    )
    .describe('Array of voter objects'),
});

export const ValidateAddressSchema = z.object({
  address: z.string().describe('Stellar address to validate'),
});

export const ValidateTokenConfigSchema = z.object({
  admin: z.string(),
  manager: z.string(),
  initial_supply: z.string(),
  cap: z.string().optional(),
  name: z.string(),
  symbol: z.string(),
  decimals: z.number(),
  salt: z.string(),
});

export const ValidateGovernanceConfigSchema = z.object({
  governance_type: z.enum(['MerkleVoting', 'Multisig']),
  admin: z.string(),
  root_hash: z.string().optional(),
  owners: z.array(z.string()).optional(),
  threshold: z.number().optional(),
  salt: z.string(),
});

export const BuildTokenConfigSchema = z.object({
  token_type: z.enum(['Allowlist', 'Blocklist', 'Capped', 'Pausable', 'Vault']),
  admin: z.string(),
  manager: z.string(),
  initial_supply: z.string(),
  name: z.string(),
  symbol: z.string(),
  decimals: z.number().optional(),
  cap: z.string().optional(),
  salt: z.string().optional(),
  asset: z.string().optional(),
  decimals_offset: z.number().optional(),
});

export const BuildNFTConfigSchema = z.object({
  nft_type: z.enum(['Enumerable', 'Royalties', 'AccessControl']),
  owner: z.string(),
  admin: z.string().optional(),
  manager: z.string().optional(),
  salt: z.string().optional(),
});

export const BuildGovernanceConfigSchema = z.object({
  governance_type: z.enum(['MerkleVoting', 'Multisig']),
  admin: z.string(),
  root_hash: z.string().optional(),
  owners: z.array(z.string()).optional(),
  threshold: z.number().optional(),
  salt: z.string().optional(),
});

export const BuildCappedTokenSchema = z.object({
  admin: z.string(),
  name: z.string(),
  symbol: z.string(),
  initialSupply: z.string(),
  cap: z.string(),
});

export const BuildSimpleTokenSchema = z.object({
  admin: z.string(),
  name: z.string(),
  symbol: z.string(),
  initialSupply: z.string(),
});

export const BuildMerkleVotingSchema = z.object({
  admin: z.string(),
  voterAddresses: z.array(z.string()),
});

export const BuildMultisigSchema = z.object({
  admin: z.string(),
  owners: z.array(z.string()),
  threshold: z.number(),
});

export const FormatTokenAmountSchema = z.object({
  amount: z.string(),
  decimals: z.number().optional(),
});

export const ParseTokenAmountSchema = z.object({
  amount: z.string(),
  decimals: z.number().optional(),
});

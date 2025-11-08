/**
 * Zod parameter schemas for Token plugin tools
 */

import { z } from 'zod';

/**
 * Token type enum schema
 */
export const TokenTypeSchema = z.enum([
  'Allowlist',
  'Blocklist',
  'Capped',
  'Pausable',
  'Vault',
]);

/**
 * Parameters for deploying a token
 */
export const DeployTokenSchema = z.object({
  admin: z.string().describe('Admin address for the token'),
  manager: z.string().describe('Manager address for the token'),
  name: z.string().describe('Token name (e.g., "My Token")'),
  symbol: z.string().describe('Token symbol (e.g., "MTK")'),
  decimals: z.number().int().min(0).max(18).describe('Token decimals (usually 7 for Stellar)'),
  initial_supply: z.string().describe('Initial supply as string (e.g., "1000000")'),
  token_type: TokenTypeSchema.describe('Type of token to deploy'),
  cap: z.string().optional().describe('Maximum supply for Capped tokens'),
  asset: z.string().optional().describe('Asset contract address for Vault tokens'),
  decimals_offset: z.number().optional().describe('Decimals offset for Vault tokens'),
  salt: z.string().optional().describe('Salt for deterministic deployment (32-byte hex)'),
});

/**
 * Parameters for getting deployed tokens
 */
export const GetDeployedTokensSchema = z.object({
  limit: z.number().optional().describe('Maximum number of tokens to return'),
  offset: z.number().optional().describe('Offset for pagination'),
});

/**
 * Parameters for getting tokens by type
 */
export const GetTokensByTypeSchema = z.object({
  token_type: TokenTypeSchema.describe('Type of tokens to filter by'),
});

/**
 * Parameters for getting tokens by admin
 */
export const GetTokensByAdminSchema = z.object({
  admin: z.string().describe('Admin address to filter by'),
});

/**
 * Parameters for getting token details
 */
export const GetTokenDetailsSchema = z.object({
  token_address: z.string().describe('Contract address of the token'),
});

export type DeployTokenParams = z.infer<typeof DeployTokenSchema>;
export type GetDeployedTokensParams = z.infer<typeof GetDeployedTokensSchema>;
export type GetTokensByTypeParams = z.infer<typeof GetTokensByTypeSchema>;
export type GetTokensByAdminParams = z.infer<typeof GetTokensByAdminSchema>;
export type GetTokenDetailsParams = z.infer<typeof GetTokenDetailsSchema>;

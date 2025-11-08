/**
 * Zod parameter schemas for Token Contract plugin tools
 */

import { z } from 'zod';

/**
 * Base schema - all methods need contract address
 */
const BaseContractSchema = z.object({
  contract_address: z.string().describe('Address of the deployed token contract'),
});

/**
 * Parameters for getting token balance
 */
export const GetBalanceSchema = BaseContractSchema.extend({
  account: z.string().describe('Account address to check balance'),
});

/**
 * Parameters for getting total supply
 */
export const GetTotalSupplySchema = BaseContractSchema;

/**
 * Parameters for getting allowance
 */
export const GetAllowanceSchema = BaseContractSchema.extend({
  owner: z.string().describe('Token owner address'),
  spender: z.string().describe('Spender address'),
});

/**
 * Parameters for getting decimals
 */
export const GetDecimalsSchema = BaseContractSchema;

/**
 * Parameters for getting token name
 */
export const GetNameSchema = BaseContractSchema;

/**
 * Parameters for getting token symbol
 */
export const GetSymbolSchema = BaseContractSchema;

/**
 * Parameters for checking paused status
 */
export const GetPausedSchema = BaseContractSchema;

/**
 * Parameters for transferring tokens
 */
export const TransferSchema = BaseContractSchema.extend({
  from: z.string().describe('From address (must authorize)'),
  to: z.string().describe('To address'),
  amount: z.string().describe('Amount to transfer (as string to handle large numbers)'),
});

/**
 * Parameters for transferring tokens on behalf
 */
export const TransferFromSchema = BaseContractSchema.extend({
  spender: z.string().describe('Spender address (must have allowance and authorize)'),
  from: z.string().describe('From address'),
  to: z.string().describe('To address'),
  amount: z.string().describe('Amount to transfer (as string to handle large numbers)'),
});

/**
 * Parameters for approving spender
 */
export const ApproveSchema = BaseContractSchema.extend({
  owner: z.string().describe('Owner address (must authorize)'),
  spender: z.string().describe('Spender address to approve'),
  amount: z.string().describe('Amount to approve (as string to handle large numbers)'),
  live_until_ledger: z.number().describe('Ledger number until approval is valid'),
});

/**
 * Parameters for minting tokens
 */
export const MintSchema = BaseContractSchema.extend({
  account: z.string().describe('Account to mint tokens to'),
  amount: z.string().describe('Amount to mint (as string to handle large numbers)'),
});

/**
 * Parameters for burning tokens
 */
export const BurnSchema = BaseContractSchema.extend({
  from: z.string().describe('Account to burn tokens from (must authorize)'),
  amount: z.string().describe('Amount to burn (as string to handle large numbers)'),
});

/**
 * Parameters for burning tokens on behalf
 */
export const BurnFromSchema = BaseContractSchema.extend({
  spender: z.string().describe('Spender address (must have allowance and authorize)'),
  from: z.string().describe('Account to burn tokens from'),
  amount: z.string().describe('Amount to burn (as string to handle large numbers)'),
});

/**
 * Parameters for pausing token
 */
export const PauseSchema = BaseContractSchema.extend({
  caller: z.string().describe('Caller address (must be owner and authorize)'),
});

/**
 * Parameters for unpausing token
 */
export const UnpauseSchema = BaseContractSchema.extend({
  caller: z.string().describe('Caller address (must be owner and authorize)'),
});

// Export types
export type GetBalanceParams = z.infer<typeof GetBalanceSchema>;
export type GetTotalSupplyParams = z.infer<typeof GetTotalSupplySchema>;
export type GetAllowanceParams = z.infer<typeof GetAllowanceSchema>;
export type GetDecimalsParams = z.infer<typeof GetDecimalsSchema>;
export type GetNameParams = z.infer<typeof GetNameSchema>;
export type GetSymbolParams = z.infer<typeof GetSymbolSchema>;
export type GetPausedParams = z.infer<typeof GetPausedSchema>;
export type TransferParams = z.infer<typeof TransferSchema>;
export type TransferFromParams = z.infer<typeof TransferFromSchema>;
export type ApproveParams = z.infer<typeof ApproveSchema>;
export type MintParams = z.infer<typeof MintSchema>;
export type BurnParams = z.infer<typeof BurnSchema>;
export type BurnFromParams = z.infer<typeof BurnFromSchema>;
export type PauseParams = z.infer<typeof PauseSchema>;
export type UnpauseParams = z.infer<typeof UnpauseSchema>;

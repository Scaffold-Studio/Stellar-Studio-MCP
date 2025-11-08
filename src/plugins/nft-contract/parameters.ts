/**
 * Zod parameter schemas for NFT Contract plugin tools
 */

import { z } from 'zod';

const BaseSchema = z.object({
  contract_address: z.string().describe('Address of the deployed NFT contract'),
});

// Query schemas
export const GetBalanceSchema = BaseSchema.extend({
  account: z.string().describe('Account address to check NFT balance'),
});

export const GetOwnerOfSchema = BaseSchema.extend({
  token_id: z.number().describe('Token ID to check owner'),
});

export const GetApprovedSchema = BaseSchema.extend({
  token_id: z.number().describe('Token ID to check approved address'),
});

export const IsApprovedForAllSchema = BaseSchema.extend({
  owner: z.string().describe('Owner address'),
  operator: z.string().describe('Operator address'),
});

export const GetTokenUriSchema = BaseSchema.extend({
  token_id: z.number().describe('Token ID to get URI'),
});

export const GetNameSchema = BaseSchema;
export const GetSymbolSchema = BaseSchema;
export const GetTotalSupplySchema = BaseSchema;

export const GetOwnerTokenIdSchema = BaseSchema.extend({
  owner: z.string().describe('Owner address'),
  index: z.number().describe('Index in owner\'s token list'),
});

export const GetTokenIdSchema = BaseSchema.extend({
  index: z.number().describe('Index in global token list'),
});

// Write schemas
export const MintSchema = BaseSchema.extend({
  to: z.string().describe('Address to mint NFT to'),
});

export const TransferSchema = BaseSchema.extend({
  from: z.string().describe('From address (must authorize)'),
  to: z.string().describe('To address'),
  token_id: z.number().describe('Token ID to transfer'),
});

export const TransferFromSchema = BaseSchema.extend({
  spender: z.string().describe('Spender address (must be approved and authorize)'),
  from: z.string().describe('From address'),
  to: z.string().describe('To address'),
  token_id: z.number().describe('Token ID to transfer'),
});

export const ApproveSchema = BaseSchema.extend({
  approver: z.string().describe('Approver address (must be owner and authorize)'),
  approved: z.string().describe('Address to approve'),
  token_id: z.number().describe('Token ID to approve'),
  live_until_ledger: z.number().describe('Ledger number until approval is valid'),
});

export const ApproveForAllSchema = BaseSchema.extend({
  owner: z.string().describe('Owner address (must authorize)'),
  operator: z.string().describe('Operator address to approve for all NFTs'),
  live_until_ledger: z.number().describe('Ledger number until approval is valid'),
});

export const BurnSchema = BaseSchema.extend({
  from: z.string().describe('Address to burn NFT from (must authorize)'),
  token_id: z.number().describe('Token ID to burn'),
});

export const BurnFromSchema = BaseSchema.extend({
  spender: z.string().describe('Spender address (must be approved and authorize)'),
  from: z.string().describe('Address to burn NFT from'),
  token_id: z.number().describe('Token ID to burn'),
});

// Export types
export type GetBalanceParams = z.infer<typeof GetBalanceSchema>;
export type GetOwnerOfParams = z.infer<typeof GetOwnerOfSchema>;
export type GetApprovedParams = z.infer<typeof GetApprovedSchema>;
export type IsApprovedForAllParams = z.infer<typeof IsApprovedForAllSchema>;
export type GetTokenUriParams = z.infer<typeof GetTokenUriSchema>;
export type GetNameParams = z.infer<typeof GetNameSchema>;
export type GetSymbolParams = z.infer<typeof GetSymbolSchema>;
export type GetTotalSupplyParams = z.infer<typeof GetTotalSupplySchema>;
export type GetOwnerTokenIdParams = z.infer<typeof GetOwnerTokenIdSchema>;
export type GetTokenIdParams = z.infer<typeof GetTokenIdSchema>;
export type MintParams = z.infer<typeof MintSchema>;
export type TransferParams = z.infer<typeof TransferSchema>;
export type TransferFromParams = z.infer<typeof TransferFromSchema>;
export type ApproveParams = z.infer<typeof ApproveSchema>;
export type ApproveForAllParams = z.infer<typeof ApproveForAllSchema>;
export type BurnParams = z.infer<typeof BurnSchema>;
export type BurnFromParams = z.infer<typeof BurnFromSchema>;

/**
 * Zod parameter schemas for Governance Contract plugin tools
 */

import { z } from 'zod';

const BaseSchema = z.object({
  contract_address: z.string().describe('Address of the deployed governance contract'),
});

// Vote data schema
const VoteDataSchema = z.object({
  index: z.number().describe('Unique voter index'),
  account: z.string().describe('Voter account address'),
  voting_power: z.string().describe('Voting power weight (as string to handle large numbers)'),
});

// Query schemas
export const HasVotedSchema = BaseSchema.extend({
  index: z.number().describe('Voter index to check'),
});

export const GetVoteResultsSchema = BaseSchema;

// Write schemas
export const VoteSchema = BaseSchema.extend({
  vote_data: VoteDataSchema.describe('Vote data including index, account, and voting power'),
  proof: z.array(z.string()).describe('Merkle proof (array of 32-byte hex strings)'),
  approve: z.boolean().describe('true to vote for, false to vote against'),
});

// Export types
export type HasVotedParams = z.infer<typeof HasVotedSchema>;
export type GetVoteResultsParams = z.infer<typeof GetVoteResultsSchema>;
export type VoteParams = z.infer<typeof VoteSchema>;

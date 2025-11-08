/**
 * Zod parameter schemas for Governance plugin tools
 */

import { z } from 'zod';

/**
 * Governance type enum
 */
export const GovernanceTypeSchema = z.enum(['MerkleVoting', 'Multisig']).describe(
  'Type of governance: MerkleVoting or Multisig'
);

/**
 * Parameters for deploying governance
 */
export const DeployGovernanceSchema = z.object({
  admin: z.string().describe('Admin address for governance'),
  governance_type: GovernanceTypeSchema.describe('Type of governance to deploy'),
  owners: z.array(z.string()).optional().describe('Array of owner addresses (required for Multisig)'),
  threshold: z.number().optional().describe('Threshold for Multisig (e.g., 2 of 3)'),
  root_hash: z
    .string()
    .optional()
    .describe('Merkle root hash (required for MerkleVoting, 32-byte hex string)'),
  salt: z.string().optional().describe('Salt for deterministic deployment (32-byte hex)'),
});

/**
 * Parameters for getting governance by type
 */
export const GetGovernanceByTypeSchema = z.object({
  governance_type: GovernanceTypeSchema.describe('Type to filter by'),
});

/**
 * Parameters for getting governance by admin
 */
export const GetGovernanceByAdminSchema = z.object({
  admin: z.string().describe('Admin address to filter by'),
});

/**
 * Empty schema for methods with no parameters
 */
export const GetDeployedGovernanceSchema = z.object({});

export type DeployGovernanceParams = z.infer<typeof DeployGovernanceSchema>;
export type GetGovernanceByTypeParams = z.infer<typeof GetGovernanceByTypeSchema>;
export type GetGovernanceByAdminParams = z.infer<typeof GetGovernanceByAdminSchema>;
export type GetDeployedGovernanceParams = z.infer<typeof GetDeployedGovernanceSchema>;

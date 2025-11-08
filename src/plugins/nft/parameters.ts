/**
 * Zod parameter schemas for NFT plugin tools
 */

import { z } from 'zod';

/**
 * NFT type enum schema
 */
export const NFTTypeSchema = z.enum([
  'Enumerable',
  'Royalties',
  'AccessControl',
]);

/**
 * Parameters for deploying an NFT
 */
export const DeployNFTSchema = z.object({
  owner: z.string().describe('Owner address for the NFT contract'),
  admin: z.string().optional().describe('Admin address (for AccessControl NFTs)'),
  manager: z.string().optional().describe('Manager address (for Royalties NFTs)'),
  nft_type: NFTTypeSchema.describe('Type of NFT to deploy'),
  salt: z.string().optional().describe('Salt for deterministic deployment (32-byte hex)'),
});

/**
 * Parameters for getting deployed NFTs
 */
export const GetDeployedNFTsSchema = z.object({
  limit: z.number().optional().describe('Maximum number of NFTs to return'),
  offset: z.number().optional().describe('Offset for pagination'),
});

/**
 * Parameters for getting NFTs by type
 */
export const GetNFTsByTypeSchema = z.object({
  nft_type: NFTTypeSchema.describe('Type of NFTs to filter by'),
});

/**
 * Parameters for getting NFTs by owner
 */
export const GetNFTsByOwnerSchema = z.object({
  owner: z.string().describe('Owner address to filter by'),
});

export type DeployNFTParams = z.infer<typeof DeployNFTSchema>;
export type GetDeployedNFTsParams = z.infer<typeof GetDeployedNFTsSchema>;
export type GetNFTsByTypeParams = z.infer<typeof GetNFTsByTypeSchema>;
export type GetNFTsByOwnerParams = z.infer<typeof GetNFTsByOwnerSchema>;

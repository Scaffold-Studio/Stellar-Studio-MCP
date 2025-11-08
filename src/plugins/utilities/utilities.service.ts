/**
 * Utilities Service
 *
 * Provides utility functions for contract deployment via @Tool decorators
 */

import { Tool } from '../../core/Tool.decorator.js';
import type { StellarClient } from '../../core/WalletClientBase.js';
import {
  generateSalt,
  generateMultipleSalts,
  buildMerkleTree,
  createMerkleRootFromAddresses,
  validateTokenConfig,
  validateGovernanceConfig,
  buildTokenConfig,
  buildNFTConfig,
  buildGovernanceConfig,
  buildCappedTokenConfig,
  buildSimpleTokenConfig,
  buildMerkleVotingConfig,
  formatTokenAmount,
  parseTokenAmount,
  isValidAddress,
  type VoterLeaf,
} from '../../utils/index.js';

export class UtilitiesService {
  @Tool({
    description:
      'Generate a random 32-byte salt for contract deployment (64-character hex string)',
  })
  async generateSalt(
    _client: StellarClient,
    _params: {}
  ): Promise<{ salt: string; description: string }> {
    const salt = generateSalt();
    return {
      salt,
      description: '32-byte random salt (64-character hex string)',
    };
  }

  @Tool({
    description:
      'Generate multiple unique random salts for batch deployments (1-100 salts)',
  })
  async generateMultipleSalts(
    _client: StellarClient,
    params: { count: number }
  ): Promise<{ salts: string[]; count: number }> {
    if (params.count < 1 || params.count > 100) {
      throw new Error('Count must be between 1 and 100');
    }

    const salts = generateMultipleSalts(params.count);
    return { salts, count: params.count };
  }

  @Tool({
    description:
      'Create merkle root from voter addresses for governance voting - returns root hash to use in governance deployment',
  })
  async createMerkleRoot(
    _client: StellarClient,
    params: { addresses: string[] }
  ): Promise<{ root: string; leaf_count: number; description: string }> {
    if (!params.addresses || params.addresses.length === 0) {
      throw new Error('Address list cannot be empty');
    }

    const root = createMerkleRootFromAddresses(params.addresses);

    return {
      root,
      leaf_count: params.addresses.length,
      description: `Merkle root for ${params.addresses.length} voters - use this as root_hash parameter`,
    };
  }

  @Tool({
    description:
      'Build complete merkle tree with proofs for each voter - useful for frontend applications',
  })
  async buildMerkleTree(
    _client: StellarClient,
    params: { voters: VoterLeaf[] }
  ): Promise<{
    root: string;
    proofs: Record<string, string[]>;
    voter_count: number;
  }> {
    const tree = buildMerkleTree(params.voters);

    // Convert Map to plain object for JSON serialization
    const proofsObj: Record<string, string[]> = {};
    tree.proofs.forEach((proof, address) => {
      proofsObj[address] = proof;
    });

    return {
      root: tree.root,
      proofs: proofsObj,
      voter_count: params.voters.length,
    };
  }

  @Tool({
    description:
      'Validate Stellar address format - checks if address is valid public key or contract address',
  })
  async validateAddress(
    _client: StellarClient,
    params: { address: string }
  ): Promise<{ valid: boolean; address: string; type?: string }> {
    const valid = isValidAddress(params.address);
    let type: string | undefined;

    if (valid) {
      type = params.address.startsWith('G') ? 'public_key' : 'contract';
    }

    return { valid, address: params.address, type };
  }

  @Tool({
    description:
      'Validate token configuration before deployment - checks all parameters and returns any errors',
  })
  async validateTokenConfig(
    _client: StellarClient,
    params: any
  ): Promise<{ valid: boolean; errors: string[] }> {
    return validateTokenConfig(params);
  }

  @Tool({
    description:
      'Validate governance configuration before deployment - checks all parameters and returns any errors',
  })
  async validateGovernanceConfig(
    _client: StellarClient,
    params: any
  ): Promise<{ valid: boolean; errors: string[] }> {
    return validateGovernanceConfig(params);
  }

  @Tool({
    description:
      'Build complete token configuration with validation and auto-generated salt - handles all token types',
  })
  async buildTokenConfig(_client: StellarClient, params: any): Promise<any> {
    return buildTokenConfig(params);
  }

  @Tool({
    description:
      'Build complete NFT configuration with validation and auto-generated salt',
  })
  async buildNFTConfig(_client: StellarClient, params: any): Promise<any> {
    return buildNFTConfig(params);
  }

  @Tool({
    description:
      'Build complete governance configuration with validation and auto-generated salt',
  })
  async buildGovernanceConfig(_client: StellarClient, params: any): Promise<any> {
    return buildGovernanceConfig(params);
  }

  @Tool({
    description:
      'Quick builder for capped token - creates complete configuration with defaults (7 decimals, auto-generated salt)',
  })
  async buildCappedToken(
    _client: StellarClient,
    params: {
      admin: string;
      name: string;
      symbol: string;
      initialSupply: string;
      cap: string;
    }
  ): Promise<any> {
    return buildCappedTokenConfig(
      params.admin,
      params.name,
      params.symbol,
      params.initialSupply,
      params.cap
    );
  }

  @Tool({
    description:
      'Quick builder for simple pausable token - creates complete configuration with defaults',
  })
  async buildSimpleToken(
    _client: StellarClient,
    params: {
      admin: string;
      name: string;
      symbol: string;
      initialSupply: string;
    }
  ): Promise<any> {
    return buildSimpleTokenConfig(
      params.admin,
      params.name,
      params.symbol,
      params.initialSupply
    );
  }

  @Tool({
    description:
      'Quick builder for merkle voting governance - automatically generates merkle root from voter list',
  })
  async buildMerkleVoting(
    _client: StellarClient,
    params: { admin: string; voterAddresses: string[] }
  ): Promise<any> {
    return await buildMerkleVotingConfig(params.admin, params.voterAddresses);
  }

  @Tool({
    description:
      'Format token amount from human-readable to contract format (adds decimals) - e.g., "100" with 7 decimals => "1000000000"',
  })
  async formatTokenAmount(
    _client: StellarClient,
    params: { amount: string; decimals?: number }
  ): Promise<{ input: string; output: string; decimals: number }> {
    const decimals = params.decimals ?? 7;
    const output = formatTokenAmount(params.amount, decimals);
    return { input: params.amount, output, decimals };
  }

  @Tool({
    description:
      'Parse token amount from contract format to human-readable (removes decimals) - e.g., "1000000000" with 7 decimals => "100"',
  })
  async parseTokenAmount(
    _client: StellarClient,
    params: { amount: string; decimals?: number }
  ): Promise<{ input: string; output: string; decimals: number }> {
    const decimals = params.decimals ?? 7;
    const output = parseTokenAmount(params.amount, decimals);
    return { input: params.amount, output, decimals };
  }
}

/**
 * Utilities Plugin
 *
 * Provides helper tools for contract deployment - salt generation,
 * merkle trees, validation, and config builders
 */

import { PluginBase } from '../../core/PluginBase.js';
import { UtilitiesService } from './utilities.service.js';
import {
  GenerateSaltSchema,
  GenerateMultipleSaltsSchema,
  CreateMerkleRootSchema,
  BuildMerkleTreeSchema,
  ValidateAddressSchema,
  ValidateTokenConfigSchema,
  ValidateGovernanceConfigSchema,
  BuildTokenConfigSchema,
  BuildNFTConfigSchema,
  BuildGovernanceConfigSchema,
  BuildCappedTokenSchema,
  BuildSimpleTokenSchema,
  BuildMerkleVotingSchema,
  BuildMultisigSchema,
  FormatTokenAmountSchema,
  ParseTokenAmountSchema,
} from './parameters.js';
import { z } from 'zod';

export class UtilitiesPlugin extends PluginBase {
  constructor() {
    super('Utilities', [UtilitiesService]);
  }

  protected getParametersForMethod(methodName: string): z.ZodType {
    switch (methodName) {
      case 'generateSalt':
        return GenerateSaltSchema;
      case 'generateMultipleSalts':
        return GenerateMultipleSaltsSchema;
      case 'createMerkleRoot':
        return CreateMerkleRootSchema;
      case 'buildMerkleTree':
        return BuildMerkleTreeSchema;
      case 'validateAddress':
        return ValidateAddressSchema;
      case 'validateTokenConfig':
        return ValidateTokenConfigSchema;
      case 'validateGovernanceConfig':
        return ValidateGovernanceConfigSchema;
      case 'buildTokenConfig':
        return BuildTokenConfigSchema;
      case 'buildNFTConfig':
        return BuildNFTConfigSchema;
      case 'buildGovernanceConfig':
        return BuildGovernanceConfigSchema;
      case 'buildCappedToken':
        return BuildCappedTokenSchema;
      case 'buildSimpleToken':
        return BuildSimpleTokenSchema;
      case 'buildMerkleVoting':
        return BuildMerkleVotingSchema;
      case 'buildMultisig':
        return BuildMultisigSchema;
      case 'formatTokenAmount':
        return FormatTokenAmountSchema;
      case 'parseTokenAmount':
        return ParseTokenAmountSchema;
      default:
        throw new Error(`Unknown method: ${methodName}`);
    }
  }
}

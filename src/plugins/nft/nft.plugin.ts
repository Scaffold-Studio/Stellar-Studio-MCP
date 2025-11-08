/**
 * NFT Plugin
 *
 * Provides tools for NFT deployment and management
 */

import { PluginBase } from '../../core/PluginBase.js';
import { NFTService } from './nft.service.js';
import {
  DeployNFTSchema,
  GetDeployedNFTsSchema,
  GetNFTsByTypeSchema,
  GetNFTsByOwnerSchema,
} from './parameters.js';
import { z } from 'zod';

export class NFTPlugin extends PluginBase {
  constructor() {
    super('NFT', [NFTService]);
  }

  protected getParametersForMethod(methodName: string): z.ZodType {
    switch (methodName) {
      case 'deployNFT':
        return DeployNFTSchema;
      case 'getDeployedNFTs':
        return GetDeployedNFTsSchema;
      case 'getNFTsByType':
        return GetNFTsByTypeSchema;
      case 'getNFTsByOwner':
        return GetNFTsByOwnerSchema;
      case 'getNFTCount':
        return z.object({}); // No parameters
      default:
        throw new Error(`Unknown method: ${methodName}`);
    }
  }
}

/**
 * Token Plugin
 *
 * Provides tools for token deployment and management
 */

import { PluginBase } from '../../core/PluginBase.js';
import { TokenService } from './token.service.js';
import {
  DeployTokenSchema,
  GetDeployedTokensSchema,
  GetTokensByTypeSchema,
  GetTokensByAdminSchema,
} from './parameters.js';
import { z } from 'zod';

export class TokenPlugin extends PluginBase {
  constructor() {
    super('Token', [TokenService]);
  }

  protected getParametersForMethod(methodName: string): z.ZodType {
    switch (methodName) {
      case 'deployToken':
        return DeployTokenSchema;
      case 'getDeployedTokens':
        return GetDeployedTokensSchema;
      case 'getTokensByType':
        return GetTokensByTypeSchema;
      case 'getTokensByAdmin':
        return GetTokensByAdminSchema;
      case 'getTokenCount':
        return z.object({}); // No parameters
      default:
        throw new Error(`Unknown method: ${methodName}`);
    }
  }
}

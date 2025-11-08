/**
 * Governance Plugin
 */

import { PluginBase } from '../../core/PluginBase.js';
import { GovernanceService } from './governance.service.js';
import {
  DeployGovernanceSchema,
  GetDeployedGovernanceSchema,
  GetGovernanceByTypeSchema,
  GetGovernanceByAdminSchema
} from './parameters.js';
import { z } from 'zod';

export class GovernancePlugin extends PluginBase {
  constructor() {
    super('Governance', [GovernanceService]);
  }

  protected getParametersForMethod(methodName: string): z.ZodType {
    switch (methodName) {
      case 'deployGovernance':
        return DeployGovernanceSchema;
      case 'getDeployedGovernance':
        return GetDeployedGovernanceSchema;
      case 'getGovernanceByType':
        return GetGovernanceByTypeSchema;
      case 'getGovernanceByAdmin':
        return GetGovernanceByAdminSchema;
      case 'getGovernanceCount':
        return z.object({});
      default:
        throw new Error(`Unknown method: ${methodName}`);
    }
  }
}

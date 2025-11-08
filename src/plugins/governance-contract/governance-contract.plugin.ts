/**
 * Governance Contract Plugin
 */
import { PluginBase } from '../../core/PluginBase.js';
import { GovernanceContractService } from './governance-contract.service.js';
import * as S from './parameters.js';
import { z } from 'zod';

export class GovernanceContractPlugin extends PluginBase {
  constructor() {
    super('GovernanceContract', [GovernanceContractService]);
  }

  protected getParametersForMethod(methodName: string): z.ZodType {
    const map: Record<string, z.ZodType> = {
      hasVoted: S.HasVotedSchema,
      getVoteResults: S.GetVoteResultsSchema,
      vote: S.VoteSchema,
    };
    if (!map[methodName]) throw new Error(`Unknown method: ${methodName}`);
    return map[methodName];
  }
}

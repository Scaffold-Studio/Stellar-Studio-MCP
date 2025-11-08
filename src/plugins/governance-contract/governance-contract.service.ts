/**
 * Governance Contract service - 3 interaction methods
 */
import { Tool } from '../../core/Tool.decorator.js';
import type { StellarClient, ToolResult } from '../../core/index.js';
import { GovernanceContractClient } from '../../clients/index.js';
import type * as P from './parameters.js';

export class GovernanceContractService {
  @Tool({ name: 'governance_contract_has_voted', description: 'Check if address has voted' })
  async hasVoted(sc: StellarClient, p: P.HasVotedParams): Promise<ToolResult<boolean>> {
    try {
      const c = new GovernanceContractClient(p.contract_address, sc);
      const r = await (await c.hasVoted(p.index)).simulate();
      return { success: true, data: r.result, suggestion: `Voted: ${r.result}` };
    } catch (e: any) { return { success: false, error: e.message }; }
  }

  @Tool({ name: 'governance_contract_get_vote_results', description: 'Get current vote results' })
  async getVoteResults(sc: StellarClient, p: P.GetVoteResultsParams): Promise<ToolResult<{ votes_pro: string; votes_against: string }>> {
    try {
      const c = new GovernanceContractClient(p.contract_address, sc);
      const r = await (await c.getVoteResults()).simulate();
      const [pro, against] = r.result;
      return {
        success: true,
        data: { votes_pro: pro.toString(), votes_against: against.toString() },
        suggestion: `Pro: ${pro}, Against: ${against}`,
      };
    } catch (e: any) { return { success: false, error: e.message }; }
  }

  @Tool({ name: 'governance_contract_vote', description: 'Cast vote with merkle proof' })
  async vote(sc: StellarClient, p: P.VoteParams): Promise<ToolResult<string>> {
    try {
      const c = new GovernanceContractClient(p.contract_address, sc);
      // Convert hex strings to Buffers
      const proofBuffers = p.proof.map((hex) => Buffer.from(hex, 'hex'));
      await (await c.vote(p.vote_data, proofBuffers, p.approve)).signAndSend();
      return {
        success: true,
        data: 'success',
        suggestion: `Vote cast: ${p.approve ? 'FOR' : 'AGAINST'}`,
      };
    } catch (e: any) { return { success: false, error: e.message }; }
  }
}

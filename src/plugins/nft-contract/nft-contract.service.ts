/**
 * NFT Contract service - 17 interaction methods
 */
import { Tool } from '../../core/Tool.decorator.js';
import type { StellarClient, ToolResult } from '../../core/index.js';
import { NFTContractClient } from '../../clients/index.js';
import type * as P from './parameters.js';

export class NFTContractService {
  @Tool({ name: 'nft_contract_balance', description: 'Get NFT balance of an account' })
  async getBalance(sc: StellarClient, p: P.GetBalanceParams): Promise<ToolResult<number>> {
    try {
      const c = new NFTContractClient(p.contract_address, sc);
      const r = await (await c.balance(p.account)).simulate();
      return { success: true, data: r.result, suggestion: `Balance: ${r.result}` };
    } catch (e: any) { return { success: false, error: e.message }; }
  }

  @Tool({ name: 'nft_contract_owner_of', description: 'Get owner of NFT' })
  async getOwnerOf(sc: StellarClient, p: P.GetOwnerOfParams): Promise<ToolResult<string>> {
    try {
      const c = new NFTContractClient(p.contract_address, sc);
      const r = await (await c.ownerOf(p.token_id)).simulate();
      return { success: true, data: r.result, suggestion: `Owner: ${r.result}` };
    } catch (e: any) { return { success: false, error: e.message }; }
  }

  @Tool({ name: 'nft_contract_get_approved', description: 'Get approved address for NFT' })
  async getApproved(sc: StellarClient, p: P.GetApprovedParams): Promise<ToolResult<string>> {
    try {
      const c = new NFTContractClient(p.contract_address, sc);
      const r = await (await c.getApproved(p.token_id)).simulate();
      return { success: true, data: r.result, suggestion: `Approved: ${r.result}` };
    } catch (e: any) { return { success: false, error: e.message }; }
  }

  @Tool({ name: 'nft_contract_is_approved_for_all', description: 'Check if operator approved for all' })
  async isApprovedForAll(sc: StellarClient, p: P.IsApprovedForAllParams): Promise<ToolResult<boolean>> {
    try {
      const c = new NFTContractClient(p.contract_address, sc);
      const r = await (await c.isApprovedForAll(p.owner, p.operator)).simulate();
      return { success: true, data: r.result, suggestion: `Approved: ${r.result}` };
    } catch (e: any) { return { success: false, error: e.message }; }
  }

  @Tool({ name: 'nft_contract_token_uri', description: 'Get token URI' })
  async getTokenUri(sc: StellarClient, p: P.GetTokenUriParams): Promise<ToolResult<string>> {
    try {
      const c = new NFTContractClient(p.contract_address, sc);
      const r = await (await c.tokenUri(p.token_id)).simulate();
      return { success: true, data: r.result, suggestion: `URI: ${r.result}` };
    } catch (e: any) { return { success: false, error: e.message }; }
  }

  @Tool({ name: 'nft_contract_name', description: 'Get NFT collection name' })
  async getName(sc: StellarClient, p: P.GetNameParams): Promise<ToolResult<string>> {
    try {
      const c = new NFTContractClient(p.contract_address, sc);
      const r = await (await c.name()).simulate();
      return { success: true, data: r.result, suggestion: `Name: ${r.result}` };
    } catch (e: any) { return { success: false, error: e.message }; }
  }

  @Tool({ name: 'nft_contract_symbol', description: 'Get NFT collection symbol' })
  async getSymbol(sc: StellarClient, p: P.GetSymbolParams): Promise<ToolResult<string>> {
    try {
      const c = new NFTContractClient(p.contract_address, sc);
      const r = await (await c.symbol()).simulate();
      return { success: true, data: r.result, suggestion: `Symbol: ${r.result}` };
    } catch (e: any) { return { success: false, error: e.message }; }
  }

  @Tool({ name: 'nft_contract_total_supply', description: 'Get total NFTs (Enumerable only)' })
  async getTotalSupply(sc: StellarClient, p: P.GetTotalSupplyParams): Promise<ToolResult<number>> {
    try {
      const c = new NFTContractClient(p.contract_address, sc);
      const r = await (await c.totalSupply()).simulate();
      return { success: true, data: r.result, suggestion: `Total: ${r.result}` };
    } catch (e: any) { return { success: false, error: e.message }; }
  }

  @Tool({ name: 'nft_contract_get_owner_token_id', description: 'Get token ID by owner index' })
  async getOwnerTokenId(sc: StellarClient, p: P.GetOwnerTokenIdParams): Promise<ToolResult<number>> {
    try {
      const c = new NFTContractClient(p.contract_address, sc);
      const r = await (await c.getOwnerTokenId(p.owner, p.index)).simulate();
      return { success: true, data: r.result, suggestion: `Token ID: ${r.result}` };
    } catch (e: any) { return { success: false, error: e.message }; }
  }

  @Tool({ name: 'nft_contract_get_token_id', description: 'Get token ID by global index' })
  async getTokenId(sc: StellarClient, p: P.GetTokenIdParams): Promise<ToolResult<number>> {
    try {
      const c = new NFTContractClient(p.contract_address, sc);
      const r = await (await c.getTokenId(p.index)).simulate();
      return { success: true, data: r.result, suggestion: `Token ID: ${r.result}` };
    } catch (e: any) { return { success: false, error: e.message }; }
  }

  @Tool({ name: 'nft_contract_mint', description: 'Mint new NFT (owner-only)' })
  async mint(sc: StellarClient, p: P.MintParams): Promise<ToolResult<number>> {
    try {
      const c = new NFTContractClient(p.contract_address, sc);
      const { result } = await (await c.mint(p.to)).signAndSend();
      return { success: true, data: result as number, suggestion: `Minted NFT #${result}` };
    } catch (e: any) { return { success: false, error: e.message }; }
  }

  @Tool({ name: 'nft_contract_transfer', description: 'Transfer NFT' })
  async transfer(sc: StellarClient, p: P.TransferParams): Promise<ToolResult<string>> {
    try {
      const c = new NFTContractClient(p.contract_address, sc);
      await (await c.transfer(p.from, p.to, p.token_id)).signAndSend();
      return { success: true, data: 'success', suggestion: `Transferred NFT #${p.token_id}` };
    } catch (e: any) { return { success: false, error: e.message }; }
  }

  @Tool({ name: 'nft_contract_transfer_from', description: 'Transfer NFT on behalf' })
  async transferFrom(sc: StellarClient, p: P.TransferFromParams): Promise<ToolResult<string>> {
    try {
      const c = new NFTContractClient(p.contract_address, sc);
      await (await c.transferFrom(p.spender, p.from, p.to, p.token_id)).signAndSend();
      return { success: true, data: 'success', suggestion: `Transferred NFT #${p.token_id}` };
    } catch (e: any) { return { success: false, error: e.message }; }
  }

  @Tool({ name: 'nft_contract_approve', description: 'Approve address for NFT' })
  async approve(sc: StellarClient, p: P.ApproveParams): Promise<ToolResult<string>> {
    try {
      const c = new NFTContractClient(p.contract_address, sc);
      await (await c.approve(p.approver, p.approved, p.token_id, p.live_until_ledger)).signAndSend();
      return { success: true, data: 'success', suggestion: `Approved ${p.approved}` };
    } catch (e: any) { return { success: false, error: e.message }; }
  }

  @Tool({ name: 'nft_contract_approve_for_all', description: 'Approve operator for all NFTs' })
  async approveForAll(sc: StellarClient, p: P.ApproveForAllParams): Promise<ToolResult<string>> {
    try {
      const c = new NFTContractClient(p.contract_address, sc);
      await (await c.approveForAll(p.owner, p.operator, p.live_until_ledger)).signAndSend();
      return { success: true, data: 'success', suggestion: `Approved ${p.operator} for all` };
    } catch (e: any) { return { success: false, error: e.message }; }
  }

  @Tool({ name: 'nft_contract_burn', description: 'Burn NFT' })
  async burn(sc: StellarClient, p: P.BurnParams): Promise<ToolResult<string>> {
    try {
      const c = new NFTContractClient(p.contract_address, sc);
      await (await c.burn(p.from, p.token_id)).signAndSend();
      return { success: true, data: 'success', suggestion: `Burned NFT #${p.token_id}` };
    } catch (e: any) { return { success: false, error: e.message }; }
  }

  @Tool({ name: 'nft_contract_burn_from', description: 'Burn NFT on behalf' })
  async burnFrom(sc: StellarClient, p: P.BurnFromParams): Promise<ToolResult<string>> {
    try {
      const c = new NFTContractClient(p.contract_address, sc);
      await (await c.burnFrom(p.spender, p.from, p.token_id)).signAndSend();
      return { success: true, data: 'success', suggestion: `Burned NFT #${p.token_id}` };
    } catch (e: any) { return { success: false, error: e.message }; }
  }
}

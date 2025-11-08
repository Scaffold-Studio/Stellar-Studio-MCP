/**
 * Token Contract service with @Tool decorated methods
 *
 * Provides tools for interacting with deployed token contracts
 */

import { Tool } from '../../core/Tool.decorator.js';
import type { StellarClient, ToolResult } from '../../core/index.js';
import { TokenContractClient } from '../../clients/index.js';
import type {
  GetBalanceParams,
  GetTotalSupplyParams,
  GetAllowanceParams,
  GetDecimalsParams,
  GetNameParams,
  GetSymbolParams,
  GetPausedParams,
  TransferParams,
  TransferFromParams,
  ApproveParams,
  MintParams,
  BurnParams,
  BurnFromParams,
  PauseParams,
  UnpauseParams,
} from './parameters.js';

export class TokenContractService {
  /**
   * Get token balance
   */
  @Tool({
    name: 'token_contract_balance',
    description: 'Get token balance of an account',
  })
  async getBalance(
    stellarClient: StellarClient,
    params: GetBalanceParams
  ): Promise<ToolResult<string>> {
    try {
      const client = new TokenContractClient(params.contract_address, stellarClient);
      const assembled = await client.balance(params.account);
      const simulation = await assembled.simulate();
      const balance = simulation.result;

      return {
        success: true,
        data: balance.toString(),
        suggestion: `Balance: ${balance}`,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Failed to get balance',
      };
    }
  }

  /**
   * Get total supply
   */
  @Tool({
    name: 'token_contract_total_supply',
    description: 'Get total token supply',
  })
  async getTotalSupply(
    stellarClient: StellarClient,
    params: GetTotalSupplyParams
  ): Promise<ToolResult<string>> {
    try {
      const client = new TokenContractClient(params.contract_address, stellarClient);
      const assembled = await client.totalSupply();
      const simulation = await assembled.simulate();
      const totalSupply = simulation.result;

      return {
        success: true,
        data: totalSupply.toString(),
        suggestion: `Total Supply: ${totalSupply}`,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Failed to get total supply',
      };
    }
  }

  /**
   * Get allowance
   */
  @Tool({
    name: 'token_contract_allowance',
    description: 'Get allowance for spender',
  })
  async getAllowance(
    stellarClient: StellarClient,
    params: GetAllowanceParams
  ): Promise<ToolResult<string>> {
    try {
      const client = new TokenContractClient(params.contract_address, stellarClient);
      const assembled = await client.allowance(params.owner, params.spender);
      const simulation = await assembled.simulate();
      const allowance = simulation.result;

      return {
        success: true,
        data: allowance.toString(),
        suggestion: `Allowance: ${allowance}`,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Failed to get allowance',
      };
    }
  }

  /**
   * Get decimals
   */
  @Tool({
    name: 'token_contract_decimals',
    description: 'Get token decimals',
  })
  async getDecimals(
    stellarClient: StellarClient,
    params: GetDecimalsParams
  ): Promise<ToolResult<number>> {
    try {
      const client = new TokenContractClient(params.contract_address, stellarClient);
      const assembled = await client.decimals();
      const simulation = await assembled.simulate();
      const decimals = simulation.result;

      return {
        success: true,
        data: decimals,
        suggestion: `Decimals: ${decimals}`,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Failed to get decimals',
      };
    }
  }

  /**
   * Get token name
   */
  @Tool({
    name: 'token_contract_name',
    description: 'Get token name',
  })
  async getName(
    stellarClient: StellarClient,
    params: GetNameParams
  ): Promise<ToolResult<string>> {
    try {
      const client = new TokenContractClient(params.contract_address, stellarClient);
      const assembled = await client.name();
      const simulation = await assembled.simulate();
      const name = simulation.result;

      return {
        success: true,
        data: name,
        suggestion: `Token Name: ${name}`,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Failed to get name',
      };
    }
  }

  /**
   * Get token symbol
   */
  @Tool({
    name: 'token_contract_symbol',
    description: 'Get token symbol',
  })
  async getSymbol(
    stellarClient: StellarClient,
    params: GetSymbolParams
  ): Promise<ToolResult<string>> {
    try {
      const client = new TokenContractClient(params.contract_address, stellarClient);
      const assembled = await client.symbol();
      const simulation = await assembled.simulate();
      const symbol = simulation.result;

      return {
        success: true,
        data: symbol,
        suggestion: `Token Symbol: ${symbol}`,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Failed to get symbol',
      };
    }
  }

  /**
   * Check if token is paused
   */
  @Tool({
    name: 'token_contract_paused',
    description: 'Check if token is paused (Pausable tokens only)',
  })
  async getPaused(
    stellarClient: StellarClient,
    params: GetPausedParams
  ): Promise<ToolResult<boolean>> {
    try {
      const client = new TokenContractClient(params.contract_address, stellarClient);
      const assembled = await client.paused();
      const simulation = await assembled.simulate();
      const paused = simulation.result;

      return {
        success: true,
        data: paused,
        suggestion: `Token is ${paused ? 'paused' : 'not paused'}`,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Failed to get paused status',
      };
    }
  }

  /**
   * Transfer tokens
   */
  @Tool({
    name: 'token_contract_transfer',
    description: 'Transfer tokens from one account to another',
  })
  async transfer(
    stellarClient: StellarClient,
    params: TransferParams
  ): Promise<ToolResult<string>> {
    try {
      const client = new TokenContractClient(params.contract_address, stellarClient);
      const assembled = await client.transfer(params.from, params.to, params.amount);
      const { result } = await assembled.signAndSend();

      return {
        success: true,
        data: (result ?? '') as string,
        suggestion: `Transferred ${params.amount} tokens from ${params.from} to ${params.to}`,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Failed to transfer tokens',
      };
    }
  }

  /**
   * Transfer tokens on behalf
   */
  @Tool({
    name: 'token_contract_transfer_from',
    description: 'Transfer tokens on behalf of another account (requires allowance)',
  })
  async transferFrom(
    stellarClient: StellarClient,
    params: TransferFromParams
  ): Promise<ToolResult<string>> {
    try {
      const client = new TokenContractClient(params.contract_address, stellarClient);
      const assembled = await client.transferFrom(
        params.spender,
        params.from,
        params.to,
        params.amount
      );
      const { result } = await assembled.signAndSend();

      return {
        success: true,
        data: (result ?? '') as string,
        suggestion: `Transferred ${params.amount} tokens from ${params.from} to ${params.to} via ${params.spender}`,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Failed to transfer tokens',
      };
    }
  }

  /**
   * Approve spender
   */
  @Tool({
    name: 'token_contract_approve',
    description: 'Approve spender to transfer tokens on behalf',
  })
  async approve(
    stellarClient: StellarClient,
    params: ApproveParams
  ): Promise<ToolResult<string>> {
    try {
      const client = new TokenContractClient(params.contract_address, stellarClient);
      const assembled = await client.approve(
        params.owner,
        params.spender,
        params.amount,
        params.live_until_ledger
      );
      const { result } = await assembled.signAndSend();

      return {
        success: true,
        data: (result ?? '') as string,
        suggestion: `Approved ${params.spender} to spend ${params.amount} tokens until ledger ${params.live_until_ledger}`,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Failed to approve spender',
      };
    }
  }

  /**
   * Mint tokens
   */
  @Tool({
    name: 'token_contract_mint',
    description: 'Mint new tokens (owner-only)',
  })
  async mint(
    stellarClient: StellarClient,
    params: MintParams
  ): Promise<ToolResult<string>> {
    try {
      const client = new TokenContractClient(params.contract_address, stellarClient);
      const assembled = await client.mint(params.account, params.amount);
      const { result } = await assembled.signAndSend();

      return {
        success: true,
        data: (result ?? '') as string,
        suggestion: `Minted ${params.amount} tokens to ${params.account}`,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Failed to mint tokens',
      };
    }
  }

  /**
   * Burn tokens
   */
  @Tool({
    name: 'token_contract_burn',
    description: 'Burn tokens from an account',
  })
  async burn(
    stellarClient: StellarClient,
    params: BurnParams
  ): Promise<ToolResult<string>> {
    try {
      const client = new TokenContractClient(params.contract_address, stellarClient);
      const assembled = await client.burn(params.from, params.amount);
      const { result } = await assembled.signAndSend();

      return {
        success: true,
        data: (result ?? '') as string,
        suggestion: `Burned ${params.amount} tokens from ${params.from}`,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Failed to burn tokens',
      };
    }
  }

  /**
   * Burn tokens on behalf
   */
  @Tool({
    name: 'token_contract_burn_from',
    description: 'Burn tokens on behalf of another account (requires allowance)',
  })
  async burnFrom(
    stellarClient: StellarClient,
    params: BurnFromParams
  ): Promise<ToolResult<string>> {
    try {
      const client = new TokenContractClient(params.contract_address, stellarClient);
      const assembled = await client.burnFrom(params.spender, params.from, params.amount);
      const { result } = await assembled.signAndSend();

      return {
        success: true,
        data: (result ?? '') as string,
        suggestion: `Burned ${params.amount} tokens from ${params.from} via ${params.spender}`,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Failed to burn tokens',
      };
    }
  }

  /**
   * Pause token
   */
  @Tool({
    name: 'token_contract_pause',
    description: 'Pause token (Pausable tokens only, owner-only)',
  })
  async pause(
    stellarClient: StellarClient,
    params: PauseParams
  ): Promise<ToolResult<string>> {
    try {
      const client = new TokenContractClient(params.contract_address, stellarClient);
      const assembled = await client.pause(params.caller);
      const { result } = await assembled.signAndSend();

      return {
        success: true,
        data: (result ?? '') as string,
        suggestion: `Token paused successfully`,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Failed to pause token',
      };
    }
  }

  /**
   * Unpause token
   */
  @Tool({
    name: 'token_contract_unpause',
    description: 'Unpause token (Pausable tokens only, owner-only)',
  })
  async unpause(
    stellarClient: StellarClient,
    params: UnpauseParams
  ): Promise<ToolResult<string>> {
    try {
      const client = new TokenContractClient(params.contract_address, stellarClient);
      const assembled = await client.unpause(params.caller);
      const { result } = await assembled.signAndSend();

      return {
        success: true,
        data: (result ?? '') as string,
        suggestion: `Token unpaused successfully`,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Failed to unpause token',
      };
    }
  }
}

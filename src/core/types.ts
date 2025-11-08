/**
 * Core type definitions for Stellar Studio MCP Server
 *
 * Provides Stellar-specific type definitions for network configuration,
 * transactions, tools, and results.
 */

import type { Keypair, rpc } from '@stellar/stellar-sdk';
import type { AssembledTransaction } from '@stellar/stellar-sdk/contract';

/**
 * Supported blockchain - Stellar only
 */
export type Chain = 'stellar';

/**
 * Network types
 */
export type Network = 'local' | 'testnet' | 'mainnet';

/**
 * Network configuration
 */
export interface NetworkConfig {
  name: Network;
  networkPassphrase: string;
  rpcUrl: string;
  horizonUrl?: string;
}

/**
 * Stellar client context
 *
 * Holds the keypair, RPC connection, and network configuration
 * needed for all Stellar operations.
 */
export interface StellarContext {
  keypair: Keypair;
  rpc: rpc.Server;
  network: NetworkConfig;
}

/**
 * Balance information for an account
 */
export interface Balance {
  address: string;
  balance: string;
  asset: {
    code: string;
    issuer?: string;
  };
}

/**
 * Transaction result from Stellar network
 */
export interface TransactionResult {
  hash: string;
  status: rpc.Api.GetTransactionStatus;
  response?: rpc.Api.GetTransactionResponse;
  error?: string;
}

/**
 * Tool metadata for @Tool decorator
 */
export interface ToolMetadata {
  name?: string;
  description: string;
}

/**
 * Standardized tool result
 */
export interface ToolResult<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  suggestion?: string;
}

/**
 * Contract configuration
 */
export interface ContractConfig {
  contractId: string;
  network: Network;
}

/**
 * Contract method invocation result
 */
export interface ContractInvocationResult<T = any> {
  assembled: AssembledTransaction<T>;
  simulation?: rpc.Api.SimulateTransactionResponse;
  result?: T;
}

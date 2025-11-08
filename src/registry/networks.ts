/**
 * Network configurations for Stellar networks
 *
 * Provides network passphrases and RPC/Horizon URLs for local, testnet, and mainnet.
 */

import type { Network, NetworkConfig } from '../core/types.js';

/**
 * Network configurations mapped by network name
 */
export const NETWORKS: Record<Network, NetworkConfig> = {
  local: {
    name: 'local',
    networkPassphrase: 'Standalone Network ; February 2017',
    rpcUrl: 'http://localhost:8000/rpc',
    horizonUrl: 'http://localhost:8000',
  },
  testnet: {
    name: 'testnet',
    networkPassphrase: 'Test SDF Network ; September 2015',
    rpcUrl: 'https://soroban-testnet.stellar.org',
    horizonUrl: 'https://horizon-testnet.stellar.org',
  },
  mainnet: {
    name: 'mainnet',
    networkPassphrase: 'Public Global Stellar Network ; September 2015',
    rpcUrl: 'https://soroban.stellar.org',
    horizonUrl: 'https://horizon.stellar.org',
  },
};

/**
 * Get network configuration by name
 */
export function getNetwork(network: Network): NetworkConfig {
  return NETWORKS[network];
}

/**
 * Default network (local for development)
 */
export const DEFAULT_NETWORK: Network = 'local';

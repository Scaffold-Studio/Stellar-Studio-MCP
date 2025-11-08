/**
 * WASM Hash registry
 *
 * Contains hashes of compiled WASM contracts used by factories
 * to deploy contract instances. From CONTRACT_REGISTRY.md
 */

/**
 * WASM template types
 */
export type WasmTemplate =
  | 'master_factory'
  | 'token_factory'
  | 'nft_factory'
  | 'governance_factory'
  | 'fungible_allowlist'
  | 'fungible_blocklist'
  | 'fungible_capped'
  | 'fungible_pausable'
  | 'fungible_vault'
  | 'nft_enumerable'
  | 'nft_royalties'
  | 'nft_access_control';

/**
 * WASM hashes for all contract templates
 */
export const WASM_HASHES: Record<WasmTemplate, string> = {
  // Factory WASM hashes
  master_factory: '708457719cbee1b6be2c4f35e51730af0bedf7d91ad29d80c47a62ab5447f43c',
  token_factory: 'e37433d025c95dc9cb282aae9fe3d08e1f0e7714259061e44eee6b87aae64523',
  nft_factory: '0e363177016d329e797fb99d54739ec61a8075fd6da9d1cce0ab2c7e1967c532',
  governance_factory: 'f8c8ef69b31f9c3c82d8f46bf5a53ef3853118730ef19ec727183e1dc640f80c',

  // Token template WASM hashes (used by TokenFactory)
  fungible_allowlist: '9d9673e2110bb9fbbb81ce4f45ed86c8e0fd1b16db5f223e272dc8965597fc89',
  fungible_blocklist: '3c64ad23e6f9b90a557ea2025d1a377ba7d17c0f4283f3f5f3f2801c51739468',
  fungible_capped: '9803d27f51d2deea6947974430d5a63b7a0c7bbcecbfd3efc32a93750745ae01',
  fungible_pausable: 'b8c80f87fccee3f374567fb12667851359cbeb88754e55681f65c18add88302d',
  fungible_vault: '1e6850d877241dd8e27d5f5173a99b772c9891e1d2f71f5e5f4e8b0dd863b11f',

  // NFT template WASM hashes (used by NFTFactory)
  nft_enumerable: 'cfcb55fb716f2c1d43f6970cb6eabbdf5b919fa9f21dc83eb4a7189966b46b6a',
  nft_royalties: '48aa20c80a6216facd99eb3f778a82a4451844d289b197c5c1764b0e82b03bfb',
  nft_access_control: '7bcfa202d9bbc4d46820e0ac70ef2ed6fb69d0a96787aeb3b095b408b594a7b6',
};

/**
 * Get WASM hash by template name
 */
export function getWasmHash(template: WasmTemplate): string {
  return WASM_HASHES[template];
}

/**
 * Get WASM hash as Buffer
 */
export function getWasmHashBuffer(template: WasmTemplate): Buffer {
  return Buffer.from(WASM_HASHES[template], 'hex');
}

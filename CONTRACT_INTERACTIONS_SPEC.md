# Contract Interaction Tools Specification

This document specifies all contract interaction tools to be implemented for interacting with deployed tokens, NFTs, and governance contracts.

## Architecture

All contract interaction tools follow this pattern:
1. Accept `contract_address` parameter to specify which deployed contract to interact with
2. Create client wrapper for that specific contract address
3. Call the contract method
4. Return standardized `ToolResult`

## Token Contract Interaction (15 methods)

Tool prefix: `token_contract_*`

### Read-Only Methods (Queries)
1. **token_contract_balance** - Get token balance of an account
   - Params: contract_address, account
   - Returns: i128 (balance)

2. **token_contract_total_supply** - Get total token supply
   - Params: contract_address
   - Returns: i128 (total supply)

3. **token_contract_allowance** - Get allowance for spender
   - Params: contract_address, owner, spender
   - Returns: i128 (allowance amount)

4. **token_contract_decimals** - Get token decimals
   - Params: contract_address
   - Returns: u32 (decimals)

5. **token_contract_name** - Get token name
   - Params: contract_address
   - Returns: string (name)

6. **token_contract_symbol** - Get token symbol
   - Params: contract_address
   - Returns: string (symbol)

7. **token_contract_paused** - Check if token is paused (Pausable tokens only)
   - Params: contract_address
   - Returns: boolean (paused status)

### Write Methods (Transactions)
8. **token_contract_transfer** - Transfer tokens
   - Params: contract_address, from, to, amount
   - Returns: transaction hash

9. **token_contract_transfer_from** - Transfer tokens on behalf
   - Params: contract_address, spender, from, to, amount
   - Returns: transaction hash

10. **token_contract_approve** - Approve spender
    - Params: contract_address, owner, spender, amount, live_until_ledger
    - Returns: transaction hash

11. **token_contract_mint** - Mint new tokens (owner-only)
    - Params: contract_address, account, amount
    - Returns: transaction hash

12. **token_contract_burn** - Burn tokens
    - Params: contract_address, from, amount
    - Returns: transaction hash

13. **token_contract_burn_from** - Burn tokens on behalf
    - Params: contract_address, spender, from, amount
    - Returns: transaction hash

14. **token_contract_pause** - Pause token (Pausable tokens only, owner-only)
    - Params: contract_address, caller
    - Returns: transaction hash

15. **token_contract_unpause** - Unpause token (Pausable tokens only, owner-only)
    - Params: contract_address, caller
    - Returns: transaction hash

## NFT Contract Interaction (12 methods)

Tool prefix: `nft_contract_*`

### Read-Only Methods (Queries)
1. **nft_contract_balance** - Get NFT balance of account
   - Params: contract_address, account
   - Returns: u32 (number of NFTs owned)

2. **nft_contract_owner_of** - Get owner of NFT
   - Params: contract_address, token_id
   - Returns: string (owner address)

3. **nft_contract_get_approved** - Get approved address for NFT
   - Params: contract_address, token_id
   - Returns: string (approved address)

4. **nft_contract_is_approved_for_all** - Check if operator approved for all
   - Params: contract_address, owner, operator
   - Returns: boolean (approved status)

5. **nft_contract_token_uri** - Get token URI
   - Params: contract_address, token_id
   - Returns: string (URI)

6. **nft_contract_name** - Get collection name
   - Params: contract_address
   - Returns: string (name)

7. **nft_contract_symbol** - Get collection symbol
   - Params: contract_address
   - Returns: string (symbol)

8. **nft_contract_total_supply** - Get total NFTs (Enumerable only)
   - Params: contract_address
   - Returns: u32 (total supply)

9. **nft_contract_get_owner_token_id** - Get token ID by owner index (Enumerable only)
   - Params: contract_address, owner, index
   - Returns: u32 (token_id)

10. **nft_contract_get_token_id** - Get token ID by global index (Enumerable only)
    - Params: contract_address, index
    - Returns: u32 (token_id)

### Write Methods (Transactions)
11. **nft_contract_mint** - Mint new NFT (owner-only)
    - Params: contract_address, to
    - Returns: u32 (token_id), transaction hash

12. **nft_contract_transfer** - Transfer NFT
    - Params: contract_address, from, to, token_id
    - Returns: transaction hash

13. **nft_contract_transfer_from** - Transfer NFT on behalf
    - Params: contract_address, spender, from, to, token_id
    - Returns: transaction hash

14. **nft_contract_approve** - Approve address for NFT
    - Params: contract_address, approver, approved, token_id, live_until_ledger
    - Returns: transaction hash

15. **nft_contract_approve_for_all** - Approve operator for all NFTs
    - Params: contract_address, owner, operator, live_until_ledger
    - Returns: transaction hash

16. **nft_contract_burn** - Burn NFT
    - Params: contract_address, from, token_id
    - Returns: transaction hash

17. **nft_contract_burn_from** - Burn NFT on behalf
    - Params: contract_address, spender, from, token_id
    - Returns: transaction hash

## Governance Contract Interaction (MerkleVoting - 3 methods)

Tool prefix: `governance_contract_*`

### Read-Only Methods
1. **governance_contract_has_voted** - Check if address has voted
   - Params: contract_address, index
   - Returns: boolean (voted status)

2. **governance_contract_get_vote_results** - Get current vote results
   - Params: contract_address
   - Returns: (votes_pro: i128, votes_against: i128)

### Write Methods
3. **governance_contract_vote** - Cast vote with merkle proof
   - Params: contract_address, vote_data (index, account, voting_power), proof (Vec<BytesN<32>>), approve (boolean)
   - Returns: transaction hash

## Implementation Plan

1. Create `src/plugins/token-contract/` directory
   - `token-contract.service.ts` - 15 @Tool decorated methods
   - `token-contract.plugin.ts` - Plugin registration
   - `parameters.ts` - Zod schemas

2. Create `src/plugins/nft-contract/` directory
   - `nft-contract.service.ts` - 17 @Tool decorated methods
   - `nft-contract.plugin.ts` - Plugin registration
   - `parameters.ts` - Zod schemas

3. Create `src/plugins/governance-contract/` directory
   - `governance-contract.service.ts` - 3 @Tool decorated methods
   - `governance-contract.plugin.ts` - Plugin registration
   - `parameters.ts` - Zod schemas

4. Create generic contract client wrappers in `src/clients/`:
   - `TokenContractClient.ts` - Wrapper for any token address
   - `NFTContractClient.ts` - Wrapper for any NFT address
   - `GovernanceContractClient.ts` - Wrapper for any governance address

5. Update `src/server.ts` to register new plugins

## Total Tools Summary

- **Existing**: 16 tools (factory operations)
- **New**: 35 tools (contract interactions)
- **Total**: 51 tools

This gives users complete control over:
- Deploying contracts via factories
- Interacting with deployed contracts
- Full lifecycle management

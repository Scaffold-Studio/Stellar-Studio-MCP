/**
 * NFT Contract Plugin
 */
import { PluginBase } from '../../core/PluginBase.js';
import { NFTContractService } from './nft-contract.service.js';
import * as S from './parameters.js';
import { z } from 'zod';

export class NFTContractPlugin extends PluginBase {
  constructor() {
    super('NFTContract', [NFTContractService]);
  }

  protected getParametersForMethod(methodName: string): z.ZodType {
    const map: Record<string, z.ZodType> = {
      getBalance: S.GetBalanceSchema,
      getOwnerOf: S.GetOwnerOfSchema,
      getApproved: S.GetApprovedSchema,
      isApprovedForAll: S.IsApprovedForAllSchema,
      getTokenUri: S.GetTokenUriSchema,
      getName: S.GetNameSchema,
      getSymbol: S.GetSymbolSchema,
      getTotalSupply: S.GetTotalSupplySchema,
      getOwnerTokenId: S.GetOwnerTokenIdSchema,
      getTokenId: S.GetTokenIdSchema,
      mint: S.MintSchema,
      transfer: S.TransferSchema,
      transferFrom: S.TransferFromSchema,
      approve: S.ApproveSchema,
      approveForAll: S.ApproveForAllSchema,
      burn: S.BurnSchema,
      burnFrom: S.BurnFromSchema,
    };
    if (!map[methodName]) throw new Error(`Unknown method: ${methodName}`);
    return map[methodName];
  }
}

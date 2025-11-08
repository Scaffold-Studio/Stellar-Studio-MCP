/**
 * Token Contract Plugin
 *
 * Provides tools for interacting with deployed token contracts
 */

import { PluginBase } from '../../core/PluginBase.js';
import { TokenContractService } from './token-contract.service.js';
import {
  GetBalanceSchema,
  GetTotalSupplySchema,
  GetAllowanceSchema,
  GetDecimalsSchema,
  GetNameSchema,
  GetSymbolSchema,
  GetPausedSchema,
  TransferSchema,
  TransferFromSchema,
  ApproveSchema,
  MintSchema,
  BurnSchema,
  BurnFromSchema,
  PauseSchema,
  UnpauseSchema,
} from './parameters.js';
import { z } from 'zod';

export class TokenContractPlugin extends PluginBase {
  constructor() {
    super('TokenContract', [TokenContractService]);
  }

  protected getParametersForMethod(methodName: string): z.ZodType {
    switch (methodName) {
      case 'getBalance':
        return GetBalanceSchema;
      case 'getTotalSupply':
        return GetTotalSupplySchema;
      case 'getAllowance':
        return GetAllowanceSchema;
      case 'getDecimals':
        return GetDecimalsSchema;
      case 'getName':
        return GetNameSchema;
      case 'getSymbol':
        return GetSymbolSchema;
      case 'getPaused':
        return GetPausedSchema;
      case 'transfer':
        return TransferSchema;
      case 'transferFrom':
        return TransferFromSchema;
      case 'approve':
        return ApproveSchema;
      case 'mint':
        return MintSchema;
      case 'burn':
        return BurnSchema;
      case 'burnFrom':
        return BurnFromSchema;
      case 'pause':
        return PauseSchema;
      case 'unpause':
        return UnpauseSchema;
      default:
        throw new Error(`Unknown method: ${methodName}`);
    }
  }
}

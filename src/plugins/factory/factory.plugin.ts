/**
 * Factory Plugin
 */

import { PluginBase } from '../../core/PluginBase.js';
import { FactoryService } from './factory.service.js';
import { z } from 'zod';

export class FactoryPlugin extends PluginBase {
  constructor() {
    super('Factory', [FactoryService]);
  }

  protected getParametersForMethod(methodName: string): z.ZodType {
    switch (methodName) {
      case 'getDeployedFactories':
        return z.object({});
      default:
        throw new Error(`Unknown method: ${methodName}`);
    }
  }
}

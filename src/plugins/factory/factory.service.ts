/**
 * Factory service - provides info about deployed factories
 */

import { Tool } from '../../core/Tool.decorator.js';
import type { StellarClient, ToolResult } from '../../core/index.js';
import { MasterFactoryClient } from '../../clients/index.js';

export class FactoryService {
  /**
   * Get all deployed factories
   */
  @Tool({
    name: 'factory_get_deployed',
    description: 'Get list of all deployed factory contracts from MasterFactory',
  })
  async getDeployedFactories(stellarClient: StellarClient): Promise<ToolResult> {
    try {
      const masterFactory = new MasterFactoryClient(stellarClient);
      const assembled = await masterFactory.getDeployedFactories();
      const simulation = await assembled.simulate();
      const factories = simulation.result;

      return {
        success: true,
        data: factories,
        suggestion: `Found ${factories.length} deployed factories`,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Failed to get deployed factories',
      };
    }
  }
}

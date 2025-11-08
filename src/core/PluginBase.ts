/**
 * Plugin base class
 *
 * Provides framework for creating extensible plugins that discover
 * and expose tools via the @Tool decorator pattern.
 *
 * Pattern: Plugin + Service Locator - discovers tools via reflection
 */

import type { StellarClient } from './WalletClientBase.js';
import type { ToolBase } from './ToolBase.js';
import { getToolMetadata, type ToolMetadataRecord } from './Tool.decorator.js';
import { createTool } from './ToolBase.js';
import { z } from 'zod';
import type { Chain } from './types.js';

export abstract class PluginBase {
  constructor(
    public readonly name: string,
    protected readonly services: any[]
  ) {}

  /**
   * Check if this plugin supports a given chain
   * Stellar plugins always return true for 'stellar'
   */
  supportsChain(chain: Chain): boolean {
    return chain === 'stellar';
  }

  /**
   * Get parameter schema for a method (implement in subclass)
   */
  protected abstract getParametersForMethod(methodName: string): z.ZodType;

  /**
   * Get all tools provided by this plugin
   *
   * Discovers tools from service classes using @Tool decorator
   */
  getTools(stellarClient: StellarClient): ToolBase<any, any>[] {
    const tools: ToolBase<any, any>[] = [];

    // Iterate through all registered services
    for (const Service of this.services) {
      const metadata = getToolMetadata(Service);
      const serviceInstance = new Service();

      // Create a tool for each decorated method
      for (const toolMeta of metadata) {
        const tool = this.createToolFromMetadata(
          toolMeta,
          serviceInstance,
          stellarClient
        );
        tools.push(tool);
      }
    }

    return tools;
  }

  /**
   * Create a ToolBase instance from decorator metadata
   */
  private createToolFromMetadata(
    metadata: ToolMetadataRecord,
    serviceInstance: any,
    stellarClient: StellarClient
  ): ToolBase<any, any> {
    // Get parameter schema from subclass
    const parametersSchema = this.getParametersForMethod(metadata.methodName);

    return createTool(
      {
        name: metadata.name,
        description: metadata.description,
        parameters: parametersSchema,
      },
      async (params: any) => {
        // Bind the method to the service instance and call with stellar client + params
        const method = serviceInstance[metadata.methodName].bind(
          serviceInstance
        );
        return await method(stellarClient, params);
      }
    );
  }
}

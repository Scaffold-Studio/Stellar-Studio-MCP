/**
 * Tool decorator for automatic tool registration
 *
 * Uses TypeScript decorators and reflect-metadata to automatically
 * discover and register service methods as MCP tools.
 *
 * Pattern: Decorator - marks methods for automatic tool registration
 */

import 'reflect-metadata';
import type { ToolMetadata } from './types.js';

/**
 * Symbol key for storing tool metadata
 */
export const TOOL_METADATA_KEY = Symbol('tool:metadata');

/**
 * Tool metadata record stored in reflection
 */
export interface ToolMetadataRecord {
  methodName: string;
  name: string;
  description: string;
  parameterTypes: any[];
}

/**
 * Tool decorator
 *
 * Usage:
 * ```typescript
 * class TokenService {
 *   @Tool({ description: 'Deploy a token' })
 *   async deployToken(wallet: StellarWalletClient, parameters: DeployParams) {
 *     // implementation
 *   }
 * }
 * ```
 */
export function Tool(metadata: ToolMetadata) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    // Get existing tools from this class
    const existingTools: ToolMetadataRecord[] =
      Reflect.getMetadata(TOOL_METADATA_KEY, target.constructor) || [];

    // Get parameter types using reflect-metadata
    const parameterTypes: any[] =
      Reflect.getMetadata('design:paramtypes', target, propertyKey) || [];

    // Validate method signature
    if (parameterTypes.length < 1 || parameterTypes.length > 2) {
      throw new Error(
        `@Tool method ${propertyKey} must have 1-2 parameters (wallet, parameters?)`
      );
    }

    // Store metadata
    const toolMetadata: ToolMetadataRecord = {
      methodName: propertyKey,
      name: metadata.name || propertyKey,
      description: metadata.description,
      parameterTypes,
    };

    // Add to class metadata
    Reflect.defineMetadata(
      TOOL_METADATA_KEY,
      [...existingTools, toolMetadata],
      target.constructor
    );

    return descriptor;
  };
}

/**
 * Get all tool metadata from a class
 */
export function getToolMetadata(serviceClass: any): ToolMetadataRecord[] {
  return Reflect.getMetadata(TOOL_METADATA_KEY, serviceClass) || [];
}

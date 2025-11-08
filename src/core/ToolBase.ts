/**
 * Abstract tool base class
 *
 * Generic tool class that wraps tool metadata and execution logic.
 * Uses factory pattern instead of requiring subclassing.
 *
 * Pattern: Factory - createTool() factory function for easy tool creation
 */

import type { z } from 'zod';

export abstract class ToolBase<TParameters extends z.ZodType<any>, TResult> {
  constructor(
    public readonly name: string,
    public readonly description: string,
    public readonly parameters: TParameters
  ) {}

  /**
   * Execute the tool with validated parameters
   */
  abstract execute(
    parameters: z.infer<TParameters>
  ): TResult | Promise<TResult>;
}

/**
 * Factory function to create a tool without subclassing
 */
export function createTool<TParameters extends z.ZodType<any>, TResult>(
  config: {
    name: string;
    description: string;
    parameters: TParameters;
  },
  execute: (parameters: z.infer<TParameters>) => TResult | Promise<TResult>
): ToolBase<TParameters, TResult> {
  return new (class extends ToolBase<TParameters, TResult> {
    execute(parameters: z.infer<TParameters>): TResult | Promise<TResult> {
      return execute(parameters);
    }
  })(config.name, config.description, config.parameters);
}

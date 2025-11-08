/**
 * Registry Plugin
 */
import { PluginBase } from '../../core/PluginBase.js';
import { RegistryService } from './registry.service.js';
import * as S from './parameters.js';
import { z } from 'zod';

export class RegistryPlugin extends PluginBase {
  constructor() {
    super('Registry', [RegistryService]);
  }

  protected getParametersForMethod(methodName: string): z.ZodType {
    const map: Record<string, z.ZodType> = {
      publish: S.PublishSchema,
      deploy: S.DeploySchema,
      createAlias: S.CreateAliasSchema,
      listPublished: S.ListPublishedSchema,
      getVersions: S.GetVersionsSchema,
      getInfo: S.GetInfoSchema,
    };
    if (!map[methodName]) throw new Error(`Unknown method: ${methodName}`);
    return map[methodName];
  }
}

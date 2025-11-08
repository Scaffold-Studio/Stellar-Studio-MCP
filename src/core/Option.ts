/**
 * Option type helper utilities
 * 
 * Provides helper functions to create Option<T> types that match
 * the Stellar SDK contract Option type structure.
 */

import type { Option } from '@stellar/stellar-sdk/contract';

/**
 * Create a Some Option value
 */
export function some<T>(value: T): Option<T> {
  return { tag: 'Some', values: [value] } as Option<T>;
}

/**
 * Create a None Option value
 */
export function none<T>(): Option<T> {
  return { tag: 'None', values: [] } as Option<T>;
}

/**
 * Create an Option from a value (Some) or undefined/null (None)
 */
export function option<T>(value: T | undefined | null): Option<T> {
  return value !== undefined && value !== null ? some(value) : none<T>();
}


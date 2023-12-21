export const WILDCARD = '*';

export function withWildcard(value: string): string {
  return `${value}.${WILDCARD}`;
}

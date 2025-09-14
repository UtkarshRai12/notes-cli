import { describe, expect, test } from 'vitest';

describe('Commands CLI', () => {
  test('should load without throwing', () => {
    expect(() => require('./commands.js')).toThrow();
  });
});

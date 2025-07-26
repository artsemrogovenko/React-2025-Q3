import { beforeEach, describe, expect, it, vi } from 'vitest';
import { getPrevQuery, setSearchQuery } from '../api/utils';

describe('localStorage utils', () => {
  beforeEach(() => {
    vi.spyOn(Storage.prototype, 'getItem');
    vi.spyOn(Storage.prototype, 'setItem');
    localStorage.clear();
  });

  it('Initially, there are no requests', () => {
    expect(getPrevQuery()).toBe('');
    expect(localStorage.getItem).toHaveBeenCalledWith('previous');
  });

  it('Verification of successful conservation of a request', () => {
    localStorage.setItem('previous', 'Rick');
    expect(getPrevQuery()).toBe('Rick');
  });

  it('The old value is successfully overwritten', () => {
    setSearchQuery('Dark');
    expect(localStorage.setItem).toHaveBeenCalledWith('previous', 'Dark');
    expect(localStorage.getItem('previous')).toBe('Dark');
  });
});

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getPrevQuery, setSearchQuery } from '../api/utils';

describe('localStorage utils', () => {
  beforeEach(() => {
    vi.spyOn(Storage.prototype, 'getItem');
    vi.spyOn(Storage.prototype, 'setItem');
    localStorage.clear();
  });

  it('изначально истории запросов нет', () => {
    expect(getPrevQuery()).toBe('');
    expect(localStorage.getItem).toHaveBeenCalledWith('previous');
  });

  it('проверка успешного сохранения запроса', () => {
    localStorage.setItem('previous', 'Rick');
    expect(getPrevQuery()).toBe('Rick');
  });

  it('старое значение успешно перезаписано', () => {
    setSearchQuery('Dark');
    expect(localStorage.setItem).toHaveBeenCalledWith('previous', 'Dark');
    expect(localStorage.getItem('previous')).toBe('Dark');
  });
});

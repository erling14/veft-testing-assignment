import * as utils from './index';

jest.mock('./errorFunction');

describe('utils', () => {
  test('add 1 + 1 equals 2', () => {
    expect(utils.add(1, 1)).toBe(2);
  });

  test('add null + 1 equals 2', () => {
    expect(utils.add(null, 1)).toBe(1);
  });

  test('add undefined + undefined equals NaN', () => {
    expect(Number.isNaN(utils.add())).toBe(true);
  });

  test('add 1 + 1 equals 2', () => {
    expect(utils.throws(4)).toBe(4);
  });

  /*test('loop gets called 4 times', () => {
    const addSpy = jest.spyOn(utils, 'add');
    utils.loop(1);
    expect(addSpy).toHaveBeenCalledTimes(1);
  });*/
});
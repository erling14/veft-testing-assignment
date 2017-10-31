import {add} from './add';

export const loop = n => {
    let sum = 0;
    for (let i = 0; i < n; i++) {
      sum += add(n, n - 1);
    }
    return sum;
  };
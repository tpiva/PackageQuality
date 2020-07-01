import { map, reduce } from 'lodash';

class Calculate {
  static avg(items) {
    const total = reduce(items, (sum, n) => sum + n);
    return Math.ceil(total / items.length);
  }

  static standartDeviation(items, avg) {
    const sum = reduce(
      map(items, item => Math.pow(Math.abs(item - avg), 2)),
      (total, n) => total + n);
    
    const std = Math.ceil(Math.sqrt(sum / items.length));
    return std;
  }
}

export default Calculate;
import { map, reduce } from 'lodash';

class Calculate {
  static avg(items) {
    if (items.length === 0) {
      return 0;
    }

    const total = reduce(items, (sum, n) => sum + n);
    return Math.ceil(total / items.length);
  }

  static standartDeviation(items, avg) {

    if (items.length === 0) {
      return 0;
    }

    const sum = reduce(
      map(items, item => Math.pow(Math.abs(item - avg), 2)),
      (total, n) => total + n);
    
    const std = Math.ceil(Math.sqrt(sum / items.length));
    return std;
  }
}

export default Calculate;
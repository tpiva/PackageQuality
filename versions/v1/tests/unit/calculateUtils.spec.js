import { Calculate } from '../../src/utils';

describe('Calculate Utils', () => {
  
  it('Should return average number from array', () => {
    const avg = Calculate.avg([1, 2, 3, 4]);
    expect(avg).to.be.a('number');
    expect(avg).to.equal(3);
  });

  it('Should return 0 from empty array', () => {
    const avg = Calculate.avg([]);
    expect(avg).to.be.a('number');
    expect(avg).to.equal(0);
  });

  it('Should return average number from array', () => {
    const avg = Calculate.standartDeviation([1, 2, 3, 4], 2);
    expect(avg).to.be.a('number');
    expect(avg).to.equal(2);
  });

  it('Should return 0 from empty array', () => {
    const avg = Calculate.standartDeviation([], 0);
    expect(avg).to.be.a('number');
    expect(avg).to.equal(0);
  });
});
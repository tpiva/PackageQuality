import { Times } from '../../src/utils';

describe('Times utils', () => {
  it('Should return difference between times in days', () => {
    const days = Times.timeInDays('2020-06-09 15:47:48+00', '2020-06-10 15:47:48+00');
    expect(days).to.equal(1);
  });

  it('Should return 0 days without end', () => {
    const days = Times.timeInDays('2020-06-09 15:47:48+00', '');
    expect(days).to.equal(0);
  });

  it('Should return 0 days without start', () => {
    const days = Times.timeInDays('', '2020-06-10 15:47:48+00');
    expect(days).to.equal(0);
  });
});
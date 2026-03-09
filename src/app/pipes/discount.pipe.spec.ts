import { DiscountPipe } from './discount.pipe';

describe('DiscountPipe', () => {
  const pipe = new DiscountPipe();

  it('creates an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('applies default 10% discount: 1000 | discount => 900', () => {
    expect(pipe.transform(1000)).toBe(900);
  });

  it('applies custom 20% discount: 1000 | discount:20 => 800', () => {
    expect(pipe.transform(1000, 20)).toBe(800);
  });

  it('returns 0 for null or non-number', () => {
    expect(pipe.transform(null as any)).toBe(0);
    expect(pipe.transform(undefined as any)).toBe(0);
  });
});

const isPrime = require('../prime');

test('check if 9 is prime', () => {
    expect(isPrime(9)).toBe(false);
});

test('check if 23 is prime', () => {
    expect(isPrime(23)).toBe(true);
});
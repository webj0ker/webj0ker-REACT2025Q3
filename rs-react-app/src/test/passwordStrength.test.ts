import { getPasswordStrength } from '../utils/passwordStrength';

test('calculates password strength', () => {
  expect(getPasswordStrength('aA1!')).toBe(4);
  expect(getPasswordStrength('abc')).toBe(1);
});

const { capitalize, reverse, isPalindrome } = require('./stringUtils');

describe('StringUtils Tests', () => {
  
  describe('capitalize', () => {
    test('should capitalize first letter', () => {
      expect(capitalize('hello')).toBe('Hello');
    });

    test('should handle already capitalized string', () => {
      expect(capitalize('Hello')).toBe('Hello');
    });

    test('should handle empty string', () => {
      expect(capitalize('')).toBe('');
    });

    test('should throw error for non-string input', () => {
      expect(() => capitalize(123)).toThrow('Input must be a string');
    });
  });

  describe('reverse', () => {
    test('should reverse a string', () => {
      expect(reverse('hello')).toBe('olleh');
    });

    test('should handle single character', () => {
      expect(reverse('a')).toBe('a');
    });

    test('should handle empty string', () => {
      expect(reverse('')).toBe('');
    });
  });

  describe('isPalindrome', () => {
    test('should return true for palindrome', () => {
      expect(isPalindrome('racecar')).toBe(true);
    });

    test('should return false for non-palindrome', () => {
      expect(isPalindrome('hello')).toBe(false);
    });

    test('should ignore case', () => {
      expect(isPalindrome('RaceCar')).toBe(true);
    });

    test('should ignore spaces and punctuation', () => {
      expect(isPalindrome('A man, a plan, a canal: Panama')).toBe(true);
    });
  });
});
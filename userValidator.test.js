const { validateUser, getUserInfo } = require('./userValidator');

describe('User Validator Tests', () => {
  
  describe('validateUser', () => {
    test('should validate a correct user', () => {
      const user = {
        name: 'John Doe',
        email: 'john@example.com',
        age: 25
      };

      const result = validateUser(user);

      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
      expect(result.errors).toEqual([]);
    });

    test('should return errors for invalid email', () => {
      const user = {
        name: 'John',
        email: 'invalid-email',
        age: 20
      };

      const result = validateUser(user);

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('Valid email is required');
      expect(result.errors).toHaveLength(1);
    });

    test('should return errors for underage user', () => {
      const user = {
        name: 'Jane',
        email: 'jane@example.com',
        age: 16
      };

      const result = validateUser(user);

      expect(result.isValid).toBe(false);
      expect(result.errors).toContain('User must be 18 or older');
    });

    test('should return multiple errors', () => {
      const user = {
        name: 'J',
        email: 'invalid',
        age: 15
      };

      const result = validateUser(user);

      expect(result.isValid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(1);
      expect(result.errors).toEqual(
        expect.arrayContaining([
          'Valid email is required',
          'User must be 18 or older',
          'Name must be at least 2 characters'
        ])
      );
    });

    test('should throw error when user is null', () => {
      expect(() => validateUser(null)).toThrow('User object is required');
    });

    test('should throw error when user is undefined', () => {
      expect(() => validateUser()).toThrow('User object is required');
    });
  });

  describe('getUserInfo', () => {
    test('should return user info object', () => {
      const user = {
        name: 'John Doe',
        email: 'john@example.com',
        age: 25
      };

      const result = getUserInfo(user);

      expect(result).toHaveProperty('name');
      expect(result).toHaveProperty('email');
      expect(result).toHaveProperty('age');
      expect(result).toHaveProperty('isAdult');
      expect(result).toHaveProperty('createdAt');
    });

    test('should correctly identify adult user', () => {
      const user = { name: 'John', email: 'john@test.com', age: 25 };
      const result = getUserInfo(user);

      expect(result.isAdult).toBe(true);
      expect(result).toMatchObject({
        name: 'John',
        email: 'john@test.com',
        age: 25,
        isAdult: true
      });
    });

    test('should have createdAt as Date instance', () => {
      const user = { name: 'John', email: 'john@test.com', age: 25 };
      const result = getUserInfo(user);

      expect(result.createdAt).toBeInstanceOf(Date);
    });
  });
});
const { add, subtract, multiply, divide } = require('./calculator');

describe('Calculator Tests', () => {
  
  test('add should sum two numbers', () => {
    // Arrange (voorbereiding)
    const a = 5;
    const b = 3;
    
    // Act (actie uitvoeren)
    const result = add(a, b);
    
    // Assert (controleren)
    expect(result).toBe(8);
  });

  test('subtract should subtract two numbers', () => {
    expect(subtract(10, 4)).toBe(6);
  });

  test('multiply should multiply two numbers', () => {
    expect(multiply(3, 4)).toBe(12);
  });

  test('divide should divide two numbers', () => {
    expect(divide(10, 2)).toBe(5);
  });

  test('divide should throw error when dividing by zero', () => {
    expect(() => divide(10, 0)).toThrow('Cannot divide by zero');
  });
});
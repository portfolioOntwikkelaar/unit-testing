const { fetchUser, fetchUserPosts, getUserWithPosts } = require('./api');

describe('API Tests - Async/Await', () => {
  
  // Methode 1: async/await (MEEST GEBRUIKTE)
  test('should fetch user by id', async () => {
    const user = await fetchUser(1);
    
    expect(user).toEqual({
      id: 1,
      name: 'John Doe',
      email: 'john@example.com'
    });
  });

  // Methode 2: .resolves matcher
  test('should fetch user posts', async () => {
    await expect(fetchUserPosts(1)).resolves.toHaveLength(2);
  });

  // Test voor rejected promises
  test('should reject when user not found', async () => {
    await expect(fetchUser(0)).rejects.toThrow('User not found');
  });

  // Complexere async test
  test('should get user with posts', async () => {
    const result = await getUserWithPosts(1);
    
    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('name');
    expect(result).toHaveProperty('posts');
    expect(result.posts).toHaveLength(2);
  });
});
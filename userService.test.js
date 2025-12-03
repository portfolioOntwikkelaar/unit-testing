const axios = require('axios');
const UserService = require('./userService');

// Mock axios module
jest.mock('axios');

describe('UserService Tests - Mocking', () => {
  let userService;

  beforeEach(() => {
    userService = new UserService();
    // Clear alle mocks voor elke test
    jest.clearAllMocks();
  });

  describe('getUser', () => {
    test('should fetch user successfully', async () => {
      // Arrange: Mock de response
      const mockUser = { id: 1, name: 'John Doe', email: 'john@example.com' };
      axios.get.mockResolvedValue({ data: mockUser });

      // Act
      const result = await userService.getUser(1);

      // Assert
      expect(result).toEqual(mockUser);
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith(
        'https://jsonplaceholder.typicode.com/users/1'
      );
    });

    test('should throw error when fetch fails', async () => {
      // Mock een error
      axios.get.mockRejectedValue(new Error('Network error'));

      await expect(userService.getUser(1)).rejects.toThrow('Failed to fetch user');
      expect(axios.get).toHaveBeenCalledTimes(1);
    });
  });

  describe('createUser', () => {
    test('should create user successfully', async () => {
      const newUser = { name: 'Jane Doe', email: 'jane@example.com' };
      const createdUser = { id: 2, ...newUser };
      
      axios.post.mockResolvedValue({ data: createdUser });

      const result = await userService.createUser(newUser);

      expect(result).toEqual(createdUser);
      expect(axios.post).toHaveBeenCalledWith(
        'https://jsonplaceholder.typicode.com/users',
        newUser
      );
    });
  });

  describe('deleteUser', () => {
    test('should delete user successfully', async () => {
      axios.delete.mockResolvedValue({ data: {} });

      const result = await userService.deleteUser(1);

      expect(result).toEqual({ success: true, message: 'User deleted' });
      expect(axios.delete).toHaveBeenCalledWith(
        'https://jsonplaceholder.typicode.com/users/1'
      );
    });
  });
});
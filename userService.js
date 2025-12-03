const axios = require('axios');

class UserService {
  constructor(apiUrl = 'https://jsonplaceholder.typicode.com') {
    this.apiUrl = apiUrl;
  }

  async getUser(id) {
    try {
      const response = await axios.get(`${this.apiUrl}/users/${id}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch user');
    }
  }

  async createUser(userData) {
    try {
      const response = await axios.post(`${this.apiUrl}/users`, userData);
      return response.data;
    } catch (error) {
      throw new Error('Failed to create user');
    }
  }

  async deleteUser(id) {
    try {
      await axios.delete(`${this.apiUrl}/users/${id}`);
      return { success: true, message: 'User deleted' };
    } catch (error) {
      throw new Error('Failed to delete user');
    }
  }
}

module.exports = UserService;
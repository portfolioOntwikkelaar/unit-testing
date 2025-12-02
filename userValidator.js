function validateUser(user) {
  const errors = [];

  if (!user) {
    throw new Error('User object is required');
  }

  if (!user.email || !user.email.includes('@')) {
    errors.push('Valid email is required');
  }

  if (!user.age || user.age < 18) {
    errors.push('User must be 18 or older');
  }

  if (!user.name || user.name.length < 2) {
    errors.push('Name must be at least 2 characters');
  }

  return {
    isValid: errors.length === 0,
    errors: errors
  };
}

function getUserInfo(user) {
  return {
    name: user.name,
    email: user.email,
    age: user.age,
    isAdult: user.age >= 18,
    createdAt: new Date()
  };
}

module.exports = { validateUser, getUserInfo };
function fetchUser(userId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (userId === 1) {
        resolve({ id: 1, name: 'John Doe', email: 'john@example.com' });
      } else if (userId === 0) {
        reject(new Error('User not found'));
      } else {
        resolve({ id: userId, name: 'Unknown User', email: 'unknown@example.com' });
      }
    }, 100);
  });
}

function fetchUserPosts(userId) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, title: 'First Post', userId },
        { id: 2, title: 'Second Post', userId }
      ]);
    }, 100);
  });
}

async function getUserWithPosts(userId) {
  const user = await fetchUser(userId);
  const posts = await fetchUserPosts(userId);
  
  return {
    ...user,
    posts: posts
  };
}

module.exports = { fetchUser, fetchUserPosts, getUserWithPosts };
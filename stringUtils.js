function capitalize(string) {
  if (typeof string !== 'string') {
    throw new Error('Input must be a string');
  }
  if (string.length === 0) {
    return string;
  }
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

function reverse(string) {
  if (typeof string !== 'string') {
    throw new Error('Input must be a string');
  }
  return string.split('').reverse().join('');
}

function isPalindrome(string) {
  if (typeof string !== 'string') {
    throw new Error('Input must be a string');
  }
  const cleaned = string.toLowerCase().replace(/[^a-z0-9]/g, '');
  return cleaned === cleaned.split('').reverse().join('');
}

module.exports = { capitalize, reverse, isPalindrome };
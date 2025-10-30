const { redisClient } = require('../../config/redis');

const clearSearchCache = async () => {
  if (!redisClient.isOpen) {
    return;
  }

  try {
    const keys = [];
    for await (const key of redisClient.scanIterator({
      MATCH: 'search:*',
      COUNT: 100,
    })) {
      if (typeof key === 'string' && key.length > 0) {
        keys.push(key);
      }
    }

    if (keys.length > 0) {
      await redisClient.del(keys);
      console.log('Search cache cleared.');
    }
  } catch (err) {
    console.error('Failed to clear search cache:', err);
  }
};

module.exports = {
  clearSearchCache,
};
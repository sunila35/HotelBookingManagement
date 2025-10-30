const redis = require('redis');

const redisClient = redis.createClient();

redisClient.on('error', (err) => {
    console.error('Redis Client Error:', err);
});

redisClient.on('connect', () => {
    console.log('Connected to Redis server.');
});

(async () => {
    try {
        await redisClient.connect();
        console.log('Connected to Redis successfully.');
        await redisClient.flushAll();
        console.log('Redis cache cleared on startup.');
    } catch (err) {
        console.error('Failed to connect to Redis:', err);
    }
})();

const flushAll = async () => {
    if (redisClient.isOpen) {
        await redisClient.flushAll();
        console.log('Redis cache cleared.');
    }
};

module.exports = { redisClient, flushAll };
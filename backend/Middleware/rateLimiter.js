// rate limiter & throttling middleware

const rateLimit = require("express-rate-limit");
const { default: slowDown } = require("express-slow-down");

// rate-limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.',
  });

// Throttle configuration
const speedLimiter = slowDown({
    windowMs: 15 * 60 * 1000, // 15 minutes
    delayAfter: 100, // Allow 100 requests before starting to delay responses
    delayMs: () => 500, // Add a delay of 500ms per request after the limit
  });

module.exports = { limiter, speedLimiter };
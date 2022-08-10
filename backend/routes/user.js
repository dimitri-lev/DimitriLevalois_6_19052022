const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

const userCtrl = require('../controllers/user');
const checkEmail = require('../middleware/check-email');
const checkPassword = require('../middleware/check-password');

router.post('/signup', limiter, checkEmail, checkPassword, userCtrl.signup);
router.post('/login', limiter, userCtrl.login);

module.exports = router;

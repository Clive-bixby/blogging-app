const express = require('express');
const { registerUser, loginUser, refreshAccessToken } = require('../controllers/authController');
const auth = require('../middleware/auth');
const requireRole = require('../middleware/role');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/refresh-token', refreshAccessToken);

router.get('/admin-only', auth, requireRole('admin'), (req, res) => {
  res.json({ message: 'Welcome admin!' });
});

module.exports = router;

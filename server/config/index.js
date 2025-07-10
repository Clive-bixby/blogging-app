module.exports = {
  jwtSecret: process.env.JWT_SECRET || 'accesssecret',
  jwtExpiresIn: '15m',
  refreshTokenSecret: process.env.REFRESH_SECRET || 'refreshsecret',
  refreshTokenExpiresIn: '7d',
};

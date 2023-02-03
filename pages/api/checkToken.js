import jwt from 'jsonwebtoken';

const checkToken = async (req, res) => {
  const authorizationHeader = req.headers.authorization;
  if (!authorizationHeader) {
    return res.status(401).json({ error: 'Authorization header is required' });
  }

  const token = authorizationHeader.split('Bearer ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Token not found' });
  }

  try {
    const decoded = jwt.verify(token, 'secret');
    res.status(200).json({ isLoggedIn: true, userId: decoded.userId });
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

export default checkToken;

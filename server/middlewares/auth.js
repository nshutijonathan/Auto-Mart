import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
  const token = req.header('x-auth-token');
  const checkadmin = req.body.is_admin;
  if (!token) {
  	return res.status(402).send({
  		status: 402,
  		message: 'Access denied. no token provided'
  	});
  }
  	try {
  		const decoded = jwt.verify(token, 'jwtPrivateKey');
  		req.user = decoded;
  		next();
  	} catch (ex) {
  		return res.status(400).send({
  			status: 400,
  			message: 'Invalid token'
  		});
  	}
};
export default auth;

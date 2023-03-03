const CustomError = require('../errors');
const { isTokenValid } = require('../utils');

const authenticateUser = async (req, res, next) => {
  const token = req.signedCookies.token; // token is the name we gave to our cookies. If we did not sign the cookies, our request would be req.cookies.token

  if (!token) {
    throw new CustomError.UnauthenticatedError('Authentication Invalid');
  }

  try {
    const payload = isTokenValid({ token });
    // console.log(payload);
    const { name, userId, role } = payload;
    req.user = { name, userId, role };
    next();
  } catch (error) {
    throw new CustomError.UnauthenticatedError('Authentication Invalid');
  }
};

const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new CustomError.UnauthorizedError(
        'Unauthorized to access this route'
      );
    }
    next();
  };
  //   if (req.user.role !== 'admin') {
  //     throw new CustomError.UnauthorizedError(
  //       'Unauthorized to access this route'
  //     );
  //   }
  //   next();
};

module.exports = { authenticateUser, authorizePermissions };

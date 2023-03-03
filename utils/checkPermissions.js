const CustomError = require('../errors');

const checkPermissions = (requestUser, resourceUserId) => {
  //   console.log(requestUser);
  //   console.log(resourceUserId);
  //   console.log(typeof resourceUserId);

  if (requestUser.role === 'admin') return;

  if (requestUser.userId === resourceUserId.toString()) return; //because the resourceUserId is an object as seen in the console so we convert the id to a string

  throw new CustomError.UnauthorizedError(
    'Not authorized to access this route'
  );
};

module.exports = checkPermissions;

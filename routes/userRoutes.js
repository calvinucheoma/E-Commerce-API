const express = require('express');
const {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
} = require('../controllers/userController');
const {
  authenticateUser,
  authorizePermissions,
} = require('../middleware/authentication');
const router = express.Router();

router
  .route('/')
  .get(authenticateUser, authorizePermissions('admin', 'owner'), getAllUsers); //Placement here is very important. We first want to authenticate the user before we check for the admin so the authentication function comes before it
router.route('/showMe').get(authenticateUser, showCurrentUser);
router.route('/updateUser').patch(authenticateUser, updateUser);
router.route('/updateUserPassword').patch(authenticateUser, updateUserPassword);
router.route('/:id').get(authenticateUser, getSingleUser); //should be placed last to prevent express from treating the other routes as a subsection of the id route

module.exports = router;

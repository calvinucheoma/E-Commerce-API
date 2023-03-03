const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  updateProduct,
  uploadImage,
  deleteProduct,
  createProduct,
  getSingleProduct,
} = require('../controllers/productController');
const { getSingleProductReviews } = require('../controllers/reviewController');

const {
  authorizePermissions,
  authenticateUser,
} = require('../middleware/authentication');

router
  .route('/')
  .post([authenticateUser, authorizePermissions('admin')], createProduct)
  .get(getAllProducts);

router
  .route('/uploadImage')
  .post([authenticateUser, authorizePermissions('admin')], uploadImage);

router
  .route('/:id')
  .get(getSingleProduct)
  .patch([authenticateUser, authorizePermissions('admin')], updateProduct)
  .delete([authenticateUser, authorizePermissions('admin')], deleteProduct);

router.route('/:id/reviews').get(getSingleProductReviews);

module.exports = router;

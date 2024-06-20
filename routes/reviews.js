const express = require('express');
const router = express.Router({mergeParams: true}); // This will make sure we'll have access to full req.params
const catchAsync = require('../utils/catchAsync');
const {validateReview, isLoggedIn, isReviewAuthor} = require('../middleware');
const reviews = require('../controllers/reviews');



router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview));

router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview));

module.exports = router;
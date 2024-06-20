const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const {isLoggedIn, isAuthor, validateCampground} = require('../middleware');
const multer = require('multer');
const {storage} = require('../cloudinary'); // No need to write /index as node automatically looks for index file
const upload = multer({storage});

// REQUIRING CONTROLLERS:
const campgrounds = require('../controllers/campgrounds');

// FANCY WAY TO RESTRUCTURE ROUTES: ****ORDER MATTERS HERE TOO*****
router.route('/')
    .get(catchAsync(campgrounds.index))
    // Using JOI library for comprehensive server side validations (validateCampground):
    // Multer will first parse the req.body and then req.body.campground will be created
    .post(isLoggedIn, upload.array('image'), validateCampground, catchAsync(campgrounds.createCampground));

router.get('/new', isLoggedIn, campgrounds.renderNewForm);

router.route('/:id')
    .get(catchAsync(campgrounds.showCampground))
    .put(isLoggedIn, isAuthor, upload.array('image'), validateCampground, catchAsync(campgrounds.updateCampground))
    .delete(isLoggedIn, isAuthor, catchAsync(campgrounds.deleteCampground));

router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(campgrounds.renderEditForm));

module.exports = router;
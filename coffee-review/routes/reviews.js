const express = require('express');
const router = express.Router();
const reviewsCtrl = require('../controllers/reviews');

router.post('/:id', reviewsCtrl.createReview);
router.get('/new', reviewsCtrl.show);

module.exports = router;

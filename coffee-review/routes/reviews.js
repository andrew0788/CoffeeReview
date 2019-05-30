const express = require('express');
const router = express.Router();
const reviewsCtrl = require('../controllers/reviews');

router.post('/coffees/:id/reviews', reviewsCtrl.addReview);
router.get('/coffees/:id/reviews/new', reviewsCtrl.show);
router.delete('/reviews/:id', reviewsCtrl.remove);

module.exports = router;

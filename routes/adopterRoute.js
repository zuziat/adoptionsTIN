const express = require('express');const router = express.Router();

const adopterController = require('../controllers/adopterController');

router.get('/', adopterController.showAdopterList);
router.get('/add', adopterController.showAddAdopterForm);
router.get('/edit/:adoptId', adopterController.showEditAdopterForm);
router.get('/details/:adoptId', adopterController.showAdopterDetails);

router.post('/add', adopterController.addAdopter);
router.post('/edit', adopterController.updateAdopter);
router.get('/delete/:adoptId', adopterController.deleteAdopter);

module.exports = router;

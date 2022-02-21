const express = require('express');
const router = express.Router();

const volunteerController = require('../controllers/volunteerController');

router.get('/', volunteerController.showVolunteerList);
router.get('/add', volunteerController.showAddVolunteerForm);
router.get('/edit/:volId', volunteerController.showEditVolunteerForm);
router.get('/details/:volId', volunteerController.showVolunteerDetails);

router.post('/add', volunteerController.addVolunteer);
router.post('/edit', volunteerController.updateVolunteer);
router.get('/delete/:volId', volunteerController.deleteVolunteer);
module.exports = router;
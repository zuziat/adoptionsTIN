const express = require('express');
const router = express.Router();

const volApiController = require('../../api/VolunteerAPI');

router.get('/', volApiController.getVolunteers);
router.get('/:volId', volApiController.getVolunteerByID);
router.post('/', volApiController.createVolunteer);
router.put('/:volId', volApiController.updateVolunteer);
router.delete('/:volId', volApiController.deleteVolunteer);

module.exports = router;
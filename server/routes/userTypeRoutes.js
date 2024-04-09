const express = require('express');
const router = express.Router();
const userTypeController = require('../controllers/UserTypeController');

// Routes for user types
router.get('/', userTypeController.getAllUserTypes);
router.get('/:id', userTypeController.getUserTypeById);
router.post('/', userTypeController.createUserType);
router.put('/:id', userTypeController.updateUserTypeById);
router.delete('/:id', userTypeController.deleteUserTypeById);

module.exports = router;

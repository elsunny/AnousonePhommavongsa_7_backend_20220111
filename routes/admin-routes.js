const router = require('express').Router();
const authentification = require('../middleware/authentification');
const controllerAdmin = require('../controllers/admin-controller');

router.get('/', authentification, controllerAdmin.adminRules);

module.exports = router;
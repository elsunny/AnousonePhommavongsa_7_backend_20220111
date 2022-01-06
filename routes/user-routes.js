const router = require('express').Router();
const authentification = require('../middleware/authentification');
const multer = require('../middleware/multer-config');

const controllerUser = require('../controllers/user-controller');

// display
router.post('/signup', multer, controllerUser.signup);
router.post('/login', controllerUser.login);
router.put('/:id', authentification, multer, controllerUser.change);
router.delete('/:id', authentification, multer, controllerUser.removeUser);


module.exports = router;
 
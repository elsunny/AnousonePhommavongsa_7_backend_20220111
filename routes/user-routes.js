const router = require('express').Router();
const authentification = require('../middleware/authentification');
const multer = require('../middleware/multer-config');

const controllerUser = require('../controllers/user-controller');

// display
router.post('/signup', multer, controllerUser.signup);
router.post('/login', controllerUser.login);
router.post('/logout', authentification, controllerUser.logout);
router.put('/:id', authentification, multer, controllerUser.change);
router.delete('/:id', authentification, multer, controllerUser.removeUser);

router.post('/', controllerUser.giveUserInfo);


module.exports = router;
 
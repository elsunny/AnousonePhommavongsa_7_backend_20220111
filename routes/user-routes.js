const router = require('express').Router();
const authentification = require('../middleware/authentification');
const multer = require('../middleware/multer-config');

const controllerUser = require('../controllers/user-controller');
const avatarMulter = require('../middleware/avatarMulter-config');

// display
router.post('/signup', controllerUser.signup);
router.post('/login', controllerUser.login);
router.post('/logout', authentification, controllerUser.logout);
router.get('/', authentification, controllerUser.giveAllUsers);
router.get('/me', authentification, controllerUser.whoIsUser);
router.put('/profile/:id', authentification, avatarMulter, controllerUser.avatarImageAdd);
router.get('/:id', authentification, controllerUser.giveUserInfo);
router.put('/:id', authentification, multer, controllerUser.change);
router.delete('/:id', authentification, multer, controllerUser.removeUser);

module.exports = router;
 
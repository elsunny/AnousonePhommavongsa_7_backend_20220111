const express = require('express');
const router = express.Router();
const authentification = require('../middleware/authentification');
const multer = require('../middleware/multer-config');
const controllerMedia = require('../controllers/media-controller');


// media route
router.get('/', authentification, controllerMedia.mediaDisplayAll);
router.post('/', authentification, multer, controllerMedia.mediaAdd);
router.get('/:id', authentification, controllerMedia.mediaDisplayOne);
router.delete('/:id', authentification, controllerMedia.mediaRemove);


module.exports = router;
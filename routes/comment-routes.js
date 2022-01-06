const express = require('express');
const router = express.Router();
const authentification = require('../middleware/authentification');
const controllerComment = require('../controllers/comment-controller.js');

// comment route
router.get('/:id', authentification, controllerComment.commentDisplayAll); // id correspond à l'id du médiaId
router.post('/:id', authentification, controllerComment.commentAdd); // id correspond à l'id du médiaId
router.delete('/:id', authentification, controllerComment.commentRemove);


module.exports = router;




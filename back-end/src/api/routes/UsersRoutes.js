const router = require('express').Router();
const UserController = require('../controller/UsersController');

const tokenValidation = require('../middlewares/TokenValidation');
const registerValidation = require('../middlewares/RegisterValidation');

router.get('/', tokenValidation, UserController.getAllUsers);
router.post('/register', registerValidation, UserController.createUser);
router.put('/:userId', tokenValidation, UserController.updateUser);

module.exports = router;
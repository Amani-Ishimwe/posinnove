const express = require('express');
const router = express.Router()
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

//Public routes
router.post('/register', userController.register);
router.post('/login', userController.login);


//protected routes
router.get('/dashboard', auth, (req ,res)=>{
    res.send('Welcome to the dashboard');
})
router.post('/logout', auth, userController.logout);

module.exports = router;

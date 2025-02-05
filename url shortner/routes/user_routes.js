const express = require('express');
const {handleUserSignUP,handleRenderUserSignUp} = require('../controllers/user_controller');


const router = express.Router();

router.post('/',handleUserSignUP);
router.get('/signup',handleRenderUserSignUp);

module.exports = router;
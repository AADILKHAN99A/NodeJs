const User = require('../models/user_model');

async function handleUserSignUP(req,res) {
    const {name, email, password} = req.body;
    await User.create({
        name,email,password
    });

    return res.render("home");
}

async function handleRenderUserSignUp(req,res) {
    return res.render('signup');
}

module.exports = {handleUserSignUP,handleRenderUserSignUp}
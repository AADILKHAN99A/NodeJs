const express = require('express');

const router = express.Router();

// router.get('/', async (req, res) => {
//     const allDbUsers = await User.find({});
//     const html = `<ul>
//     ${allDbUsers.map((user) => `<li>${user.first_name} - ${user.email}</li>`).join("")}</ul>`

//     res.send(html);

// })

// Rest APi

router.get('/', async (req, res) => {
    const allDbUsers = await User.find({});
    return res.json(allDbUsers);
});

router.get('/:id', async (req, res) => {


    const user = await User.findById(req.params.id);
    if (!user) {
        return res.status(404).json({ msg: "User not Found" });
    }

    return res.status(200).json(user);
});

router.post('/', async (req, res) => {


    const body = req.body;

    if (!body || !body.first_name || !body.last_name || !body.email || !body.gender) {
        return res.status(400).json({ msg: "All fields are required." });
    }

    const result = await User.create({
        first_name: body.first_name,
        last_name: body.last_name,
        email: body.email,
        gender: body.gender
    })

    console.log("User Created:", result);
    return res.status(201).json({ msg: "success" });
});

router.patch('/:id', async (req, res) => {

    const { first_name, last_name, email, gender } = req.body; // Destructure body to get these values
    await User.findByIdAndUpdate(req.params.id, {
        first_name: first_name,
        last_name: last_name,
        email: email,
        gender: gender
    });

    return res.json({status:"Success"});

});


router.delete('/:id', (req, res) => {
    const id = Number(req.params.id);

    const index = users.findIndex((user) => user.id === id);
    users.splice(index, 1);

    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err) => {

        // Return the updated user object
        return res.json({ "status": "Success" });
    });

});


module.exports = router;
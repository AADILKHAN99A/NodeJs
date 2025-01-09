const express = require("express");
const fs = require("fs");
const mongoose = require('mongoose');
const { type } = require("os");
const { timeStamp } = require("console");
const app = express();
const PORT = 8000;



/// Schema

const userSchema = mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
    }, email: {
        type: String,
        unique: true,
        required: true
    }, gender: {
        type: String,
    }
}, { timestamps: true });



const User = mongoose.model('user', userSchema);

mongoose.connect('mongodb://127.0.0.1:27017/testSystem').then(() => {
    console.log("MongoDB Connected");

}).catch((err) => {
    console.log(err);

});



/// Middleware

app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {

    fs.appendFile("log.txt", `\n${Date.now()} ${req.ip} ${req.method}: ${req.path}`, (err, data) => {
        next();
    });


});

app.use((req, res, next) => {
    console.log("Hello from Middleware 2");
    next();
});


// Routes

app.get('/users', async (req, res) => {
    const allDbUsers = await User.find({});
    const html = `<ul>
    ${allDbUsers.map((user) => `<li>${user.first_name} - ${user.email}</li>`).join("")}</ul>`

    res.send(html);

})

// Rest APi

app.get('/api/users', async (req, res) => {
    const allDbUsers = await User.find({});
    return res.json(allDbUsers);
});

app.get('/api/users/:id', async (req, res) => {


    const user = await User.findById(req.params.id);
    if (!user) {
        return res.status(404).json({ msg: "User not Found" });
    }

    return res.status(200).json(user);
});

app.post('/api/users', async (req, res) => {


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

app.patch('/api/users/:id', async (req, res) => {

    const { first_name, last_name, email, gender } = req.body; // Destructure body to get these values
    await User.findByIdAndUpdate(req.params.id, {
        first_name: first_name,
        last_name: last_name,
        email: email,
        gender: gender
    });

    return res.json({status:"Success"});

});


app.delete('/api/users/:id', (req, res) => {
    const id = Number(req.params.id);

    const index = users.findIndex((user) => user.id === id);
    users.splice(index, 1);

    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err) => {

        // Return the updated user object
        return res.json({ "status": "Success" });
    });

});


app.listen(PORT, () => console.log(`Server Started at Port: ${PORT}`));



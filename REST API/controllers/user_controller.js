const User = require("../models/user_model");

async function handleGetAllUsers(req, res) {
  const allDbUsers = await User.find({});
  return res.json(allDbUsers);
}

async function handleGetUserById(req, res) {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ msg: "User not Found" });
  }

  return res.status(200).json(user);
}

async function handleCreateUser(req, res) {
  const body = req.body;
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.gender
  ) {
    return res.status(400).json({ msg: "All fields are required." });
  }

  const result = await User.create({
    first_name: body.first_name,
    last_name: body.last_name,
    email: body.email,
    gender: body.gender,
  });
  console.log("User Created:", result);
  return res.status(201).json({ msg: "success" });
}

async function handleUpdateUserById(req, res) {
  const { first_name, last_name, email, gender } = req.body; // Destructure body to get these values
  await User.findByIdAndUpdate(req.params.id, {
    first_name: first_name,
    last_name: last_name,
    email: email,
    gender: gender,
  });

  return res.json({ status: "Success" });
}

async function handleDeleteUserById(req, res) {
  const id = Number(req.params.id);

  User.delete();

  const index = users.findIndex((user) => user.id === id);
  users.splice(index, 1);

  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
    // Return the updated user object
    return res.json({ status: "Success" });
  });
}

module.exports = {
  handleGetAllUsers,
  handleGetUserById,
  handleCreateUser,
  handleUpdateUserById,
  handleDeleteUserById
};

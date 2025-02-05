const express = require("express");
const router = express.Router();
const {
  handleGetAllUsers,
  handleGetUserById,
  handleCreateUser,
  handleUpdateUserById,
  handleDeleteUserById,
} = require("../controllers/user_controller");

// router.get('/', async (req, res) => {
//     const allDbUsers = await User.find({});
//     const html = `<ul>
//     ${allDbUsers.map((user) => `<li>${user.first_name} - ${user.email}</li>`).join("")}</ul>`
//     res.send(html);
// })

// Rest APi

router.route("/").get(handleGetAllUsers).post(handleCreateUser);

router
  .route("/:id")
  .get(handleGetUserById)
  .patch(handleUpdateUserById)
  .delete(handleDeleteUserById);

module.exports = router;

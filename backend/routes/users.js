const userRouter = require("express").Router();
const {
  bodyUser,
  idUser,
  avatarUser,
} = require("../middlewares/request-validation");

const {
  getCurrentUser,
  getUser,
  getUsers,
  updateProfile,
  updateAvatar,
  deleteJwt,
} = require("../controllers/users");

userRouter
  .get("/", getUsers)
  .get("/me", getCurrentUser)
  .get("/:userId", idUser, getUser)
  .patch("/me", bodyUser, updateProfile)
  .patch("/me/avatar", avatarUser, updateAvatar)
  .delete("/me", deleteJwt);

module.exports = userRouter;

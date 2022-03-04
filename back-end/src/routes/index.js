const express = require("express");
const router = express.Router();

// controllers
const { register, login } = require("../controllers/auth");
const {
  users,
  updateUser,
  deleteUser,
  user,
  detailUser,
} = require("../controllers/user");
const {
  follow,
  followers,
  following,
  checkfollow,
  deleteFollow,
} = require("../controllers/follower");
const {
  addFeed,
  getFeedByFollow,
  getAllFeed,
  getFeedByUser,
  addLike,
  likes,
  deleteLike,
} = require("../controllers/feed");
const { addComment, getComment } = require("../controllers/comment");
const { sendMessage, getMessage, contact } = require("../controllers/chat");

//Middlewares
const { auth } = require("../middlewares/auth");
const { uploadFile } = require("../middlewares/uploadFile");

// auth
router.post("/register", register);
router.post("/login", login);

// user
router.get("/users", users);
router.get("/detail-user/:id", detailUser);
router.get("/user", auth, user);
router.patch("/user/:id", auth, uploadFile("image"), updateUser);
router.delete("/user/:id", deleteUser);

// follow
router.post("/follow/:id", auth, follow);
router.get("/following/:id", following);
router.get("/followers/:id", followers);
router.get("/check-follow/:id", auth, checkfollow);
router.delete("/unfollow/:id", auth, deleteFollow);

// feed
router.post("/feed", auth, uploadFile("image"), addFeed);
router.post("/like/:id", auth, addLike);
router.get("/feed/:id", getFeedByFollow);
router.get("/feed-user/:id", getFeedByUser);
router.get("/feeds", getAllFeed);
router.get("/likes", likes);
router.delete("/like/:id", auth, deleteLike);

// comment
router.post("/comment", auth, addComment);
router.get("/comments/:id", getComment);

// message
router.post("/message/:id", auth, sendMessage);
router.get("/message-user/:id", auth, getMessage);
router.get("/contact", auth, contact);

module.exports = router;

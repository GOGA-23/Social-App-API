const express = require("express");
const { verifyToken } = require("../middleware/auth");
const { getFeedPosts, getUserPosts, likePost } = require("../controllers/post");

const router = express.Router();

/* READ */
router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);

/* UPDATE */
router.patch("/:id/like", verifyToken, likePost);

module.exports = router;

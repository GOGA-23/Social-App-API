const Post = require("../models/Post");
const User = require("../models/User");

/* CREATE */
exports.createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;
    // Getting the User from model
    const user = await User.findById(userId);
    // Creating and Adding a new post to database
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
    });

    await newPost.save();
    // Here we were grabbing all posts
    const post = await Post.find();
    res.status(201).json(post);
  } catch (err) {
    res.stats(409).json({ message: err.message });
  }
};

/* READ */
exports.getFeedPosts = async (req, res) => {
  try {
    const post = await Post.find();
    res.status(200).json(post);
  } catch (err) {
    res.stats(404).json({ message: err.message });
  }
};

exports.getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId });
    res.status(200).json(post);
  } catch (err) {
    res.stats(404).json({ message: err.message });
  }
};

/* UPDATE */
exports.likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json(updatedPost);
  } catch (err) {
    res.stats(404).json({ message: err.message });
  }
};

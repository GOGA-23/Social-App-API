require("dotenv").config();

const express = require("express");
const multer = require("multer");
const connectDB = require("./config/db");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");
const { register } = require("./controllers/auth");
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const postRoutes = require("./routes/posts");
const { createPost } = require("./controllers/post");
const { verifyToken } = require("./middleware/auth");
const User = require("./models/User");
const Post = require("./models/Post");
const { users, posts } = require("./data/index");

const app = express();
/* Configuration */
app.use(express.json({ limit: "50mb", extended: true }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(
  cors({
    origin: ["http://localhost:3000", "https://mern-social-app.onrender.com"],
  })
);

/* Getting the static files */
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

/* File Storage */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

/* Route File */
app.post("/auth/register", upload.single("picture"), register);
app.post("/posts", verifyToken, upload.single("picture"), createPost);

/* Routes */
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

/* Mongoose Setup */
connectDB();

/* Listening Port */
const PORT = process.env.PORT || 6001;
app.listen(PORT, () => {
  console.log(`App listening on port : ${PORT}`);
});

/* ADD FAKE DATA ONE TIME TO THE DATABASE */
// User.insertMany(users);
// Post.insertMany(posts);

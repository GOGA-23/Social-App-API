const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      require: true,
      min: 3,
      max: 50,
    },
    lastName: {
      type: String,
      require: true,
      min: 3,
      max: 50,
    },
    email: {
      type: String,
      require: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      require: true,
      min: 8,
    },
    picturePath: {
      type: String,
      default: "",
    },
    friends: {
      type: Array,
      default: [],
    },
    location: String,
    occupation: String,
    viewedProfile: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const connectDB = () => {
  mongoose
    .connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Database Connected ");
    })
    .catch((error) => console.log(`Unable to Connect ${error}`));
};
module.exports = connectDB;

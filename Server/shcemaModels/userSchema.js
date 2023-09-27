const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    pic: {
      type: String,
      default: "https://avatars.dicebear.com/api/male/username.svg",
    },
  },
  {
    timeStamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;

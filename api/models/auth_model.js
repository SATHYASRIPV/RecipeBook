import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: {
        type: Date,
        default: Date.now
    },
  avatar:{type: Object}
});

const User = mongoose.model("users", userSchema)

export default User

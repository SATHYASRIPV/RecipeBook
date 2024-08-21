import mongoose from "mongoose"
import User from "./auth_model.js";

const feedSchema = new mongoose.Schema({
    feed: { type: String, required: true },
    userid: {type: Object, required: true, ref: 'User'}
});

const Feed = mongoose.model("feedbacks", feedSchema)

export default Feed

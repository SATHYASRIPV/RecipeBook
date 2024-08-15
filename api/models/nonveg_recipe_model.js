import mongoose from "mongoose";
import User from "./auth_model.js";
const nvegrecipeSchema = new mongoose.Schema({
  name : { type: String, required: true },
  ingredients : { type: String, required: true },
    procedure: { type: String, required: true },
    createdAt: {
        type: Date,
        default: Date.now
    },
    pic: { type: Object },
    createdBy: {
        type: Object,
        required: true
    // required: true
}
});

const NvegRecipe = mongoose.model("nonvegrecipes", nvegrecipeSchema)

export default NvegRecipe
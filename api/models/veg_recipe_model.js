import mongoose from "mongoose";
// import User from "./auth_model.js";
const vegrecipeSchema = new mongoose.Schema({
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
}
});

const VegRecipe = mongoose.model("vegrecipes", vegrecipeSchema)

export default VegRecipe
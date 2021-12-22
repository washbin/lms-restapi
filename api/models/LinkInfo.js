import mongoose from "mongoose";

const LinkSchema = new mongoose.Schema({
  description: {
    type: String,
  },
  url: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Link", LinkSchema);

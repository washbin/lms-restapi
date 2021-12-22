import mongoose from "mongoose";
const { Schema } = mongoose;

import Link from "./LinkInfo.js";

const ChapterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  links: {
    type: [Schema.Types.ObjectId],
    ref: Link,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Chapter", ChapterSchema);

import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    status: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true }
);

export default mongoose.model("category", categorySchema);

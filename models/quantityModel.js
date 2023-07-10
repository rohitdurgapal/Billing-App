import mongoose from "mongoose";

const quantityModel = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    nameValue: {
      type: String,
      required: true,
    },
    status: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true }
);

export default mongoose.model("quantity", quantityModel);

import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    code: {
      type: Number,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      lowercase: true,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
    },
    subCategoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "subCategory",
    },
    quantityId: {
      type: Array,
      required: true,
      validate: [(value) => value.length > 0, "Select atlease one quantity"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Item", itemSchema);

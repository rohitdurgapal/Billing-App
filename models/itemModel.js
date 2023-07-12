import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    code: {
      type: Number,
      unique: true,
    },
    name: {
      type: String,
      required: true,
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
    status: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true }
);

itemSchema.index(
  { name: 1, categoryId: 1, subCategoryId: 1 },
  { unique: true }
);
export default mongoose.model("Item", itemSchema);

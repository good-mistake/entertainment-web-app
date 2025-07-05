import mongoose from "mongoose";

const thumbnailSchema = new mongoose.Schema({
  trending: {
    small: { type: String },
    large: { type: String },
  },
  regular: {
    small: { type: String },
    medium: { type: String },
    large: { type: String },
  },
});

const mediaSchema = new mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  thumbnail: { type: thumbnailSchema, required: true },
  year: { type: Number, required: true },
  category: { type: String, required: true },
  rating: { type: String, required: true },
  isBookmarked: { type: Boolean, default: false },
  isTrending: { type: Boolean, default: false },
  isDuplicated: { type: Boolean, default: true },
});

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    color: {
      type: String,
      required: false,
    },

    dummyData: {
      type: [mediaSchema],
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model(`User`, userSchema);

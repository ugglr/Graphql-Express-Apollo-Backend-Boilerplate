import mongoose from "mongoose";

const userSchema = {
  // Required fields
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
};

export const User = mongoose.model("User", userSchema);

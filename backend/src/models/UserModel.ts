import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minLength: 3,
  },
  password: {
    required: true,
    minLength: 5,
    trim: true,
    type: String,
  },
  email : {
    type  :String,
    required :true,
    trim  : true
  }
});

export const userModel  = mongoose.model('User', userSchema)


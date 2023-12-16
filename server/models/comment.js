import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  postId: { type: Number, ref: 'Post' }, // Custom reference field to 'Post'
  id: Number,
  name: String,
  email: String,
  body: String
}, { _id: false }); // Disable default '_id' field

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;

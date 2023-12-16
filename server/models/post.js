import mongoose from 'mongoose';
import Comment from './comment.js'; // Import the Comment model

const postSchema = new mongoose.Schema({
  userId: Number,
  id: Number,
  title: String,
  body: String,
});

const Post = mongoose.model('Post', postSchema);

export default Post;

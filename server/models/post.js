import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  userId: Number,
  id: Number,
  title: String,
  body: String
});

const Post = mongoose.model('Post', postSchema);

export default Post;

import express from 'express';
import Post from '../models/post.js';
import Comment from '../models/comment.js';
import axios from 'axios';
const router = express.Router();
const baseURL = "https://jsonplaceholder.typicode.com";

/* GET all posts */
router.get('/', verifyCash, async function (req, res) {
    try {
        const posts = await Post.find({});

        const postsWithComments = await Promise.all(
            posts.map(async (post) => {
                const comments = await Comment.find({ postId: post.id });
                return { ...post.toObject(), comments };
            })
        );
        client.setex(req.originalUrl, 6000, JSON.stringify(postsWithComments), (err, reply) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error while storing data in Redis');
            } else {
                console.log('Data stored in Redis');
                res.status(200).json(postsWithComments);
            }
        });


    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

/* GET a single post by ID */
router.get('/:id', async function (req, res, next) {
    const id = req.params.id;
    try {
        const post = await Post.findById(id);

        if (!post) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(post);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

/* POST create multiple posts */
router.post('/', async function (req, res, next) {
    try {
        const response = await axios.get(baseURL + req.originalUrl);
        const data = response.data;
        const insertedPosts = await Post.insertMany(data);
        res.status(201).json(insertedPosts);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

/* DELETE all posts */
router.delete('/', async function (req, res, next) {
    try {
        await Post.deleteMany({});
        res.status(200).json({ message: 'All posts are deleted' });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});


export default router;

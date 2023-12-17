import express from 'express';
import Post from '../models/post.js';
import Comment from '../models/comment.js';
import axios from 'axios';
import { verifyCash } from '../middleware/verifyCash.js';
const router = express.Router();
const baseURL = "https://jsonplaceholder.typicode.com";
import { createClient } from 'redis';

const client = createClient();


/* GET all posts using cash */
router.get('/usingcash', verifyCash, async function (req, res) {
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
                res.status(200).send(postsWithComments);
            }
        });


    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});


router.get('/', async function (req, res) {
    try {
        const posts = await Post.find({});

        const postsWithComments = await Promise.all(
            posts.map(async (post) => {
                const comments = await Comment.find({ postId: post.id });
                return { ...post.toObject(), comments };
            })
        );
        res.status(200).send(postsWithComments);


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
        res.status(200).send(insertedPosts);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});




export default router;

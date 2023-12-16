import express from 'express';
import User from '../models/user.js';
import axios from 'axios';

const router = express.Router();
const baseURL = "https://jsonplaceholder.typicode.com";

/* GET all users */
router.get('/', async function (req, res, next) {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

/* GET a single user by ID */
router.get('/:id', async function (req, res, next) {
    const userId = req.params.id;
    try {
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

/* POST create multiple users */
router.post('/', async function (req, res, next) {
    try {
        const response = await axios.get(baseURL + req.originalUrl);
        const data = response.data;
        const insertedUsers = await User.insertMany(data);
        res.status(201).json(insertedUsers);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

/* DELETE all users */
router.delete('/', async function (req, res, next) {
    try {
        const deletedUsers = await User.deleteMany({});

        res.status(200).json({ message: 'All users are deleted' });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

export default router;

import express from 'express';
import User from '../models/user.js';
import axios from 'axios';
import { verifyCash } from '../middleware/verifyCash.js';
import { createClient } from 'redis';

const router = express.Router();
const baseURL = "https://jsonplaceholder.typicode.com";

const client = createClient();


/* GET all users using cash */
router.get('/usingcash', verifyCash, async function (req, res) {
    try {
        const users = await User.find({});
        client.setex(req.originalUrl, 6000, JSON.stringify(users), (err, reply) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error while storing data in Redis');
            } else {
                console.log('Data stored in Redis');
                res.status(200).send(users);
            }
        });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

/* GET all users using cash */

router.get('/', async function (req, res) {
    try {
        const users = await User.find({});
        res.status(200).send(users);
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
        res.status(200).send(insertedUsers);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

export default router;

import express from 'express';
import User from '../models/userModel'; // Import your Mongoose User model

const router = express.Router();

/* GET all users */
router.get('/', async function (req, res, next) {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

export default router;

import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

const uri = process.env.URI;

const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};


export async function connectToDB() {
    await mongoose
        .connect(uri, connectionParams)
        .then(() => {
            console.info('Connected to the DB');
        })
        .catch((e) => {
            console.log('error while connecting to DB', e.message);

        });
    return mongoose.connection; // Return the mongoose connection object

};
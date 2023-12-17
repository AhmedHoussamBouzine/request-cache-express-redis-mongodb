import { createClient } from 'redis';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file


// const client = createClient({
//     password: process.env.REDIS_PASSWORD,
//     socket: {
//         host: process.env.REDIS_HOST,
//         port: process.env.REDIS_PORT
//     }
// });

const client = createClient();


export async function verifyCash(req, res, next) {
    try {
        const key = req.originalUrl;

        client.get(key, (err, reply) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error checking Redis for data');
                return;
            }

            if (reply) {
                const data = JSON.parse(reply);
                res.status(200).send(data); 
            } else {
                next();
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error while fetching data');
    }
}



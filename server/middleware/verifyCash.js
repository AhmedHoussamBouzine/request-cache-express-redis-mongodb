import { createClient } from 'redis';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file


const client = createClient({
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT
    }
});


function verifyCash(req, res, next) {
    try {
        const key = req.originalUrl;

        client.get(key, async (err, reply) => {
            if (err) {
                console.error(err);
                res.send('Error checking Redis for data');
                return;
            }

            if (reply) {
                const data = JSON.parse(reply);
                res.send(data);
            } else {
                const response = await axios.get(baseURL + req.originalUrl);
                const data = response.data;

                client.setex(key, 6000, JSON.stringify(data), (err, reply) => {
                    if (err) {
                        console.error(err);
                        res.send('Error while storing data in Redis');
                    } else {
                        console.log('Data stored in Redis');
                        res.send(data);
                    }
                });
            }
        });
    } catch (error) {
        console.error(error);
        res.send('Error while fetching data');
    }
    next();
}

module.exports = verifyCash;

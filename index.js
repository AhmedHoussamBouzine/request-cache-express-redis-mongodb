import { connectToDB } from './server/utils/database.js'; // Assuming 'database.js' is in the same directory. Update the path if needed
import express from 'express';
import dotenv from 'dotenv';
import postRoutes from './server/routes/posts.js'; 
import userRoutes from './server/routes/users.js'; 

dotenv.config();

const app = express();


app.use(express.json());

async function startApp() {
    try {
        const dbConnection = await connectToDB();
        // Use 'dbConnection' for database operations or other tasks
        // Example: dbConnection.model('YourModel').find({});

        console.log('Database connection established successfully!');
    } catch (error) {
        console.error('Error in the application:', error);
    }
}

startApp();


app.use('/posts', postRoutes);
app.use('/users', userRoutes); 

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});





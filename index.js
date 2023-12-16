import { connectToDB } from './server/utils/database.js'; // Assuming 'database.js' is in the same directory. Update the path if needed

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

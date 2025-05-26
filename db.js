const mongoose = require('mongoose');

const mongoURI = "mongodb+srv://dgorin:h2a9FoqfGqOKcWcq@cluster0.vaiww.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"; // Замініть на ваш URI

const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log('MongoDB connected successfully');
    } catch (err) {
        console.error('Database connection failed:', err);
        process.exit(1);
    }
};

module.exports = connectDB;

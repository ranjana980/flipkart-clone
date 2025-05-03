const express = require('express');
const mongoose = require('mongoose');
// Load .env file

const app = express();
const productRoute = require('./routes/e-commerce')
const bodyParser = require("body-parser")
const cors = require('cors');
app.use(express.json({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
mongoose.set('strictQuery', false);
const uri = "mongodb+srv://ranjana20:sX2WLuV9vELvivta@e-commerce.439zbzn.mongodb.net/?retryWrites=true&w=majority&appName=e-commerce";
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Get the default connection
const db = mongoose.connection;

// Event listener for successful connection
db.on('connected', () => {
    console.log('Connected to MongoDB');
});

// Event listener for connection errors
db.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});


app.use(cors({
    origin: "https://e-commerce-frontend-roan.vercel.app",
    // origin: "http://localhost:3000",
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}))


app.use('/api', productRoute)


app.listen(4000, () => {
    console.log('server is running on 4000')
});
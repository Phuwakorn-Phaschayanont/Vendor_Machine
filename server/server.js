// import
const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');

// middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

// Static files - serve public folder and images
app.use(express.static(path.join(__dirname, '../public')));
app.use('/images', express.static(path.join(__dirname, '../image')));

// Default route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// start server
app.listen(5000, () => {
    console.log('Server is running on port 5000');
    console.log('Open http://localhost:5000 to access the vending machine');
});
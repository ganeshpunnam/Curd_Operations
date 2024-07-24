const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Data = require('./db'); // Ensure this path is correct

const app = express();

// Middleware
app.use(cors()); // Enable CORS for all origins
app.use(express.json()); // Parse JSON bodies

// MongoDB connection
mongoose.connect('mongodb+srv://punnamganesh34:ganesh123@cluster0.amdorb8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useUnifiedTopology: true,
    useNewUrlParser: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Failed to connect to MongoDB:', err));

// Routes
app.get('/', async (req, res) => {
    try {
        const allData = await Data.find();
        res.json(allData);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

app.post('/adduser', async (req, res) => {
    const { Username } = req.body;
    if (!Username) {
        return res.status(400).send('Username is required');
    }
    try {
        const newData = new Data({ Username });
        await newData.save();
        const allData = await Data.find();
        res.json(allData);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

app.put('/update/:id', async (req, res) => {
    const { id } = req.params;
    const { Username } = req.body;
    try {
        const updatedData = await Data.findByIdAndUpdate(
            id,
            { Username },
            { new: true, runValidators: true }
        );
        res.json(updatedData);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

app.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await Data.findByIdAndDelete(id);
        const allData = await Data.find();
        res.json(allData);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// Start the server
const PORT = 3500;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

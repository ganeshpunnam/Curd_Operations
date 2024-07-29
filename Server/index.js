const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { Data, Data2 } = require('./db'); 

const app = express();


app.use(cors(
    {
        origin : [""],
        methods :["POST", "GET" , "UPDATE", "DELETE"],
        credentials: true
    }
))
// Middleware
app.use(cors()); // Enable CORS for all origins
app.use(express.json()); // Parse JSON bodies

// MongoDB connection
mongoose.connect('mongodb+srv://punnamganesh34:ganesh123@cluster0.amdorb8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
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
    const { Username, Age, Password } = req.body;
    if (!Username || !Age || !Password) {
        return res.status(400).send('Username, Age, and Password are required');
    }
    try {
        const newData = new Data({ Username, Age, Password });
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

app.get('/product', async (req, res) => {
    try {
        const allData = await Data2.find();
        res.json(allData);
        console.log("Data retrieved successfully");
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

app.post('/addproduct', async (req, res) => {
    const { Productname, ProductRate, ProductImg, ProductDSC } = req.body;
    if (!Productname || !ProductRate || !ProductImg || !ProductDSC) {
        return res.status(400).send('Productname, ProductRate, ProductImg, and ProductDSC are required');
    }
    try {
        const newData = new Data2({ Productname, ProductRate, ProductImg, ProductDSC });
        await newData.save();
        const allData = await Data2.find();
        res.json(allData);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});



 app.delete('/ProductDelete/:id' , async (req , res) =>{
    try{
    const {id} = req.params;
    const deletedProduct = await Data2.findByIdAndDelete(id)
    res.status(200).send(deletedProduct);
} catch (err) {
    res.status(500).send('Server Error');
}
 })

// Start the server
const PORT = 3500;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

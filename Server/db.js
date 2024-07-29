const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
    Username: {
        type: String,
        required: true,
    },
    Date: {
        type: Date,
        default: Date.now
    },
    Age: {
        type: Number,
        required: true,
    },
    Password: {
        type: String,
        required: true,
    },
});

const DataSchema2 = new mongoose.Schema({
    Productname: {
        type: String,
        required: true,
    },

    ProductRate: {
        type: Number,
        required: true,
    },
    ProductImg: {
        type: String,
        required: true,
    },
    ProductDSC: {
        type: String,
        required: true,
    },
});

const Data = mongoose.model('Data', DataSchema);
const Data2 = mongoose.model('Data2', DataSchema2);

module.exports = { Data, Data2 };

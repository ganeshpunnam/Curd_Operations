const mongoose = require('mongoose');

const DataSchema = new mongoose.Schema({
    Username: {
        type: String,
        required: true,
    },
    Date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Data', DataSchema);

const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    
    title: {
        type: String,
        required:true
    },
    description: {
        type: String,
        required: true,
        minlength: [3, 'Description must be at least 3 characters long'],
    },
    status: {
        type: String,
        enum: ['pending', 'completed'],
        default: 'pending',
    },
    userId: {
        type: String,
        required:true
    },
    createdDate: {
        type: Date,
        default: Date.now,
    },
    updatedDate: {
        type: Date,
    },
});

const Todos = mongoose.model('Todos', todoSchema);

module.exports = Todos;

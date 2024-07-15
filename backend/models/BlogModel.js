const mongoose = require('mongoose');
const { Schema } = mongoose;

const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    header:{
        type:String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: String,
        required: true,
    }
},{ timestamps: true });

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;
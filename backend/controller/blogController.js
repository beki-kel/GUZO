const Blog = require('../models/BlogModel');

// Create a new blog
const createBlog = async (req, res) => {
    try {
        const title=req.body.title 
        const content = req.body.description;
        const author = req.body.author;
        const date = req.body.date;

        const newBlog = new Blog({ title,content,author,date});
        const savedBlog = await newBlog.save();
        res.status(201).json(savedBlog);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all blogs
const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().populate('author', 'fname');
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single blog by ID
const getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            return res.status(404).json({ error: 'Blog not found' });
        }
        res.status(200).json(blog);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a blog by ID
const updateBlogById = async (req, res) => {
    try {
        const title = req.body.title;
        const content= req.body.content;
        const author = req.body.author;
        const date = req.body.date;

        const updatedBlog = await Blog.findByIdAndUpdate(
            req.params.id,
            { title, content,author,date },
            { new: true }
        );
        if (!updatedBlog) {
            return res.status(404).json({ error: 'Blog not found' });
        }
        res.status(200).json(updatedBlog);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a blog by ID
const deleteBlogById = async (req, res) => {
    try {
        const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
        if (!deletedBlog) {
            return res.status(404).json({ error: 'Blog not found' });
        }
        res.status(200).json({ message: 'Blog deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createBlog,
    getAllBlogs,
    getBlogById,
    updateBlogById,
    deleteBlogById,
};

const express = require ('express');
const {createBlog, getAllBlogs, getBlogById, updateBlogById, deleteBlogById} = require('../controller/blogController');

const router = express.Router();

router.post('/add/blogs', createBlog);
router.get('/search/blogs', getAllBlogs);
router.get('/select/blogs/:id', getBlogById);
router.put('/update/blogs/:id', updateBlogById);
router.delete('/remove/blogs/:id', deleteBlogById);

module.exports = router;

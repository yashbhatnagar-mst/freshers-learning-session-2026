const Blog = require("../models/blog.model");

/**
 * CREATE BLOG
 */
const createBlog = async (req, res) => {
  try {
    const { title, content, author } = req.body;

    if (!title || !content || !author) {
      return res.status(400).json({
        message: "title, content and author are required",
      });
    }

    const blogExist = await Blog.findOne({
      title,
    });

    if (blogExist) {
      return res.status(409).json({
        message: "title should be unique",
      });
    }

    const blog = await Blog.create({
      title,
      content,
      author,
    });

    if (!blog) {
      return res.status(500).json({
        message: "Internal server error",
      });
    }

    return res.status(201).json({
      message: "Blog created successfully",
      data: blog,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

/**
 * GET ALL BLOGS
 */
const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();

    return res.status(200).json({
      count: blogs.length,
      data: blogs,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

/**
 * GET BLOG BY ID
 */
const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findById(id);
    // const blog = await Blog.find({ _id: id });

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }

    return res.status(200).json({
      data: blog,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

/**
 * UPDATE BLOG
 */
const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findByIdAndUpdate(id, req.body, {
      new: true,
      // runValidators: true,
    });

    // const blog = await Blog.updateOne({ title: req.body.title }, req.body, {
    //   upsert: true,
    // });
    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }

    return res.status(200).json({
      message: "Blog updated successfully",
      data: blog,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

/**
 * DELETE BLOG
 */
const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const blog = await Blog.findByIdAndDelete(id);

    if (!blog) {
      return res.status(404).json({
        message: "Blog not found",
      });
    }

    return res.status(200).json({
      message: "Blog deleted successfully",
      data: blog,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

module.exports = {
  createBlog,
  getBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
};

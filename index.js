const express = require("express");
const cors = require("cors");
const Post = require("./models/Post/Post");
const connectDB = require("./utils/connectDB");
require("dotenv").config();
// const dotenv = require("dotenv");
// dotenv.config();
//call the db
connectDB();

const app = express();

//!PORT
const PORT = process.env.PORT || 3000;

//Middleware
app.use(express.json()); //     req.body pass json data
//cors middleware
app.use(cors()); //     req.headers
const corsOptions = {
  origin: ["http://localhost:3000"],
  credentials: true,
};
app.use(cors(corsOptions));
//!Create Post
app.post("/api/v1/posts/create", async (req, res) => {
  try {
    //get the payload
    const postData = req.body;
    console.log(req.body);
    const postCreated = await Post.create(postData);
    res.status(200).json({
      status: "success",
      message: "Post created successfully",
      postCreated,
    });
  } catch (error) {
    console.log(error);
    res.json(error);
  }
});
//!List Post
app.get("/api/v1/posts", async (req, res) => {
  try {
    const posts = await Post.find();
    res.json({
      status: "success",
      message: "Post Fetched Successfully",
      posts,
    });
  } catch (error) {
    res.json(error);
  }
});
//!Update Post
app.put("/api/v1/posts/:postId", async (req, res) => {
  try {
    //get the post id from params
    const postId = req.params;
    //find the post
    const postFound = await Post.findById(postId);
    if (!postFound) {
      throw new Error("Post not found");
    }
    //update the post
    const postUpdated = await Post.findByIdAndUpdate(
      postId,
      { title: req.body.title },
      { description: req.body.description },
      {
        new: true,
      }
    );
    res.json({
      status: "success",
      message: "Post Updated Successfully",
      postUpdated,
    });
  } catch (error) {
    res.json(error);
  }
});
//!get Post by id
app.get("/api/v1/posts/:postId", async (req, res) => {
  try {
    //get the post id from params
    const postId = req.params;
    //find the post
    const postFound = await Post.findById(postId);

    res.json({
      status: "success",
      message: "Post Fetched Successfully",
      postFound,
    });
  } catch (error) {
    res.json(error);
  }
});
//!Delete Post

//!Start
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

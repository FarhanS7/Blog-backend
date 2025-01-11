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
//!get Post
//!Delete Post

//!Start
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

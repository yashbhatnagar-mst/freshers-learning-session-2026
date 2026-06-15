const express = require("express");
const { userData } = require("./user-data");
// const { middleware1, middleware2, nextObjController } = require("./nextObj");
const { nextObjRouter } = require("./router");
const { globalErrorHandler } = require("./globalErrorHandler");
const { middleware1 } = require("./nextObj");

const app = express();

app.use(express.json());

const createController = (req, res) => {
  console.log("---req.method---");
  console.log(req.method);
  console.log("---req.query---");
  console.log(req.query);
  console.log("---req.params---");
  console.log(req.params);
  console.log("---req.body---");
  console.log(req.body);

  res.send("Hello World");
};

app.use(middleware1);

// app.get("/:id", createController);
// app.post("/:id", createController);

// get user by userId
app.get("/user/:userId", (req, res) => {
  const user = userData.find((u) => u.id === Number(req.params.userId));

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  res.json(user);
});

// get posts of user by userId
app.get("/user/:userId/posts", (req, res) => {
  const user = userData.find((u) => u.id === Number(req.params.userId));

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  res.json(user.posts);
});

// get post of user by userId and postId
app.get("/user/:userId/post/:postId", (req, res) => {
  const user = userData.find((u) => u.id === Number(req.params.userId));

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  const post = user.posts.find((p) => p.id === Number(req.params.postId));

  if (!post) {
    return res.status(404).json({
      message: "Post not found",
    });
  }

  res.json(post);
});

/** TODO */
// /user/:userId/post/:postId/comment/:commentId

app.post("/user/create", (req, res) => {
  // const user = req.body.user;
  const { user } = req.body;
  console.log("user");
  console.log(user);

  // VALIDATION LAYER

  if (!user) {
    return res.status(422).json({
      message: "Invalid body",
    });
  }

  if (!user.id || !user.name || !user.email) {
    return res.status(422).json({
      message: "id, name and email are required",
    });
  }

  userData.push(user); // Main business logic
  res.json(userData);
});

// app.get("/nextObj", middleware2, middleware2, middleware1, nextObjController);
// middleware1 - lavi
// nextObjController / error - kavya
// middleware1 - vp
// middleware1 - tr
// middleware1 - aditi
// middleware2 - aman
// error - khushi
// middleware1 - shubh
// nextObjController - yc

// app.get("/:id", createController);
// app.post("/:id", createController);

app.use("/learn", nextObjRouter);

// health check
app.get("/health", (req, res, next) => {
  try {
    console.log("---req.mst---");
    console.log(req.mst);

    res.setHeader("Content-Type", "text/plain");
    return res.status(200).send("OK");
  } catch (error) {
    next(error);
  }
});

app.use(globalErrorHandler);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

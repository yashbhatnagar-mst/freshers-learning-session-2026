// what is database?
// types of databases
// sql vs nosql

const express = require("express");
const blogRoutes = require("./src/routes/blog.routes");
require("./connect-db");

const app = express();

app.use(express.json());

app.use("/blogs", blogRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

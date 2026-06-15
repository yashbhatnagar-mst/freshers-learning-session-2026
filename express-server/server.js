const express = require("express");

const app = express();

/** 1 */

// app.get("/", (req, res) => {
//   res.send("Hello World 1");
// });

// app.post("/", (req, res) => {
//   res.send("Hello World 2");
// });

// app.patch("/", (req, res) => {
//   res.send("Hello World 3");
// });

// app.delete("/", (req, res) => {
//   res.send("Hello World 4");
// });

/** 2 */
// const responses = {
//   GET: "Hello World 1",
//   POST: "Hello World 2",
//   PATCH: "Hello World 3",
//   DELETE: "Hello World 4",
// };

// app.all("/", (req, res) => {
//   res.send(responses[req.method] || "Method Not Supported");
// });

/** 3*/
// app
//   .route("/")
//   .get((req, res) => res.json({ method: "GET", name: "MST" }))
//   .post((req, res) => res.json({ method: "POST" }))
//   .patch((req, res) => res.json({ method: "PATCH" }))
//   .delete((req, res) => res.json({ method: "DELETE" }));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

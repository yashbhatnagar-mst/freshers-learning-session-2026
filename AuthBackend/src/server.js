import dotenv from "dotenv";

dotenv.config();

import app from "./app.js";
import "./config/db.js";

// await connectDB();

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.json({
    status: 200,
    message: "Api is Running",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

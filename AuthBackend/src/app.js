import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import errorHandler from "./middleware/error.middleware.js";
import morgan from "morgan";
import profileRoutes from "./routes/profile.routes.js";

const app = express();

app.use(express.json());

app.use(cookieParser());

app.use(morgan("dev"));

app.use(cors("*"));

app.use("/api/auth", authRoutes);

app.use("/api/profile", profileRoutes);

// test error handler
//TODO
app.use(errorHandler);

export default app;

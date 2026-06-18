import jwt from "jsonwebtoken";
import apiError from "../utils/apiError.js";

const protect = (req, res, next) => {
  // const authHeader = req.headers.authorization;
  const authHeader = req.body.token;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json(apiError(401, "Unauthorized"));
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

    req.user = decoded;

    next();
  } catch {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
};

export default protect;

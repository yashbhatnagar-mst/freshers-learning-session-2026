import apiError from "../utils/apiError.js";

const errorHandler = (err, req, res, next) => {
  console.log(err);

  const statusCode = err.statusCode || 500;

  return res.status(statusCode).json(
    apiError(
      statusCode,
      err.message || "Internal Server Error"
    )
  );
};

export default errorHandler;
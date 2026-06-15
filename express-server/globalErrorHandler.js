const globalErrorHandler = (req, res) => {
  res.json({
    message: "NOT FOUND",
  });
};

module.exports = { globalErrorHandler };

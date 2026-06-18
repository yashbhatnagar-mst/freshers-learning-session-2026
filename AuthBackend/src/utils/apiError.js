const apiError = (statusCode = 500, message = "Internal Server Error") => {
  return {
    statusCode,
    success: false,
    message,
  };
};

export default apiError;

const apiResponse = (statusCode, message, data = null) => {
  return {
    statusCode,
    success: statusCode < 400,
    message,
    data,
  };
};

export default apiResponse;

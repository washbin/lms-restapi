export const errorHandler = (err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    message: err.message,
    error: err.statusCode ? null : err,
  });
};

export const notFoundHandler = (req, res, next) => {
  res.status(404).json({
    error: "Not found",
  });
};

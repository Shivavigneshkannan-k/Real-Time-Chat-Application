const errorHandler = (err, req, res, next) => {
    if(res.headersSent){
        return next(err);
    }
  if (process.env.NODE_ENV !== "production") {
    console.log(err.stack);
  }
  
  const success = err.success || false;
  const message = err.message || "Internal Server Error";
  const data = err.data || null;
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success,
    message,
    data
  });
};
export default errorHandler;

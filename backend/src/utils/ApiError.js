class ApiError extends Error{
    constructor(message,statusCode,errors = []){
        super(message);
        this.errors = errors;
        this.statusCode = statusCode || 500;
        this.success = false,
        this.data = null
        
        Error.captureStackTrace(this,this.constructor);
    }
}
export default ApiError;
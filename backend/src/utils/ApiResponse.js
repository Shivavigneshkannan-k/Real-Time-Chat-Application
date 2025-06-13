class ApiResponse{
    constructor(message,data = null,statusCode = 200){
        this.success = true,
        this.message = message || "Successfully completed",
        this.data = data,
        this.statusCode = statusCode || 200;
    }
}
export default ApiResponse;
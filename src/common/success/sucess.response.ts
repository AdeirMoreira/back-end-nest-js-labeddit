class SuccessResponse {
  res = (statusCode: number, message: string) => {
    return {
      statusCode: statusCode,
      message: message,
    };
  };
}

export default new SuccessResponse();

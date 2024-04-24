type ErrorResponse = {
  error: {
    code: string;
    error_code: string;
    errors: [];
    message: string;
  };
};
export type { ErrorResponse };

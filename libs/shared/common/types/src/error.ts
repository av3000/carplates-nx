export interface ErrorResponse {
  error: {
    name: string;
    message: string;
  };
  body: unknown;
}

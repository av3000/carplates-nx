export enum ErrorResponseName {
  MissingFields = 'Missing Fields',
  Validation = 'Validation Error',
  Duplicate = 'Already exists',
}

export enum StatusCode {
  HTTP_200_SUCCESS_REQUEST = 200,
  HTTP_403_FORBIDDEN_REQUEST = 403,
  HTTP_404_NOT_FOUND = 404,
  HTTP_400_BAD_REQUEST = 400,
  HTTP_500_INTERNAL_SERVER_ERROR = 500,
}

export enum DefaultModalSize {
  Small = '30rem',
}

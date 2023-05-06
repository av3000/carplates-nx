export enum ResponseName {
  MissingFields = 'Missing Fields',
  Validation = 'Validation Error',
}

export enum StatusCode {
  HTTP_200_SUCCESS_REQUEST = 200,
  HTTP_403_FORBIDDEN_REQUEST = 403,
  HTTP_400_BAD_REQUEST = 400,
  HTTP_500_INTERNAL_SERVER_ERROR = 500,
}

export interface ErrorResponse {
  error: {
    status: number;
    name: string;
    message: string;
  };
  body: any;
}

export interface Carplate extends CarplateParameters {
  id: number;
  createdAt: string;
  updatedAt: string;
}

export interface CarplateParameters {
  plate_name?: string;
  owner?: string;
}

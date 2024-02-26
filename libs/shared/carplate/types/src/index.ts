export interface Carplate extends CarplateParameters {
  id: string;
  createdAt: string;
  updatedAt: string;
}

export interface CarplateParameters {
  plate_name: string;
  owner: string;
}

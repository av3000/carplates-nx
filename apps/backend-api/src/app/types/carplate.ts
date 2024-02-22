export interface Carplate extends CarplateParameters {
  id: number;
  createdAt: string;
  updatedAt: string;
}

export interface CarplateParameters {
  plate_name: string;
  owner: string;
}

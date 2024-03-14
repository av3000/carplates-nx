import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Carplate, CarplateParameters } from '@shared/carplate/types';
import { PaginatedList } from '@shared/common/types';
import {
  BASE_API_TOKEN,
  defaultPaginationFilters,
} from '@shared/common/constants';

@Injectable({
  providedIn: 'root',
})
export class CarplateService {
  constructor(
    private http: HttpClient,
    @Inject(BASE_API_TOKEN) private apiUrl: string
  ) {}

  private endpointUrl = `${this.apiUrl}/carplates`;

  getCarplatesList(
    filters = defaultPaginationFilters
  ): Observable<PaginatedList<Carplate>> {
    const params = {
      ...filters,
    };

    return this.http.get<PaginatedList<Carplate>>(`${this.endpointUrl}`, {
      params,
    });
  }

  getCarplate(id: string): Observable<Carplate> {
    return this.http.get<Carplate>(`${this.endpointUrl}/${id}`);
  }

  createCarplate(carplateParams: CarplateParameters): Observable<Carplate> {
    return this.http.post<Carplate>(`${this.endpointUrl}`, carplateParams);
  }

  updateCarplate(
    id: string,
    carplateParams: CarplateParameters
  ): Observable<Carplate> {
    return this.http.put<Carplate>(`${this.endpointUrl}/${id}`, carplateParams);
  }

  deleteCarplate(id: string): Observable<Carplate> {
    return this.http.delete<Carplate>(`${this.endpointUrl}/${id}`);
  }
}

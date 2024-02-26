import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { Carplate } from '@shared/carplate/types';
import { PaginatedList } from '@shared/common/types';
import { BASE_API_TOKEN } from '@shared/common/constants'; // import the token

@Injectable({
  providedIn: 'root',
})
export class CarplateService {
  constructor(
    private http: HttpClient,
    @Inject(BASE_API_TOKEN) private apiUrl: string
  ) {}

  private endpointUrl = `${this.apiUrl}/carplates`;

  getCarplatesList(): Observable<PaginatedList<Carplate>> {
    return this.http.get<PaginatedList<Carplate>>(`${this.endpointUrl}`);
  }

  getCarplate(id: string): Observable<Carplate> {
    return this.http.get<Carplate>(`${this.endpointUrl}/${id}`);
  }

  createCarplate(carplate: Carplate): Observable<Carplate> {
    return this.http.post<Carplate>(`${this.endpointUrl}`, carplate);
  }

  updateCarplate(id: string, carplate: Carplate): Observable<Carplate> {
    return this.http.put<Carplate>(`${this.endpointUrl}/${id}`, carplate);
  }

  deleteCarplate(id: string): Observable<Carplate> {
    return this.http.delete<Carplate>(`${this.endpointUrl}/${id}`);
  }
}

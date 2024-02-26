import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Carplate } from '@shared/carplate/types';
import { baseAPI } from '@shared/common/constants';
import { PaginatedList } from '@shared/common/types';

@Injectable({
  providedIn: 'root',
})
export class CarplateService {
  private apiUrl = `${baseAPI}/carplates`;

  constructor(private http: HttpClient) {}

  getCarplatesList(): Observable<PaginatedList<Carplate>> {
    return this.http.get<PaginatedList<Carplate>>(this.apiUrl);
  }

  getCarplate(id: string): Observable<Carplate> {
    return this.http.get<Carplate>(`${this.apiUrl}/${id}`);
  }

  createCarplate(carplate: Carplate): Observable<Carplate> {
    return this.http.post<Carplate>(this.apiUrl, carplate);
  }

  updateCarplate(id: string, carplate: Carplate): Observable<Carplate> {
    return this.http.put<Carplate>(`${this.apiUrl}/${id}`, carplate);
  }

  deleteCarplate(id: string): Observable<Carplate> {
    return this.http.delete<Carplate>(`${this.apiUrl}/${id}`);
  }
}

// src/app/services/paesi-service.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaesiService {

  private base = 'https://restcountries.com/v3.1';

  constructor(private http: HttpClient) { }

  // tutti i paesi
  getAll(): Observable<any> {
    return this.http.get(`${this.base}/all`);
  }

  // ricerca per nome (GET /name/{name})
  searchByName(name: string): Observable<any> {
    return this.http.get(`${this.base}/name/${encodeURIComponent(name)}`);
  }

  // per regione (GET /region/{region})
  getByRegion(region: string): Observable<any> {
    return this.http.get(`${this.base}/region/${encodeURIComponent(region)}`);
  }

  // dettaglio per codice ISO (GET /alpha/{code})
  getByCode(code: string): Observable<any> {
    return this.http.get(`${this.base}/alpha/${encodeURIComponent(code)}`);
  }
}

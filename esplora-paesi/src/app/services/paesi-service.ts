// src/app/services/paesi-service.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaesiService {

  private base = 'https://restcountries.com/v3.1';

  constructor(private http: HttpClient) {}

  // ✔ Metodo usato in lista-paesi.ts
  getPaesi(): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.base}/all?fields=name,cca3,region,subregion,capital,population,flags,languages,timezones`
    );
  }

  // ✔ Per pagina dettagli paese
  getPaeseByCode(code: string): Observable<any> {
    return this.http.get<any>(`${this.base}/alpha/${encodeURIComponent(code)}`);
  }

  // ✔ Utile se in futuro fai ricerca diretta
  searchByName(name: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.base}/name/${encodeURIComponent(name)}`);
  }

  // ✔ Utile per filtrare lato API (optional)
  getByRegion(region: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.base}/region/${encodeURIComponent(region)}`);
  }
}

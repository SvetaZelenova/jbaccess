import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/index";
import { IPerson } from "./access";

const apiUrl = `http://127.0.0.1:8000`
@Injectable({
  providedIn: 'root'
})
export class AccessDataService {

  constructor(private http: HttpClient ) {
  }
  getPersonData(): Observable<IPerson[]> {
    return this.http.get<IPerson[]>(`${apiUrl}/person`);
  }
  addPersonName(name): Observable<IPerson[]> {
    return this.http.post<IPerson[]>(`${apiUrl}/person`, name)
  }
}

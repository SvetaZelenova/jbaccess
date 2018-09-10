import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/index";
import { IPerson } from "./access";

@Injectable({
  providedIn: 'root'
})
export class AccessDataService {

  constructor(private http: HttpClient ) {
  }
  getPersonData(): Observable<IPerson[]> {
    return this.http.get<IPerson[]>('/person');
  }
  addPersonName(name): Observable<IPerson[]> {
    return this.http.post<IPerson[]>('/person', name)
  }
}

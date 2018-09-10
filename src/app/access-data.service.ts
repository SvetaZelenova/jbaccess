import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs/index";
import { IPerson } from "./access";
import {environment} from "../environments/environment";

const apiUrl = environment.apiUrl;
@Injectable({
  providedIn: 'root'
})
export class AccessDataService {

  constructor(private http: HttpClient ) {
  }
  getPersonData(): Observable<IPerson[]> {
    return this.http.get<IPerson[]>(`${apiUrl}/person`, {withCredentials:true});
  }
  addPersonName(name): Observable<IPerson[]> {
    return this.http.post<IPerson[]>(`${apiUrl}/person`, name, {withCredentials: true})
  }
}

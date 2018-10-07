import { Injectable } from '@angular/core';
import {catchError, map} from "rxjs/operators";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/index";
import {ApiResponse, Place} from "../common.interfaces";
import {HandleError, HttpErrorHandler} from '../../core/http-error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  private readonly handleError: HandleError;
  private readonly placePath: string;
  constructor(
    private http: HttpClient,
    httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('PlacesService');
    this.placePath = environment.API_BASE_PATH + '/places/';
  }
  getAllPlaces(): Observable<{places: Place[]}> {
    return this.http.get<ApiResponse<Place[]>>(this.placePath)
      .pipe(
        map((data) => {
          const persons = data.payload as Place[];
          return {places: persons}
        })
      )
  }
  createPlace(place: Place): Observable<Place> {
    return this.http.post<ApiResponse<Place>>(this.placePath, place)
      .pipe(
        map( data => ({
          id: data.payload.id,
          name: data.payload.name})),
        catchError(this.handleError<Place>('createPlace', place))
      )
  }
  updatePlace(place: Place): Observable<Place> {
    return this.http.put<ApiResponse<Place>>(this.placePath + place.id, place)
      .pipe(
        map(data => ({
          id: data.payload.id,
          name: data.payload.name})),
        catchError(this.handleError<Place>('updatePlace', place))
      );
  }
  deletePlace(id: number): Observable<number> {
    return this.http.delete<ApiResponse<any>>(this.placePath + id)
      .pipe(
        map(data => data.service.successful ? id : 0),
        catchError(this.handleError<number>('deletePlace', id))
      );
  }
}

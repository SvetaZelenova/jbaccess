import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, zip } from 'rxjs';
import { ApiResponse, Door, Place } from '../common.interfaces';
import {
  HandleError,
  HttpErrorHandler
} from '../../core/http-error-handler.service';
import { Relation } from '../../shared/relations/relations.component';
import { DoorsService } from '../doors/doors.service';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {
  private readonly handleError: HandleError;
  private readonly placePath: string;
  constructor(
    private http: HttpClient,
    private doorsService: DoorsService,
    httpErrorHandler: HttpErrorHandler
  ) {
    this.handleError = httpErrorHandler.createHandleError('PlacesService');
    this.placePath = environment.API_BASE_PATH + '/places/';
  }
  getDoorsByPlaceId(id: number): Observable<Door[]> {
    return this.http
      .get<ApiResponse<Door[]>>(this.placePath + id + '/doors')
      .pipe(
        map(response => response.payload),
        catchError(this.handleError<Door[]>('getDoorsByControllerId', []))
      );
  }
  updateDoorRelation(relation: Relation): Observable<boolean> {
    const url =
      this.placePath + relation.parentId + '/doors/' + relation.relatedEntityId;
    return relation.connected
      ? this.http.put<ApiResponse<any>>(url, null).pipe(
          map(() => true),
          catchError(this.handleError<boolean>('updateDoorRelation', false))
        )
      : this.http.delete<ApiResponse<any>>(url).pipe(
          map(() => false),
          catchError(this.handleError<boolean>('updateDoorRelation', true))
        );
  }
  getDoorsRelationsByPlaceId(id: number): Observable<Relation[]> {
    return zip(
      this.doorsService.getAllDoors(),
      this.getDoorsByPlaceId(id)
    ).pipe(
      map(data => {
        const relations = Array<Relation>();
        const doors = data[0];
        const relatedDoors = data[1];
        doors.forEach(door => {
          relations.push({
            parentId: id,
            relatedEntityId: door.id,
            relatedEntityDisplayName: door.id + ': ' + door.name,
            updating: false,
            connected: relatedDoors.some(d => d.id === door.id)
          });
        });
        return relations;
      }),
      catchError(this.handleError<Relation[]>('getDoorsRelationsByPlaceId', []))
    );
  }
  getAllPlaces(): Observable<Place[]> {
    return this.http.get<ApiResponse<Place[]>>(this.placePath).pipe(
      map(data => {
        return data.payload as Place[];
      })
    );
  }
  createPlace(place: Place): Observable<Place> {
    return this.http.post<ApiResponse<Place>>(this.placePath, place).pipe(
      map(data => ({
        id: data.payload.id,
        name: data.payload.name
      })),
      catchError(this.handleError<Place>('createPlace', place))
    );
  }
  updatePlace(place: Place): Observable<Place> {
    return this.http
      .put<ApiResponse<Place>>(this.placePath + place.id, place)
      .pipe(
        map(data => ({
          id: data.payload.id,
          name: data.payload.name
        })),
        catchError(this.handleError<Place>('updatePlace', place))
      );
  }
  deletePlace(id: number): Observable<number> {
    return this.http.delete<ApiResponse<any>>(this.placePath + id).pipe(
      map(data => (data.service.successful ? id : 0)),
      catchError(this.handleError<number>('deletePlace', id))
    );
  }
}

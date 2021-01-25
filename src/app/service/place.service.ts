import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import {Place} from '../models/place'

@Injectable({
  providedIn: 'root'
})
export class PlaceService {

  placeURL = 'http://localhost:8080/place/';

  constructor(private httpClient: HttpClient) { }

  public list(): Observable<Place[]>{
    return this.httpClient.get<Place[]>(this.placeURL + 'list');
  }
  public detail(id: number): Observable<Place>{
    return this.httpClient.get<Place>(this.placeURL + `detail/${id}`);
  }
  public detailName(name: string): Observable<Place>{
    return this.httpClient.get<Place>(this.placeURL + `detail/${name}`);
  }
  public save(place: Place): Observable<any>{
    return this.httpClient.post<any>(this.placeURL + 'create', place);
  }
  public update(id: number, place: Place): Observable<any>{
    return this.httpClient.put<any>(this.placeURL + `update/${id}`, place);
  }
  public delete(id: number): Observable<any>{
    return this.httpClient.delete<any>(this.placeURL + `delete/${id}`);
  }

}

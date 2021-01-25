import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import {Tour} from '../models/tour'

@Injectable({
  providedIn: 'root'
})
export class TourService {
  tourURL = 'http://localhost:8080/tour/';

  constructor(private httpClient: HttpClient) { }

  public list(): Observable<Tour[]>{
    return this.httpClient.get<Tour[]>(this.tourURL + 'list');
  }
  public detail(id: number): Observable<Tour>{
    return this.httpClient.get<Tour>(this.tourURL + `detail/${id}`);
  }
  public listForPlace(place_id: number): Observable<Tour[]>{
    return this.httpClient.get<Tour[]>(this.tourURL + `place/${place_id}`);
  }
  public save(tour: Tour): Observable<any>{
    return this.httpClient.post<any>(this.tourURL + 'create', tour);
  }
  public update(id: number, tour: Tour): Observable<any>{
    return this.httpClient.put<any>(this.tourURL + `edit/${id}`, tour);
  }
  public delete(id: number): Observable<any>{
    return this.httpClient.delete<any>(this.tourURL + `delete/${id}`);
  }
}

import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import {Reserve} from '../models/reserve'

@Injectable({
  providedIn: 'root'
})
export class ReserveService {
  reserveURL = 'http://localhost:8080/reserve/';

  constructor( private httpClient: HttpClient) { }
  public list(): Observable<Reserve[]>{
    return this.httpClient.get<Reserve[]>(this.reserveURL + 'list');
  }
  public listForUser(user_name: String): Observable<Reserve[]>{
    return this.httpClient.get<Reserve[]>(this.reserveURL + `user/${user_name}`);
  }
  public save(reserve: Reserve): Observable<any>{
    return this.httpClient.post<any>(this.reserveURL + 'create', reserve);
  }
  public delete(id: number): Observable<any>{
    return this.httpClient.delete<any>(this.reserveURL + `delete/${id}`);
  }
}

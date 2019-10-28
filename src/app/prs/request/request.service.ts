import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Request } from './request.class';

const baseUrl = "http://localhost:50288/api/requests";
@Injectable({
  providedIn: 'root'
})
export class RequestService {

  list(): Observable<Request[]> {
    return this.http.get(`${baseUrl}`) as Observable<Request[]>;
  }  
  get(id: string): Observable<Request> {
    return this.http.get(`${baseUrl}/${id}`) as Observable<Request>;
  }
  create(request: Request): Observable<any> {
    return this.http.post(`${baseUrl}`, request) as Observable<any>;
  }
  change(request: Request): Observable<any> {
    return this.http.put(`${baseUrl}/${request.id}`, request) as Observable<any>;
  }
  remove(request: Request): Observable<any> {
    return this.http.delete(`${baseUrl}/${request.id}`) as Observable<any>;
  }

  constructor(private http: HttpClient) { }
}

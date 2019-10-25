import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RequestLine } from './requestline.class';

const baseUrl = "http://localhost:50288/api/requestlines";
@Injectable({
  providedIn: 'root'
})
export class RequestLineService {

  list(): Observable<RequestLine[]> {
    return this.http.get(`${baseUrl}`) as Observable<RequestLine[]>;
  }
  get(id: string): Observable<RequestLine> {
    return this.http.get(`${baseUrl}/${id}`) as Observable<RequestLine>;
  }
  create(request: RequestLine): Observable<any> {
    return this.http.post(`${baseUrl}`, request) as Observable<any>;
  }
  change(request: RequestLine): Observable<any> {
    return this.http.put(`${baseUrl}/${request.id}`, request) as Observable<any>;
  }
  remove(request: RequestLine): Observable<any> {
    return this.http.delete(`${baseUrl}/${request.id}`) as Observable<any>;
  }

  constructor(private http: HttpClient) { }
}

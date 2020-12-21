import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpParams, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private baseUrl = 'http://localhost:8080/users';

  constructor(private http: HttpClient) { }

  searchemployees(minSalary: string, maxSalary: string, SortByColumn: string,
                  SortbyOrder: string, offset: number, limit: number): Observable<any> {

    const encodesort = encodeURIComponent(SortbyOrder);

    return this.http.get('http://localhost:8080/users?minSalary=' + minSalary + '&maxSalary='
      + maxSalary + '&offset=' + offset + '&limit=' + limit + '&sort=' + encodesort + SortByColumn);
  }

}

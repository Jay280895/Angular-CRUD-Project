import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { Student } from '../models/student';

@Injectable({
  providedIn: 'root'
})
export class HttpDataService {
  base_Url = 'http://localhost:4200/assets/data.json'
  // base_Url: string;
  constructor(private _http: HttpClient) { }
  // Http options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  // Handle API errors
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }
  // Create Item with the help of POST method.
  createItem(item: any): Observable<Student> {
    return this._http.post<Student>(this.base_Url, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError))
  }
  // get all students data
  getList(): Observable<Student> {
    return this._http.get<Student>(this.base_Url).pipe(retry(2), catchError(this.handleError))
  }

  // get student data by id
  getItem(id: string): Observable<Student> {
    return this._http.get<Student>(this.base_Url + '/' + id).pipe(retry(2), catchError(this.handleError))
  }
  // student data update by id
  updateItem(id: string, item: any): Observable<Student> {
    return this._http.put<Student>(this.base_Url + '/' + id, JSON.stringify(item), this.httpOptions).pipe(retry(2), catchError(this.handleError))
  }
  // student data delete by id
  deleteItem(id: string): Observable<Student> {
    return this._http.delete<Student>(this.base_Url + '/' + id, this.httpOptions).pipe(retry(2), catchError(this.handleError))
  }
}
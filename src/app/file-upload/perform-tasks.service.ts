import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpEvent, HttpErrorResponse, HttpEventType} from '@angular/common/http'
import {Observable, throwError} from 'rxjs';
import {catchError, map } from 'rxjs/operators'

const httpOptions = {
  headers: new HttpHeaders({ 
    'Access-Control-Allow-Origin':'*',
    'Authorization':'authkey',
    'Cache-Control':  'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
    'Pragma': 'no-cache',
      'Expires': '0'
  })
};

@Injectable({
  providedIn: 'root'
})
export class PerformTasksService {
  handleError(error) {
    let errorMessage = {};
    if (error.error instanceof ErrorEvent) {
        // client-side error
        errorMessage['message'] = error.error.message;
    } else {
        // server-side error
        errorMessage['status'] = error.status
        errorMessage['message']  = error.message;
    }
    console.log("task service errro");
    console.log(errorMessage);
    return throwError(errorMessage);
}
  constructor(private http: HttpClient) { }
  perform(data):  Observable<any> {
    let endpoint = "";
    if (data.id === 1){
      endpoint = 'http://localhost:4200/api/taskOne';
    } else if (data.id === 2){
      endpoint = 'http://localhost:4200/api/taskTwo';
    }
    else if (data.id === 3){
      endpoint = 'http://localhost:4200/api/taskThree';
    }
    console.log("request to ", endpoint);
      return this.http
        .get(endpoint, {
          responseType: 'blob',
          params: {
            "filename": data.filename
          },
          headers: {'Cache-Control':  'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
          'Pragma': 'no-cache'}
        }).pipe(
          // map(((response:any) => response.json())),
          catchError(this.handleError)
      )
  }
}

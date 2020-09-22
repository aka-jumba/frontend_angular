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
export class UploadService {
  handleError(error) {
      let errorMessage = '';
      if (error.error instanceof ErrorEvent) {
          // client-side error
          errorMessage = `Error: ${error.error.message}`;
      } else {
          // server-side error
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
      console.log("upload service errro");
      console.log(errorMessage);
      return throwError(errorMessage);
  }
  constructor(private http: HttpClient) { }
  upload(fileToUpload: File): Observable<any> {
      const endpoint = 'http://localhost:4200/api/upload';
      const formData: FormData = new FormData();
      formData.append('file', fileToUpload, fileToUpload.name);
      return this.http
        .post(endpoint, formData, httpOptions)
        .pipe(
          catchError(this.handleError)
        )
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiCallService {
  constructor(private http: HttpClient) {}
  //Aquí hago que, con <T> makeApiCall pueda recibir un tipo diferente al de Object, que es predefinido. Ahora en cada llamada puedo pasarle el tipo que sea conveniente.
  makeApiCall<T extends {}>(
    url: string,
    method: string,
    options?: any
  ): Observable<T> {
    let httpOptions = {
      headers: new HttpHeaders(),
      body: null,
    };

    if (options) {
      if (options.headers) {
        httpOptions.headers = options.headers;
      }
      if (options.body) {
        httpOptions.body = options.body;
      }
    }

    switch (method.toLocaleLowerCase()) {
      case 'get':
        return this.http
          .get(url, httpOptions)
          .pipe(map((response: any) => response as T));
      //En estas líneas, con pipe, transformo las respuestas para que Angular entienda qué es T
      case 'post':
        return this.http
          .post(url, httpOptions.body, httpOptions)
          .pipe(map((response: any) => response as T));
      case 'put':
        return this.http
          .put(url, httpOptions.body, httpOptions)
          .pipe(map((response: any) => response as T));
      case 'delete':
        return this.http
          .delete(url, httpOptions)
          .pipe(map((response: any) => response as T));
      default:
        throw new Error(`Método no soportado ${method} para la url ${url}`);
    }
  }
}

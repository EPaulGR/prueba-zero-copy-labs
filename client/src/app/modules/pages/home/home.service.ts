import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {


  apiURL = environment.apiURL;

  #http = inject(HttpClient);


  getUser(id: string): Observable<any> {
    return this.#http.get<any>(`${this.apiURL}/users/${id}`);
  }

  updateUser(id: string, user: any): Observable<any> {
    return this.#http.put<any>(`${this.apiURL}/users/${id}`, user);
  }
}

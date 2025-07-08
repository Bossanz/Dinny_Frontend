import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class RestaurantService {
  constructor(private http: HttpClient, private auth: AuthService) {}

  getRestaurants(): Observable<any[]> {
    return this.http.get<any[]>(`${this.auth.apiUrl}/restaurants`);
  }

  toggleBan(id: number): Observable<any> {
    return this.http.put(`${this.auth.apiUrl}/restaurants/${id}/ban`, {});
  }
}

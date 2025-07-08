import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private http: HttpClient, private auth: AuthService) {}

  getCustomers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.auth.apiUrl}/customers`);
  }

  toggleBan(id: number): Observable<any> {
    return this.http.put(`${this.auth.apiUrl}/customers/${id}/ban`, {});
  }
}

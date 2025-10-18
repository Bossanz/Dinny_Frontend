import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private http: HttpClient, private auth: AuthService) {}

  private getHeaders(): HttpHeaders {
    const token = this.auth.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getCustomers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.auth.apiUrl}/admin/customers`, { headers: this.getHeaders() });
  }

  toggleBan(id: number): Observable<any> {
    return this.http.put(`${this.auth.apiUrl}/admin/customers/${id}/ban`, {}, { headers: this.getHeaders() });
  }
}

import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class dashboardService {
  constructor(private http: HttpClient, private auth: AuthService) {}

  getStats(): Observable<{
    customers: number;
    restaurants: number;
    riders: number;
  }> {
    return this.http.get<{
      customers: number;
      restaurants: number;
      riders: number;
    }>(`${this.auth.apiUrl}/dashboard/stats`);
  }

  getReports(): Observable<any[]> {
    return this.http.get<any[]>(`${this.auth.apiUrl}/reports`);
  }
}

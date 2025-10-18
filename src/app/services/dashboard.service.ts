import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private http: HttpClient, private auth: AuthService) {}

  // ฟังก์ชันช่วยสร้าง headers สำหรับส่ง token
  private getAuthHeaders(): { headers: HttpHeaders } {
    const token = this.auth.getToken();
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
  }

  // เรียก API dashboard stats
  getStats(): Observable<{
    customers: number;
    restaurants: number;
    riders: number;
  }> {
    return this.http.get<{
      customers: number;
      restaurants: number;
      riders: number;
    }>(`${this.auth.apiUrl}/admin/dashboard/stats`, this.getAuthHeaders());
  }

  // เรียก API reports
  getReports(): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.auth.apiUrl}/admin/reports`,
      this.getAuthHeaders()
    );
  }
}

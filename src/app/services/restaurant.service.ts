import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class RestaurantService {
  constructor(private http: HttpClient, private auth: AuthService) {}

  private getAuthHeaders(): { headers: HttpHeaders } {
    const token = this.auth.getToken();
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
  }

  // เรียก API ดึงร้านอาหารทั้งหมด
  getRestaurants(): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.auth.apiUrl}/admin/restaurants`,
      this.getAuthHeaders()
    );
  }

  // สลับสถานะ active/banned ร้านอาหาร
  toggleBan(id: number): Observable<any> {
    return this.http.put(
      `${this.auth.apiUrl}/admin/restaurants/${id}/ban`,
      {},
      this.getAuthHeaders()
    );
  }
}

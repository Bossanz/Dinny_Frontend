import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class RiderService {
  constructor(private http: HttpClient, private auth: AuthService) {}

  private getAuthHeaders(): { headers: HttpHeaders } {
    const token = this.auth.getToken();
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`,
      }),
    };
  }

  getRiders(): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.auth.apiUrl}/admin/riders`,
      this.getAuthHeaders()
    );
  }

  toggleBan(id: number): Observable<any> {
    return this.http.put(
      `${this.auth.apiUrl}/admin/riders/${id}/ban`,
      {},
      this.getAuthHeaders()
    );
  }
}

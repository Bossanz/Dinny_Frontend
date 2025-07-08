import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class RiderService {
    
  constructor(private http: HttpClient, private auth: AuthService) {}

  getRiders(): Observable<any[]> {
    return this.http.get<any[]>(`${this.auth.apiUrl}/riders`);
  }

  toggleBan(id: number): Observable<any> {
    return this.http.put(`${this.auth.apiUrl}/riders/${id}/ban`, {});
  }
}
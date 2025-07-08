import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.http
        .post<{ token: string }>(`${this.apiUrl}/login`, { email, password })
        .subscribe({
          next: (res) => {
            localStorage.setItem('token', res.token);
            resolve();
          },
          error: (err) => reject(err),
        });
    });
  }

  logout() {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}

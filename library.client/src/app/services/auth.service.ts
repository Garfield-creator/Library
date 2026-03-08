import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

interface AuthResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'https://localhost:7225/api/auth';
  private readonly tokenKey = 'jwtToken';

  constructor(private http: HttpClient) { }

  register(username: string, email: string, password: string): Observable<AuthResponse> {
    const body = { username, email, password };
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, body)
      .pipe(
        tap(res => this.setToken(res.token))
      );
  }

  login(username: string, password: string): Observable<AuthResponse> {
    const body = { username, password };
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, body)
      .pipe(
        tap(res => this.setToken(res.token))
      );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  private setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }
}


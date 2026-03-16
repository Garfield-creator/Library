import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { environment } from '../../environments/environment';

interface AuthResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.apiUrl + '/auth';
  private readonly tokenKey = 'jwtToken';

  constructor(private http: HttpClient) { }

  register(username: string, email: string, password: string): Observable<AuthResponse> {
    const body = { username, email, password };
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, body)
      .pipe(
        tap(res => this.setToken(res.token)),
        catchError(err => {
          return throwError(() => err);
        })
      );
  }

  login(username: string, password: string): Observable<AuthResponse> {
    const body = { username, password };
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, body)
      .pipe(
        tap(res => this.setToken(res.token)),
        catchError(err => {
          return throwError(() => err);
        })
      );
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }

  isLoggedIn(): boolean {
  const token = this.getToken();
  if (!token) {
    return false;
  }

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expMs = payload.exp * 1000; // exp is in seconds
    if (Date.now() > expMs) {
      this.logout(); // remove token
      return false;
    }
    return true;
  } catch {
    this.logout();
    return false;
  }
}

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  private setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }
}


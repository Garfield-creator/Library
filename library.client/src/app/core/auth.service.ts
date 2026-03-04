@Injectable({ providedIn: 'root' })
export class AuthService {

  private apiUrl = 'https://localhost:5001/api/auth';

  constructor(private http: HttpClient) { }

  login(data: Login) {
    return this.http.post<any>(`${this.apiUrl}/login`, data)
      .pipe(tap(res => localStorage.setItem('token', res.token)));
  }

  register(data: Register) {
    return this.http.post(`${this.apiUrl}/register`, data);
  }

  logout() {
    localStorage.removeItem('token');
  }

  get token() {
    return localStorage.getItem('token');
  }

  isLoggedIn() {
    return !!this.token;
  }
}

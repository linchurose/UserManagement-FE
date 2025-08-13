import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegisterRequest } from '../models/register-request.model';
import { RegisterResponse } from '../models/register-response.model';
import { UserProfile } from '../models/user-profile.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly baseUrl = 'http://localhost:8080';

  // hardcoded API credentials validated by Spring Security
  private basicAuth = 'Basic ' + btoa('apiuser:apipass');

  constructor(private http: HttpClient) {}

  // Register with Basic Auth
  register(req: RegisterRequest): Observable<any> {
    
    const headers = new HttpHeaders({
      Authorization: this.basicAuth,
      'Content-Type': 'application/json'
    });
    return this.http.post(`${this.baseUrl}/api/user/register`, req, { headers });
  }

  // Login to create a session (JSESSIONID cookie)
  login(): Observable<any> {
    const body = new URLSearchParams();
    body.set('username', 'api-username'); // session user = apiusername
    body.set('password', 'api-password');

    return this.http.post(`${this.baseUrl}/login`, body.toString(), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      withCredentials: true // store cookie in browser
    });
  }

  // Get profile (Profile call uses session cookie, not credentials)
  getProfileData(): Observable<UserProfile> {
    return this.http.get<UserProfile>(`${this.baseUrl}/api/user/profile`, {
      withCredentials: true // send cookie to backend
    });
  }
}
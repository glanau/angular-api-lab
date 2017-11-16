import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {JwtHelper} from 'angular2-jwt';

@Injectable()
export class AuthService {
    private jwtHelper: JwtHelper = new JwtHelper();

    constructor(private http: HttpClient) {}

    authenticate(credentials: any) {
        const url = 'http://127.0.0.1:8000/api/login_check';
        const params = {
            'username': credentials.username,
            'password': credentials.password
        };

        return this.http.post<AuthResponse>(url, params);
    }

    logout() {
        localStorage.removeItem('id_token');
    }

    getToken() {
        return localStorage.getItem('id_token');
    }

    getAuthorizationHeader() {
        return 'Bearer ' + this.getToken();
    }

    authenticated() {
        return !this.jwtHelper.isTokenExpired(this.getToken());
    }
}

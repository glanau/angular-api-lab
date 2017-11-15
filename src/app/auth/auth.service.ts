import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class AuthService {

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

    getAuthorizationHeader() {
        return 'Bearer ' + this.getToken();
    }

    getToken() {
        return localStorage.getItem('id_token');
    }

    authenticated() {
        const token = this.getToken();
        if (!token) {
            return false;
        }

        return !this.isTokenExpired(token);
    }

    isTokenExpired(token) {
        return Math.floor(Date.now() / 1000) + (60 * 60) > this.getTokenExpirationTime(token);
    }

    getTokenExpirationTime(token) {
        return JSON.parse(atob(token.split('.')[1])).exp;
    }

}

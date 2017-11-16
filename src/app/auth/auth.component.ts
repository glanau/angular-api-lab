import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from './auth.service';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss']
})
export class AuthComponent {
    loginForm: FormGroup;
    error: string;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authService: AuthService
    ) {
        this.loginForm = formBuilder.group({
            'username': ['', Validators.required],
            'password': ['', Validators.required]
        });
    }

    onSubmit() {
        this.authService
            .authenticate(this.loginForm.value)
            .subscribe(
                res => {
                    localStorage.setItem('id_token', res.token);
                    this.router.navigate(['post']);
                },
                error => {
                    this.error = error.message;
                }
            );
    }
}

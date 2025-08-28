import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { catchError, of } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
    standalone: true,
    selector: 'app-register',
    imports: [FormsModule, CommonModule],
    templateUrl: './register.component.html',
    styleUrl: './common.component.css'
})
export class RegisterComponent {
    email = '';
    password = '';
    password2 = '';

    msg = '';

    successMsg = '';

    constructor(private auth: AuthService, private router: Router) { }

    onRegister() {
        if (this.password !== this.password2) {
            this.msg = 'Passwords are not the same';
            return;
        }

        this.auth.register(this.email, this.password).pipe(
            catchError((err) => {
                if (typeof err.error?.error === 'string') {
                    this.msg = err.error?.error;
                    return of(null);
                }
                this.msg = err?.error?.errors[0]?.msg || 'Register error';
                this.successMsg = '';
                return of(null);
            })
        ).subscribe(res => {
            if ((res as any).success) {
                this.successMsg = 'Registered';
                this.msg = '';
            }
        });
    }
}

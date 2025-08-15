import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from './auth.service';
import { CommonModule } from '@angular/common';
import { catchError, of } from 'rxjs';

@Component({
    standalone: true,
    selector: 'app-login',
    imports: [FormsModule, CommonModule],
    templateUrl: './login.component.html',
})
export class LoginComponent {
    email = '';
    password = '';

    msg = '';

    constructor(private auth: AuthService, private router: Router) { }

    onLogin() {
        this.auth.login(this.email, this.password).pipe(
            catchError((err) => {
                this.msg = err?.error?.errors[0]?.msg || 'Login error';
                return of(null);
            })
        ).subscribe(res => {
            if ((res as any).success) {
                this.router.navigate(['/dashboard']);
            }
        });
    }
}

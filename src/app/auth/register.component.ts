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
    templateUrl: './register.component.html'
})
export class RegisterComponent {
    email = '';
    password = '';

    msg = '';

    successMsg = '';

    constructor(private auth: AuthService, private router: Router) { }

    onRegister() {
        this.auth.register(this.email, this.password).pipe(
            catchError((err) => {
                this.msg = err?.error?.errors[0]?.msg || 'Register error';
                this.successMsg = '';
                return of(null);
            })
        ).subscribe(res => {
            if ((res as any).success) {
                this.successMsg = 'Registered';
                this.msg = '';
            }
            // this.router.navigate(['/login']);
        });
    }
}

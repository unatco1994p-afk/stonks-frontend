import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  standalone: true,
  selector: 'app-register',
  imports: [FormsModule, RouterLink],
  template: `
    <h2>Rejestracja</h2>
    <form (ngSubmit)="onRegister()">
      <input [(ngModel)]="email" name="email" placeholder="Email" required>
      <input [(ngModel)]="password" name="password" placeholder="Hasło" type="password" required>
      <button type="submit">Zarejestruj</button>
    </form>
        <button routerLink="/">Do strony głównej</button>
  `
})
export class RegisterComponent {
  email = '';
  password = '';

  constructor(private auth: AuthService, private router: Router) {}

  onRegister() {
    this.auth.register(this.email, this.password).subscribe(() => {
      this.router.navigate(['/login']);
    });
  }
}

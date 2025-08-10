import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  template: `
    <h2>Logowanie</h2>
    <form (ngSubmit)="onLogin()">
      <input [(ngModel)]="email" name="email" placeholder="Email" required>
      <input [(ngModel)]="password" name="password" placeholder="Hasło" type="password" required>
      <button type="submit">Zaloguj</button>
    </form>
    <br />
    <button routerLink="/">Do strony głównej</button>
  `
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private auth: AuthService, private router: Router) {}

  onLogin() {
    this.auth.login(this.email, this.password).subscribe(() => {
      this.router.navigate(['/dashboard']);
    });
  }
}

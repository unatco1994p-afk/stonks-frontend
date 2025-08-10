import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout-button',
  standalone: true,
  template: `
    <button (click)="logout()">Wyloguj</button>
  `
})
export class LogoutButtonComponent {
  constructor(private router: Router) {}

  logout() {
    localStorage.removeItem('token'); // usuń token
    this.router.navigate(['/login']); // przekieruj
  }
}

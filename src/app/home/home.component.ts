import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [RouterLink],
  template: `
    <h1>Witaj w aplikacji</h1>
    <button routerLink="/login">Zaloguj</button>
    <button routerLink="/register">Rejestruj</button>
  `
})
export class HomeComponent {}

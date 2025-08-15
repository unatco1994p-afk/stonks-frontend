import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoginComponent } from '../auth/login.component';
import { RegisterComponent } from '../auth/register.component';
import { WindowComponent } from '../windows/window.component';
import { WindowTabDirective } from '../windows/window-tab.directive.component';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [RouterLink, LoginComponent, RegisterComponent, WindowComponent, WindowTabDirective],
  templateUrl: './home.component.html'
})
export class HomeComponent {}

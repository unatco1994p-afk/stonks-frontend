import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";

@Component({
  standalone: true,
  selector: 'app-theme',
  imports: [RouterLink],
  templateUrl: './theme.component.html'
})
export class ThemeComponent {}

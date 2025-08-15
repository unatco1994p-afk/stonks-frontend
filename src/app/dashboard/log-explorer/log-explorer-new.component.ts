import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { ApiService } from "../../services/api.service";
import { FormsModule } from "@angular/forms";

@Component({
  standalone: true,
  selector: 'app-log-explorer-new',
  imports: [CommonModule, FormsModule],
  templateUrl: './log-explorer-new.component.html',
  styleUrl: './log-explorer-new.component.css'
})
export class LogExplorerNewComponent {
    private api = inject(ApiService);

    content: string = '';   

    addLog(): void {
        this.api.addLog({content: this.content}).subscribe(() => {
            this.content = '';
        });
    }
}

import {  DatePipe, CommonModule } from "@angular/common";
import { Component, inject, OnInit } from "@angular/core";
import { ApiService } from "../../services/api.service";
import { FormsModule } from "@angular/forms";

interface Log {
    id: string,
    ip: string,
    createdAt: {_seconds: number, _nanoseconds: number},
    content: string,
    userAgent: string,
}

@Component({
  standalone: true,
  selector: 'app-log-explorer',
  imports: [CommonModule, FormsModule, DatePipe],
  templateUrl: './log-explorer.component.html',
  styleUrl: './log-explorer.component.css'
})
export class LogExplorerComponent implements OnInit {
    private api = inject(ApiService);

    logs: Log[] = [];

    content: string = '';   

    ngOnInit(): void {
        this.api.getLogs().subscribe(result => {
            this.logs = result.logs;
        });
    }

    addLog(): void {
        this.api.addLog({content: this.content}).subscribe(() => {
            this.ngOnInit();
            this.content = '';
        });
    }
}

import { Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { StatusService } from './status.service';
import { CommonModule } from '@angular/common';

@Component({
    standalone: true,
    imports: [CommonModule],
    selector: 'app-status-bar',
    templateUrl: './statusbar.component.html',
    styleUrls: ['./statusbar.component.css']
})
export class StatusBarComponent implements OnInit {
    message$!: Observable<string>;

    private service = inject(StatusService);

    ngOnInit(): void {
        this.message$ = this.service.getMessage();
    }
}
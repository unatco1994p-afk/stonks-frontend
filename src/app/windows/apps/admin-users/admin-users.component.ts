import { NgFor, NgIf, DatePipe } from "@angular/common";
import { Component, inject, OnInit } from "@angular/core";
import { ApiService } from "../../../services/api.service";

interface User {
    email: string,
    roles: string[],
    createdAt: string,
}

@Component({
  standalone: true,
  selector: 'app-admin-users',
  imports: [NgFor, DatePipe],
  templateUrl: './admin-users.component.html',
  styleUrl: './admin-users.component.css'
})
export class AdminUsersComponent implements OnInit {
    private api = inject(ApiService);

    users: User[] = [];

    ngOnInit(): void {
        this.api.getUsers().subscribe(users => {
            this.users = users;
        });
    }
}

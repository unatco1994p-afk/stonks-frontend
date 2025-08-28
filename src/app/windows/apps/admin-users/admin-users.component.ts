import { NgFor, DatePipe } from "@angular/common";
import { Component, inject, OnInit } from "@angular/core";
import { AdminUsersService, User } from "../../../services/admin-users.service";
import { QuestionWindowComponent } from "../../shared/question.window.component";
import { WindowRegisterService } from "../../window-register.service";
import { StringListWindowComponent } from "../../shared/string-list.window.component";

@Component({
  standalone: true,
  selector: 'app-admin-users',
  imports: [NgFor, DatePipe],
  templateUrl: './admin-users.component.html',
  styleUrl: './admin-users.component.css'
})
export class AdminUsersComponent implements OnInit {
    private windowRegister = inject(WindowRegisterService);
    private api = inject(AdminUsersService);

    users: User[] = [];

    ngOnInit(): void {
        this.refresh();
    }

    refresh() {
        this.api.getUsers().subscribe(users => {
            this.users = users;
        });
    }

    deleteUser(user: User) {
        const ref = this.windowRegister.registerWindow(QuestionWindowComponent, false, {questionText: `Do you really want to remove user ${user.email}?`});
        
        ref.ref.instance.close.subscribe(result => {
            if (result === 'yes') {
                this.api.deleteUser(user.id).subscribe(() => this.refresh());
            }
        });
    }

    editRoles(user: User) {
        const ref = this.windowRegister.registerWindow(StringListWindowComponent, false, {questionText: `Modify roles of ${user.email}:`, inputs: user.roles});
        
        ref.ref.instance.close.subscribe(result => {
            if (result !== 'calcel') {
                const filteredRoles = (result as string[]).filter(r => r != null && r.trim() !== '');

                this.api.updateUserRoles(user.id, filteredRoles).subscribe(() => this.refresh());
            }
        });
    }
}

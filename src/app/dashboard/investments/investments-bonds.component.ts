import { CommonModule } from "@angular/common";
import { Component, inject, OnInit } from "@angular/core";
import { InvestmentsBondsEditComponent } from "./investments-bonds-edit.component";
import { WindowComponent, WindowData } from "../../windows/window.component";
import { Bond, InvestmentsService } from "../../services/investments.service";

@Component({
    standalone: true,
    selector: 'app-investment-bonds',
    imports: [CommonModule, InvestmentsBondsEditComponent, WindowComponent],
    templateUrl: './investments-bonds.component.html',
    styleUrl: './investments-commons.component.css',
}) export class InvestmentsBondsComponent implements OnInit {
    private service = inject(InvestmentsService);
    
    private windowSound = new Audio('assets/sounds/window.wav');
    
    editWindow: WindowData | null = null;
    
    bonds: Bond[] = [];
    
    ngOnInit(): void {
        this.service.getBonds().subscribe(bonds => {
            this.bonds = bonds;
        });
    }

    closeEditWindow() {
        this.editWindow = null;
    }

    openEditWindow() {
        if (!this.editWindow) {
            this.playWindow();
            this.editWindow = {
                id: 60,
                title: 'Add bond',
                x: 20 + Math.random() * 150,
                y: 20 + Math.random() * 100
            }
        }
    }

    playWindow() {
        this.windowSound.currentTime = 0;
        this.windowSound.volume = 0.5;
        this.windowSound.play();
    }
}

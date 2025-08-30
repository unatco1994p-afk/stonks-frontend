import { CommonModule } from "@angular/common";
import { Component, inject, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Stock, InvestmentsService } from "../../../services/investments.service";
import { AbstractWindow } from "../../abstract-window.component";
import { WindowTabDirective } from "../../window-tab.directive.component";
import { WindowComponent } from "../../window.component";
import { StatusService } from "../../../dashboard/statusbar/status.service";

@Component({
  standalone: true,
  selector: 'app-investment-stocks-edit',
  imports: [WindowComponent, WindowTabDirective, CommonModule, ReactiveFormsModule],
  templateUrl: './investments-stocks-edit.window.component.html',
  styleUrls: ['./investments-commons.component.css'],
})
export class InvestmentsStocksEditWindowComponent extends AbstractWindow implements OnInit {
  private service = inject(InvestmentsService);
  private fb = inject(FormBuilder);
  private statusService = inject(StatusService);

  stockForm!: FormGroup;

  @Input() stock?: Stock;
  @Input() id?: string;

  override windowName = 'Stock Details';

  ngOnInit(): void {
    this.stockForm = this.fb.group({
      name: [this.stock?.name ?? '', Validators.required],
      spot: [this.stock?.spot ?? '', Validators.required],
      description: [this.stock?.description ?? ''],
      volume: [this.stock?.volume ?? 0, [Validators.required, Validators.min(1)]],
      price: [this.stock?.price ?? 0, [Validators.required, Validators.min(0)]],
      priceRelativeToCurrency: [this.stock?.priceRelativeToCurrency ?? ''],
      stockTicker: [this.stock?.stockTicker ?? '', Validators.required],
      dividend: [this.stock?.dividend ?? 0, [Validators.min(0)]],
      startDate: [
        this.stock?.startDate ? new Date(this.stock.startDate).toISOString().substring(0, 10) : '',
        Validators.required
      ],
    });
  }

  save() {
    this.stockForm.markAllAsTouched();
    if (!this.stockForm.valid) return;

    const preparedStock: Stock = {
      ...this.stockForm.value,
      startDate: new Date(this.stockForm.value.startDate).toISOString(),
    };

    if (this.id) {
      this.service.updateStock(this.id, preparedStock).subscribe(data => {
        this.statusService.setMessage(`Stock ${data.name} updated.`);
        this.close.emit();
      });
    } else {
      this.service.addStock(preparedStock).subscribe(data => {
        this.statusService.setMessage(`Stock ${data.name} created.`);
        this.close.emit();
      });
    }
  }
}

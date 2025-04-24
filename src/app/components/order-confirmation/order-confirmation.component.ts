import { Component, Input } from '@angular/core';
import { CommonModule }    from '@angular/common';
import { Purchase }        from '../../models/purchase';

@Component({
  selector: 'app-order-confirmation',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-confirmation.component.html'
})
export class OrderConfirmationComponent {
  @Input() purchases: Purchase[] = [];
}

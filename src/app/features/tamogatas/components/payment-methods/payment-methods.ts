import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-payment-methods',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './payment-methods.html',
  styleUrl: './payment-methods.css',
})
export class PaymentMethods {}

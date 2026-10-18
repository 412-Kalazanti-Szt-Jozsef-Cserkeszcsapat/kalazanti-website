import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DonationStore } from '../../state/donation.store';
import { PaymentMethods } from '../payment-methods/payment-methods';
@Component({
  selector: 'app-donation-checkout',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './donation-checkout.html',
  styleUrl: './donation-checkout.css',
  imports: [DecimalPipe, FormsModule, PaymentMethods],
})
export class DonationCheckout {
  readonly store = inject(DonationStore);
}

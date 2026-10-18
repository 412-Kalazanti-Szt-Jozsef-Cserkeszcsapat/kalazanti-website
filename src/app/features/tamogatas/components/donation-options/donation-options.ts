import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { DonationProjectSelect } from '../donation-project-select/donation-project-select';
import { DonationStore } from '../../state/donation.store';
import { DonationAmountInput } from '../donation-amount-input/donation-amount-input';
@Component({
  selector: 'app-donation-options',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './donation-options.html',
  styleUrl: './donation-options.css',
  imports: [DecimalPipe, DonationProjectSelect, DonationAmountInput],
})
export class DonationOptions {
  readonly store = inject(DonationStore);
}

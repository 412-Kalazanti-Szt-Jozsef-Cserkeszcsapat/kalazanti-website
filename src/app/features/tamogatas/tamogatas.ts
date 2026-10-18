import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { AlternativeDonations } from './components/alternative-donations/alternative-donations';
import { DonationCheckout } from './components/donation-checkout/donation-checkout';
import { DonationOptions } from './components/donation-options/donation-options';
import { DonationStore } from './state/donation.store';

@Component({
  selector: 'app-tamogatas',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [AlternativeDonations, DonationCheckout, DonationOptions],
  providers: [DonationStore],
  templateUrl: './tamogatas.html',
  styleUrl: './tamogatas.css',
})
export class Tamogatas implements OnInit {
  readonly store = inject(DonationStore);

  ngOnInit(): void {
    this.store.loadTypes();
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    this.store.submit();
  }
}

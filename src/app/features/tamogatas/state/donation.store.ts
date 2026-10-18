import { DOCUMENT } from '@angular/common';
import { computed, DestroyRef, inject, Injectable, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { catchError, finalize, of } from 'rxjs';
import {
  DEFAULT_DONATION_AMOUNT,
  FALLBACK_DONATION_TYPES,
  MINIMUM_DONATION_AMOUNT,
  PRESET_DONATION_AMOUNTS,
} from '../config/donation.config';
import { DonateType, PaymentType } from '../models/donation.model';
import { DonationService } from '../services/donation.service';
import { donationErrorMessage } from '../utils/donation-error';

/** Provided by the route component so each visit starts with a fresh form. */
@Injectable()
export class DonationStore {
  private readonly api = inject(DonationService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly document = inject(DOCUMENT);
  private readonly types = signal<DonateType[]>([]);
  private readonly loading = signal(true);
  private readonly submitting = signal(false);
  private readonly error = signal<string | null>(null);

  readonly donateTypes = this.types.asReadonly();
  readonly isTypesLoading = this.loading.asReadonly();
  readonly isSubmitting = this.submitting.asReadonly();
  readonly checkoutError = this.error.asReadonly();
  readonly presetAmounts = PRESET_DONATION_AMOUNTS;
  readonly selectedTypeId = signal<number | null>(null);
  readonly selectedAmount = signal<number | 'custom'>(DEFAULT_DONATION_AMOUNT);
  readonly customAmount = signal<number | null>(null);
  readonly frequency = signal<PaymentType>('one_time');
  readonly consentAccepted = signal(false);

  readonly totalAmount = computed(() => {
    const amount = this.selectedAmount() === 'custom' ? this.customAmount() : this.selectedAmount();
    return typeof amount === 'number' && Number.isSafeInteger(amount) && amount > 0 ? amount : 0;
  });
  readonly selectedType = computed(
    () => this.donateTypes().find((type) => type.id === this.selectedTypeId()) ?? null,
  );
  readonly summaryKey = computed(() => `${this.totalAmount()}-${this.frequency()}`);
  readonly canSubmit = computed(
    () =>
      this.consentAccepted() &&
      this.totalAmount() >= MINIMUM_DONATION_AMOUNT &&
      !this.isTypesLoading() &&
      !this.isSubmitting() &&
      this.selectedType() !== null,
  );

  loadTypes(): void {
    this.loading.set(true);
    this.api
      .getDonateTypes()
      .pipe(
        // Preserve the existing offline fallback policy.
        catchError(() => of(FALLBACK_DONATION_TYPES)),
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.loading.set(false)),
      )
      .subscribe((types) => {
        this.types.set(types);
        if (!types.some((type) => type.id === this.selectedTypeId())) {
          this.selectedTypeId.set(types[0]?.id ?? null);
        }
      });
  }

  selectAmount(amount: number | 'custom'): void {
    this.selectedAmount.set(amount);
  }

  selectFrequency(frequency: PaymentType): void {
    this.frequency.set(frequency);
  }

  submit(): void {
    if (this.isSubmitting()) return;
    this.error.set(null);
    if (!this.consentAccepted()) {
      this.error.set('Kérjük, fogadd el az adatkezelési tájékoztatót!');
      return;
    }
    if (this.totalAmount() < MINIMUM_DONATION_AMOUNT) {
      this.error.set(
        `A minimális támogatási összeg ${MINIMUM_DONATION_AMOUNT} Ft a banki tranzakciós korlátok miatt.`,
      );
      return;
    }
    const type = this.selectedType();
    if (this.isTypesLoading() || !type) {
      this.error.set('Kérjük, válassz támogatási célt!');
      return;
    }

    this.submitting.set(true);
    this.api
      .createCheckoutSession({
        amount: this.totalAmount(),
        payment_type: this.frequency(),
        // Both fields are retained for compatibility with the current API.
        donate_type: type.id,
        donate_type_id: type.id,
      })
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.submitting.set(false)),
      )
      .subscribe({
        next: (response) => {
          if (response?.checkout_url) {
            this.document.defaultView?.location.assign(response.checkout_url);
          } else {
            this.error.set('Nem sikerült létrehozni a fizetési felületet. Kérjük, próbáld újra!');
          }
        },
        error: (error) => this.error.set(donationErrorMessage(error)),
      });
  }
}

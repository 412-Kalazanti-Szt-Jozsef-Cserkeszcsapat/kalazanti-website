import { ChangeDetectionStrategy, Component, computed, model, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { MINIMUM_DONATION_AMOUNT } from '../../config/donation.config';
import {
  formatDonationAmount,
  parseDonationAmount,
  caretAfterDigits,
} from '../../utils/donation-amount';
@Component({
  selector: 'app-donation-amount-input',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './donation-amount-input.html',
  styleUrl: './donation-amount-input.css',
  imports: [DecimalPipe],
})
export class DonationAmountInput {
  readonly amount = model<number | null>(null);
  readonly amountError = signal<string | null>(null);
  readonly minimumAmount = MINIMUM_DONATION_AMOUNT;
  readonly formattedAmount = computed(() => formatDonationAmount(this.amount()));

  onInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const raw = input.value;
    const caret = input.selectionStart ?? raw.length;
    const digitsBeforeCaret = raw.slice(0, caret).replace(/\D/g, '').length;
    const parsed = parseDonationAmount(raw);
    if (!parsed.valid) {
      this.amountError.set(parsed.error);
      this.amount.set(null);
      input.setCustomValidity(parsed.error);
      return;
    }

    this.amountError.set(null);
    input.setCustomValidity('');
    this.amount.set(parsed.value);
    const formatted = this.formattedAmount();
    input.value = formatted;
    const position = caretAfterDigits(formatted, digitsBeforeCaret);
    input.setSelectionRange(position, position);
  }

  onBeforeInput(event: InputEvent): void {
    const input = event.target as HTMLInputElement;
    const start = input.selectionStart ?? 0;
    if (start !== input.selectionEnd) return;
    // Deleting a grouping space also removes the adjacent digit, avoiding a stuck caret.
    const backward = event.inputType === 'deleteContentBackward';
    const forward = event.inputType === 'deleteContentForward';
    if (backward && input.value[start - 1] === ' ') {
      event.preventDefault();
      input.setRangeText('', Math.max(0, start - 2), start, 'end');
    } else if (forward && input.value[start] === ' ') {
      event.preventDefault();
      input.setRangeText('', start, start + 2, 'start');
    } else {
      return;
    }
    input.dispatchEvent(new Event('input', { bubbles: true }));
  }
}

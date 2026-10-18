import { HttpErrorResponse } from '@angular/common/http';
import { MINIMUM_DONATION_AMOUNT } from '../config/donation.config';

export function donationErrorMessage(error: unknown): string {
  if (error instanceof HttpErrorResponse) {
    const code = error.error?.error;
    if (error.status === 422 || code === 'small_ammount') {
      return `Az összeg kisebb a minimálisan megengedettnél (min. ${MINIMUM_DONATION_AMOUNT} Ft).`;
    }
    if (error.status === 404 || code === 'donate_type_not_found') {
      return 'A kiválasztott támogatási típus nem található.';
    }
    if (typeof code === 'string') return `Hiba történt: ${code}`;
  }
  return 'Hiba történt a fizetés indítása során. Kérjük, próbáld újra később!';
}

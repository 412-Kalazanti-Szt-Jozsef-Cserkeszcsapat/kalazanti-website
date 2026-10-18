import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  input,
  signal,
} from '@angular/core';
import { FOUNDATION_DETAILS } from '../../config/donation.config';
@Component({
  selector: 'app-alternative-donations',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './alternative-donations.html',
  styleUrl: './alternative-donations.css',
})
export class AlternativeDonations {
  readonly purpose = input<string>();
  readonly details = FOUNDATION_DETAILS;
  readonly copyMessage = signal<string | null>(null);
  private readonly destroyRef = inject(DestroyRef);
  private messageTimer?: ReturnType<typeof setTimeout>;
  private destroyed = false;

  constructor() {
    this.destroyRef.onDestroy(() => {
      this.destroyed = true;
      clearTimeout(this.messageTimer);
    });
  }

  async copyToClipboard(value: string, label: string): Promise<void> {
    try {
      await navigator.clipboard.writeText(value);
      this.showMessage(`${label} kimásolva a vágólapra!`);
    } catch {
      this.showMessage('A másolás nem sikerült. Kérjük, másold ki az adatot kézzel.');
    }
  }

  private showMessage(message: string): void {
    if (this.destroyed) return;
    clearTimeout(this.messageTimer);
    this.copyMessage.set(message);
    this.messageTimer = setTimeout(() => this.copyMessage.set(null), 3000);
  }
}

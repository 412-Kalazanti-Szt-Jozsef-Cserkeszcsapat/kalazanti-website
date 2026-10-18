import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { DonationService } from './services/donation.service';
import { DonateType } from './models/donation.model';

@Component({
  selector: 'app-tamogatas',
  standalone: true,
  imports: [FormsModule, DecimalPipe],
  templateUrl: './tamogatas.html',
  styleUrl: './tamogatas.css',
})
export class Tamogatas implements OnInit {
  private readonly donationService = inject(DonationService);

  // Támogatási típusok a backendből
  readonly donateTypes = signal<DonateType[]>([]);
  readonly isTypesLoading = signal(true);
  readonly valasztottDonateTypeId = signal<number | null>(null);

  // Form állapotok
  readonly eloreBeallitottArak = [1000, 3500, 7000, 15000, 25000];
  readonly kivalasztottAr = signal<number | 'unique'>(3500);
  readonly egyediAr = signal<number | null>(null);
  readonly gyakorisag = signal<'egyszeri' | 'rendszeres'>('egyszeri');

  readonly email = signal('');
  readonly nev = signal('');
  readonly megjegyzes = signal('');
  readonly aszfElfogadva = signal(false);

  // Folyamatban lévő hívás és hibaüzenetek
  readonly isSubmitting = signal(false);
  readonly hibaUzenet = signal<string | null>(null);

  // Értesítés másoláskor
  readonly masolvaUzenet = signal<string | null>(null);

  // Kiszámított végösszeg
  readonly vegosszeg = computed(() => {
    const ar = this.kivalasztottAr();
    if (ar === 'unique') {
      return this.egyediAr() && this.egyediAr()! > 0 ? this.egyediAr()! : 0;
    }
    return ar;
  });

  // Kiválasztott támogatási típus leírása
  readonly kivalasztottDonateType = computed(() => {
    const types = this.donateTypes();
    const currentId = this.valasztottDonateTypeId();
    return types.find((t) => t.id === currentId) ?? null;
  });

  ngOnInit(): void {
    this.betoltDonateTypes();
  }

  betoltDonateTypes(): void {
    this.isTypesLoading.set(true);
    this.donationService.getDonateTypes().subscribe({
      next: (types) => {
        this.donateTypes.set(types);
        this.isTypesLoading.set(false);
        if (types.length > 0 && this.valasztottDonateTypeId() === null) {
          this.valasztottDonateTypeId.set(types[0].id);
        }
      },
      error: (err) => {
        console.error('Nem sikerült betölteni a támogatási típusokat:', err);
        this.isTypesLoading.set(false);
        // Fallback alapértelmezett típusok hiba vagy offline API esetén
        const fallbackTypes: DonateType[] = [
          { id: 1, title: 'Általános működés és csapatfenntartás', description: 'A cserkészcsapat működésének és mindennapi eszközeinek támogatása.' },
          { id: 2, title: 'Nyári csapat- és őrsi táborok', description: 'Gyermekek táboroztatása, sátrak, felszerelések és rászoruló támogatása.' },
          { id: 3, title: 'Cserkészotthon felújítása', description: 'A csapatotthon felszerelése és karbantartása.' },
        ];
        this.donateTypes.set(fallbackTypes);
        if (this.valasztottDonateTypeId() === null) {
          this.valasztottDonateTypeId.set(fallbackTypes[0].id);
        }
      },
    });
  }

  setAr(ar: number | 'unique'): void {
    this.kivalasztottAr.set(ar);
  }

  setGyakorisag(tipus: 'egyszeri' | 'rendszeres'): void {
    this.gyakorisag.set(tipus);
  }

  onTamogatasSubmit(event: Event): void {
    event.preventDefault();
    this.hibaUzenet.set(null);

    if (!this.aszfElfogadva()) {
      this.hibaUzenet.set('Kérjük, fogadd el az adatkezelési tájékoztatót!');
      return;
    }

    const osszeg = this.vegosszeg();
    if (osszeg < 412) {
      this.hibaUzenet.set('A minimális támogatási összeg 412 Ft a banki tranzakciós korlátok miatt.');
      return;
    }

    this.isSubmitting.set(true);

    const payment_type = this.gyakorisag() === 'rendszeres' ? 'recurring' : 'one_time';
    const donateTypeId = this.valasztottDonateTypeId();

    this.donationService
      .createCheckoutSession({
        amount: osszeg,
        payment_type: payment_type,
        donate_type: donateTypeId ?? undefined,
        donate_type_id: donateTypeId ?? undefined,
      })
      .subscribe({
        next: (response) => {
          this.isSubmitting.set(false);
          if (response?.checkout_url) {
            window.location.href = response.checkout_url;
          } else {
            this.hibaUzenet.set('Nem sikerült létrehozni a fizetési felületet. Kérjük, próbáld újra!');
          }
        },
        error: (err) => {
          this.isSubmitting.set(false);
          console.error('Hiba a Stripe Checkout munkamenet indításakor:', err);
          
          if (err.status === 422 || err.error?.error === 'small_ammount') {
            this.hibaUzenet.set('Az összeg kisebb a minimálisan megengedettnél (min. 412 Ft).');
          } else if (err.status === 404 || err.error?.error === 'donate_type_not_found') {
            this.hibaUzenet.set('A kiválasztott támogatási típus nem található.');
          } else if (err.error?.error) {
            this.hibaUzenet.set(`Hiba történt: ${err.error.error}`);
          } else {
            this.hibaUzenet.set('Hiba történt a fizetés indítása során. Kérjük, próbáld újra később!');
          }
        },
      });
  }

  masolasVagolapra(szoveg: string, cimke: string): void {
    navigator.clipboard.writeText(szoveg).then(() => {
      this.masolvaUzenet.set(`${cimke} kimásolva a vágólapra!`);
      setTimeout(() => this.masolvaUzenet.set(null), 3000);
    });
  }
}

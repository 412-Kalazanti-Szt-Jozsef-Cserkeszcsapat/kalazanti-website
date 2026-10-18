import { Component, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-tamogatas',
  standalone: true,
  imports: [FormsModule, DecimalPipe],
  templateUrl: './tamogatas.html',
  styleUrl: './tamogatas.css',
})
export class Tamogatas {
  // Stripe adományozási link
  readonly stripeDonationUrl = 'https://donate.stripe.com/test_bJe5kC90H25tbCDdYL3wQ00';

  // Form állapotok
  readonly valasztottProjekt = signal('altalanos');
  readonly eloreBeallitottArak = [1000, 3500, 7000, 15000, 25000];
  readonly kivalasztottAr = signal<number | 'unique'>(3500);
  readonly egyediAr = signal<number | null>(null);
  readonly gyakorisag = signal<'egyszeri' | 'rendszeres'>('egyszeri');

  readonly email = signal('');
  readonly nev = signal('');
  readonly megjegyzes = signal('');
  readonly aszfElfogadva = signal(false);

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

  setAr(ar: number | 'unique'): void {
    this.kivalasztottAr.set(ar);
  }

  setGyakorisag(tipus: 'egyszeri' | 'rendszeres'): void {
    this.gyakorisag.set(tipus);
  }

  onTamogatasSubmit(event: Event): void {
    event.preventDefault();
    if (!this.aszfElfogadva()) {
      alert('Kérjük, fogadd el az adatkezelési tájékoztatót!');
      return;
    }
    if (this.vegosszeg() <= 0) {
      alert('Kérjük, adj meg egy érvényes támogatási összeget!');
      return;
    }

    // Átirányítás a Stripe biztonságos fizetési oldalra
    window.open(this.stripeDonationUrl, '_blank', 'noopener,noreferrer');
  }

  masolasVagolapra(szoveg: string, cimke: string): void {
    navigator.clipboard.writeText(szoveg).then(() => {
      this.masolvaUzenet.set(`${cimke} kimásolva a vágólapra!`);
      setTimeout(() => this.masolvaUzenet.set(null), 3000);
    });
  }
}

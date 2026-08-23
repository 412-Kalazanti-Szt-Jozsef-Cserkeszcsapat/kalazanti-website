import { Component, input } from '@angular/core';

@Component({
  selector: 'app-loading-screen',
  standalone: true,
  templateUrl: './loading-screen.html',
  styleUrl: './loading-screen.css'
})
export class LoadingScreenComponent {
  szoveg = input<string>('Betöltés folyamatban...');
  alcim = input<string>('412. Kalazanti Szent József Cserkészcsapat');
  teljesKepernyo = input<boolean>(false);
}

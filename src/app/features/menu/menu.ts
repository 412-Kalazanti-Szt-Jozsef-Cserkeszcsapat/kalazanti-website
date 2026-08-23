import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: 'app-menu',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})
export class Menu {
  donationUrl = 'https://donate.stripe.com/test_bJe5kC90H25tbCDdYL3wQ00'; // Custom link a támogatáshoz

  routes = [
    { path: '', label: 'Kezdőlap', exact: true },
    { path: 'programok', label: 'Programok', exact: false },
    { path: 'hirek', label: 'Hírek', exact: false },
    { path: 'rolunk', label: 'Rólunk', exact: false },
    { path: 'kapcsolat', label: 'Kapcsolat', exact: false },
  ];
}

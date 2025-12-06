import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
  selector: 'app-menu',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})
export class Menu {
  routes = [
    { path: '', label: 'Kezdőlap', exact: true },
    { path: 'programok', label: 'Programok', exact: false },
    { path: 'rolunk', label: 'Rólunk', exact: false },
    { path: 'kapcsolat', label: 'Kapcsolat', exact: false },
  ];
}

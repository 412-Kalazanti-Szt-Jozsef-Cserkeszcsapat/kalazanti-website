import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NavItem } from './nav-item.model';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
})
export class Menu {
  readonly mobileMenuNyitva = signal(false);

  readonly routes: NavItem[] = [
    { path: '', label: 'Kezdőlap', exact: true },
    { path: 'programok', label: 'Programok', exact: false },
    { path: 'hirek', label: 'Hírek', exact: false },
    { path: 'kapcsolat', label: 'Kapcsolat', exact: false },
    { path: 'tamogatas', label: 'Támogatás', exact: false },
  ];

  toggleMobileMenu(): void {
    this.mobileMenuNyitva.update((open) => !open);
  }

  closeMobileMenu(): void {
    this.mobileMenuNyitva.set(false);
  }
}

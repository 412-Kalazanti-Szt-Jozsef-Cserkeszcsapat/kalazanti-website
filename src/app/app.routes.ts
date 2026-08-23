import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { NotFound } from './pages/not-found/not-found';
import { Programok } from './pages/programok/programok';
import { Kapcsolat } from './pages/kapcsolat/kapcsolat';
import { Hirek } from './features/hirek/hirek/hirek';
// Figyelj rá, hogy az import útvonal pontosan egyezzen a te fájlszerkezeteddel!
import { HirReszletek } from './features/hirek/hir-reszletek/hir-reszletek';

export const routes: Routes = [
  {
    path: '',
    component: Home
  },
  {
    path: 'programok',
    component: Programok
  },
  {
    path: 'kapcsolat',
    component: Kapcsolat
  },
  {
    path: 'hirek',
    component: Hirek
  },
  {
    path: 'hirek/:url',
    component: HirReszletek
  },
  // A '**' (NotFound) MINDIG a legvégén (utolsóként, legalul) kell legyen!
  {
    path: '**',
    component: NotFound
  }
];
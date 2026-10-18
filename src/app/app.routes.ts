import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { About } from './features/about/about';
import { Programok } from './features/programok/programok';
import { Kapcsolat } from './features/kapcsolat/kapcsolat';
import { Hirek } from './features/hirek/components/hirek/hirek';
import { HirReszletek } from './features/hirek/components/hir-reszletek/hir-reszletek';
import { Tamogatas } from './features/tamogatas/tamogatas';
import { NotFound } from './features/not-found/not-found';

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
    path: 'hirek',
    component: Hirek
  },
  {
    path: 'hirek/:url',
    component: HirReszletek
  },
  {
    path: 'kapcsolat',
    component: Kapcsolat
  },
  {
    path: 'tamogatas',
    component: Tamogatas
  },
  {
    path: 'adomany',
    redirectTo: 'tamogatas',
    pathMatch: 'full'
  },
  {
    path: 'rolunk',
    component: About
  },
  // A '**' (NotFound) MINDIG a legvégén (utolsóként, legalul) kell legyen!
  {
    path: '**',
    component: NotFound
  }
];
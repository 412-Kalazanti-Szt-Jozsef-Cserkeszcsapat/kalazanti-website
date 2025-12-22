import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { NotFound } from './pages/not-found/not-found';
import { Programok } from './pages/programok/programok';
import { Kapcsolat } from './pages/kapcsolat/kapcsolat';
import { Hirek } from './pages/hirek/hirek';

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
    path: '**',
    component: NotFound
  }
];

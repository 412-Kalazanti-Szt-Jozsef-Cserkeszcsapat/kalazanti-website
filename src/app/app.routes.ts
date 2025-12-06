import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { NotFound } from './pages/not-found/not-found';
import { Programok } from './pages/programok/programok';

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
    path: '**',
    component: NotFound
  }
];

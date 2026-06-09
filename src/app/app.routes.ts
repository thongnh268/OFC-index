import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('./pages/home/home-placeholder.component').then((m) => m.HomePlaceholderComponent),
  },
];

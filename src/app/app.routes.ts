import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'about/milestones',
    loadComponent: () =>
      import('./pages/about/milestones/milestones.component').then((m) => m.MilestonesComponent),
  },
  {
    path: 'about/board',
    loadComponent: () =>
      import('./pages/about/board/board.component').then((m) => m.BoardComponent),
  },
  {
    path: 'about/quality',
    loadComponent: () =>
      import('./pages/about/quality/quality.component').then((m) => m.QualityComponent),
  },
];

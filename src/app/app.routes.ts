import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Routes } from '@angular/router';

import { PostsService } from './core/posts';

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
  {
    path: 'products/wood-chips-export',
    loadComponent: () =>
      import('./pages/products/wood-chips/wood-chips.component').then((m) => m.WoodChipsComponent),
  },
  {
    path: 'products/wood-pellets-export',
    loadComponent: () =>
      import('./pages/products/wood-pellets/wood-pellets.component').then(
        (m) => m.WoodPelletsComponent,
      ),
  },
  {
    path: 'products/timber-processing',
    loadComponent: () =>
      import('./pages/products/timber/timber.component').then((m) => m.TimberComponent),
  },
  {
    path: 'products/afforestation',
    loadComponent: () =>
      import('./pages/products/afforestation/afforestation.component').then(
        (m) => m.AfforestationComponent,
      ),
  },
  {
    path: 'products/transportation-and-warehouses',
    loadComponent: () =>
      import('./pages/products/transportation/transportation.component').then(
        (m) => m.TransportationComponent,
      ),
  },
  {
    path: 'news',
    // Resolve posts before activation so the list is rendered when the router restores scroll.
    resolve: { posts: () => inject(PostsService).getAll() },
    loadComponent: () =>
      import('./pages/news/news-list.component').then((m) => m.NewsListComponent),
  },
  {
    path: 'news/:slug',
    resolve: {
      post: (route: ActivatedRouteSnapshot) =>
        inject(PostsService).getBySlug(route.paramMap.get('slug') ?? ''),
    },
    loadComponent: () =>
      import('./pages/news/news-detail.component').then((m) => m.NewsDetailComponent),
  },
];

import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'books',
  },
  {
    path: 'books',
    loadComponent: () =>
      import('./pages/book-list/book-list.component').then(
        (m) => m.BookListComponent
      ),
  },
  {
    path: 'books/:id',
    loadComponent: () =>
      import('./pages/book-detail/book-detail.component').then(
        (m) => m.BookDetailComponent
      ),
  },
  {
    path: 'favorites',
    loadComponent: () =>
      import('./pages/favorites/favorites.component').then(
        (m) => m.FavoritesComponent
      ),
  },
  {
    path: '**',
    redirectTo: 'books',
  },
];

import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map, of, switchMap } from 'rxjs';

import { BooksService } from '../../../core/services/books.service';
import {
  loadBook,
  loadBookFailure,
  loadBookSuccess,
  loadBooks,
  loadBooksFailure,
  loadBooksSuccess,
} from './books.actions';

@Injectable()
export class BooksEffects {
  private readonly actions$ = inject(Actions);
  private readonly booksService = inject(BooksService);

  readonly loadBooks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadBooks),
      switchMap(() =>
        this.booksService.getBooks().pipe(
          map((books) => loadBooksSuccess({ books })),
          catchError((error) =>
            of(loadBooksFailure({ errorMessage: error?.message ?? 'Failed to load books' }))
          )
        )
      )
    )
  );

  readonly loadBook$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadBook),
      exhaustMap(({ id }) =>
        this.booksService.getBook(id).pipe(
          map((book) => loadBookSuccess({ book })),
          catchError((error) => of(loadBookFailure({ errorMessage: error?.message ?? 'Failed to load book' })))
        )
      )
    )
  );
}

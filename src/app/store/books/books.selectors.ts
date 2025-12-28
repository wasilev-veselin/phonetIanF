import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BooksState } from './books.reducer';

export const selectBooksState = createFeatureSelector<BooksState>('books');
export const selectBooks = createSelector(selectBooksState, (state) => state.books);
export const selectBooksLoading = createSelector(selectBooksState, (state) => state.loading);
export const selectBooksError = createSelector(selectBooksState, (state) => state.error);
export const selectedBook = createSelector(selectBooksState, (state) => state.selectedBook);
export const selectedBookLoading = createSelector(selectBooksState, (state) => state.selectedBookLoading);
export const selectedBookError = createSelector(selectBooksState, (state) => state.selectedBookError);
export const selectFavorites = createSelector(selectBooksState, (state) => state.favorites);

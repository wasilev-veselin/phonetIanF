import { createReducer, on } from '@ngrx/store';
import { Book } from '../../../core/model/book.model';
import { loadBooks, loadBooksFailure, loadBooksSuccess } from './books.actions';

export interface BooksState {
  books: Book[];
  loading: boolean;
  error: string | null;
}

export const initialState: BooksState = {
  books: [],
  loading: false,
  error: null,
};

export const booksReducer = createReducer(
  initialState,
  on(loadBooks, (state) => ({ ...state, loading: true, error: null })),
  on(loadBooksSuccess, (state, { books }) => ({ ...state, books, loading: false, error: null })),
  on(loadBooksFailure, (state, { errorMessage }) => ({ ...state, loading: false, error: errorMessage }))
);

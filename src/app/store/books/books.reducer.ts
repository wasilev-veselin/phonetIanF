import { createReducer, on } from '@ngrx/store';
import { Book } from '../../../core/model/book.model';
import {
  loadBook,
  loadBookFailure,
  loadBookSuccess,
  loadBooks,
  loadBooksFailure,
  loadBooksSuccess,
} from './books.actions';

export interface BooksState {
  books: Book[];
  loading: boolean;
  error: string | null;
  selectedBook: Book | null;
  selectedBookLoading: boolean;
  selectedBookError: string | null;
}

export const initialState: BooksState = {
  books: [],
  loading: false,
  error: null,
  selectedBook: null,
  selectedBookLoading: false,
  selectedBookError: null,
};

export const booksReducer = createReducer(
  initialState,
//books list 
  on(loadBooks, (state) => ({ ...state, loading: true, error: null })),
  on(loadBooksSuccess, (state, { books }) => ({ ...state, books, loading: false, error: null })),
  on(loadBooksFailure, (state, { errorMessage }) => ({ ...state, loading: false, error: errorMessage })),
 
//book details 
  on(loadBook, (state) => ({
    ...state,
    selectedBookLoading: true,
    selectedBookError: null,
  })),

  on(loadBookSuccess, (state, { book }) => ({
    ...state,
    selectedBook: book,
    selectedBookLoading: false,
    selectedBookError: null,
  })),

  on(loadBookFailure, (state, { errorMessage }) => ({
    ...state,
    selectedBookLoading: false,
    selectedBookError: errorMessage,
  }))
);

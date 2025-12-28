import { createReducer, on } from '@ngrx/store';
import { Book } from '../../../core/model/book.model';
import {
  loadBook,
  loadBookFailure,
  loadBookSuccess,
  loadBooks,
  loadBooksFailure,
  loadBooksSuccess,
  toggleFavorite,
} from './books.actions';

export interface BooksState {
  books: Book[];
  loading: boolean;
  error: string | null;
  selectedBook: Book | null;
  selectedBookLoading: boolean;
  selectedBookError: string | null;
  favorites: Book[];
}

export const initialState: BooksState = {
  books: [],
  loading: false,
  error: null,
  selectedBook: null,
  selectedBookLoading: false,
  selectedBookError: null,
  favorites: [],
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
  })),

  on(toggleFavorite, (state, { book }) => {
    const exists = state.favorites.some((fav) => fav.id === book.id);
    const favorites = exists
      ? state.favorites.filter((fav) => fav.id !== book.id)
      : [...state.favorites, book];

    return {
      ...state,
      favorites,
    };
  })
);

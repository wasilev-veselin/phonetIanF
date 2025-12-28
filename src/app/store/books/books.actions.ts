import { createAction, props } from '@ngrx/store';
import { Book } from '../../../core/model/book.model';

export const loadBooks = createAction('[Books] Load Books');
export const loadBooksSuccess = createAction('[Books] Load Books Success', props<{ books: Book[] }>());
export const loadBooksFailure = createAction('[Books] Load Books Failure', props<{ errorMessage: string }>());

//book details 
export const loadBook = createAction('[Book] Load Book', props<{ id: string }>());
export const loadBookSuccess = createAction('[Book] Load Book Success', props<{ book: Book }>());
export const loadBookFailure = createAction('[Book] Load Book Failure', props<{ errorMessage: string }>());

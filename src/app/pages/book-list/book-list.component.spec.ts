import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { BookListComponent } from './book-list.component';
import { loadBooks, toggleFavorite } from '../../store/books/books.actions';
import {
  selectBooks,
  selectBooksError,
  selectBooksLoading,
} from '../../store/books/books.selectors';
import { Book } from '../../../core/model/book.model';

describe('BookListComponent', () => {
  let store: MockStore;
  let fixture: ComponentFixture<BookListComponent>;
  let component: BookListComponent;

  const mockBooks: Book[] = [
    {
      id: '1',
      url: 'url',
      name: 'Book One',
      isbn: '123',
      authors: ['Author'],
      numberOfPages: 100,
      publisher: 'Pub',
      country: 'Country',
      mediaType: 'Hardcover',
      released: '2020-01-01',
    },
    {
      id: '2',
      url: 'url-2',
      name: 'Second Title',
      isbn: '321',
      authors: ['Author Two'],
      numberOfPages: 200,
      publisher: 'OtherPub',
      country: 'OtherCountry',
      mediaType: 'Paperback',
      released: '2021-01-01',
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BookListComponent, RouterTestingModule],
      providers: [
        provideMockStore({
          selectors: [
            { selector: selectBooks, value: mockBooks },
            { selector: selectBooksLoading, value: false },
            { selector: selectBooksError, value: null },
          ],
        }),
      ],
    });

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(BookListComponent);
    component = fixture.componentInstance;
  });

  it('should dispatch loadBooks on init', () => {
    const dispatchSpy = spyOn(store, 'dispatch');

    fixture.detectChanges();
    expect(dispatchSpy).toHaveBeenCalledWith(loadBooks());
  });

  it('should expose selector values via signals', () => {
    expect(component.books()).toEqual(mockBooks);
    expect(component.booksLoading()).toBeFalse();
    expect(component.booksError()).toBeNull();
  });

  it('should dispatch toggleFavorite when toggling a book', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    const book = mockBooks[0];

    component.toggleFavorite(book);

    expect(dispatchSpy).toHaveBeenCalledWith(toggleFavorite({ book }));
  });

  it('should filter books by search term', () => {
    component.onSearch('book one');
    expect(component.filteredBooks().length).toBe(1);

    component.onSearch('missing');
    expect(component.filteredBooks().length).toBe(0);
  });
});

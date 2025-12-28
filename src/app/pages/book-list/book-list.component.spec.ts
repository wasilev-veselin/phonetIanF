import { TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';

import { BookListComponent } from './book-list.component';
import { BooksService } from '../../../core/services/books.service';
import { loadBooks, toggleFavorite } from '../../store/books/books.actions';
import {
  selectBooks,
  selectBooksError,
  selectBooksLoading,
} from '../../store/books/books.selectors';
import { Book } from '../../../core/model/book.model';

describe('BookListComponent', () => {
  let store: MockStore;
  let component: BookListComponent;
  const booksServiceMock = {
    getBook: jasmine.createSpy('getBook').and.returnValue(of(null)),
  };

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
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [BookListComponent],
      providers: [
        provideMockStore({
          selectors: [
            { selector: selectBooks, value: mockBooks },
            { selector: selectBooksLoading, value: false },
            { selector: selectBooksError, value: null },
          ],
        }),
        { provide: BooksService, useValue: booksServiceMock },
      ],
    });

    store = TestBed.inject(MockStore);
    component = TestBed.createComponent(BookListComponent).componentInstance;
  });

  it('should dispatch loadBooks on init', () => {
    const dispatchSpy = spyOn(store, 'dispatch');

    component.ngOnInit();

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
});

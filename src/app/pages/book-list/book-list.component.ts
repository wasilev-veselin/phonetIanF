import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';

import { Book } from '../../../core/model/book.model';
import { BooksService } from '../../../core/services/books.service';
import { loadBooks } from '../../store/books/books.actions';
import {
  selectBooks,
  selectBooksError,
  selectBooksLoading,
} from '../../store/books/books.selectors';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, RouterModule, DatePipe],
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
})
export class BookListComponent implements OnInit {
  private readonly booksService = inject(BooksService);
  private readonly store = inject(Store);

  readonly books = this.store.selectSignal(selectBooks);
  readonly booksLoading = this.store.selectSignal(selectBooksLoading);
  readonly booksError = this.store.selectSignal(selectBooksError);

  private readonly selectedBookId = signal<string | null>(null);

  readonly selectedBook = rxResource<Book | null, string | null>({
    request: this.selectedBookId,
    defaultValue: null,
    loader: ({ request }) =>
      request ? this.booksService.getBook(request) : of(null),
  });

  ngOnInit(): void {
    this.store.dispatch(loadBooks());
  }

  toggleFavorite(book: Book) {
    console.log('toggleFavorite', book);
  }
}

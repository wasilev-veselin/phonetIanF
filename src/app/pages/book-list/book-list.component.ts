import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';

import { Book } from '../../../core/model/book.model';
import { loadBooks, toggleFavorite } from '../../store/books/books.actions';
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
  private readonly store = inject(Store);

  readonly books = this.store.selectSignal(selectBooks);
  readonly booksLoading = this.store.selectSignal(selectBooksLoading);
  readonly booksError = this.store.selectSignal(selectBooksError);

  readonly searchTerm = signal('');
  readonly filteredBooks = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    return this.books().filter((book) => {
      const haystack = `${book.name} ${book.authors.join(' ')} ${book.publisher} ${book.country} ${book.isbn}`.toLowerCase();

      return haystack.includes(term);
    });
  });

  ngOnInit(): void {
    this.store.dispatch(loadBooks());
  }

  toggleFavorite(book: Book) {
    this.store.dispatch(toggleFavorite({ book }));
  }

  onSearch(term: string) {
    this.searchTerm.set(term);
  }
}

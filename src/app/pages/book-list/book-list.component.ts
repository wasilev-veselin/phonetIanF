import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';

import { Book } from '../../../core/model/book.model';
import { BooksService } from '../../../core/services/books.service';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [CommonModule, RouterModule, DatePipe],
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss'],
})
export class BookListComponent {
  private readonly booksService = inject(BooksService);

  readonly books = rxResource<Book[], void>({
    defaultValue: [],
    loader: () => this.booksService.getBooks(),
  });

  private readonly selectedBookId = signal<string | null>(null);

  readonly selectedBook = rxResource<Book | null, string | null>({
    request: this.selectedBookId,
    defaultValue: null,
    loader: ({ request }) =>
      request ? this.booksService.getBook(request) : of(null),
  });

  selectBook(id: string) {
    this.selectedBookId.set(id);
  }

  toggleFavorite(book: Book) {
    console.log('toggleFavorite', book);
  }
}

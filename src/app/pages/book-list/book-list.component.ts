import { CommonModule, DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';

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

  readonly books$: Observable<Book[]> = this.booksService.getBooks();
  selectedBook$?: Observable<Book>;

  selectBook(id: string): void {
    this.selectedBook$ = this.booksService.getBook(id);
  }

  toggleFavorite(book: Book): void {
    console.log('toggleFavorite',book)
  }
}

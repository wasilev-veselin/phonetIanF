import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Observable, map, switchMap } from 'rxjs';

import { Book } from '../../../core/model/book.model';
import { BooksService } from '../../../core/services/books.service';

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './book-detail.component.html',
  styleUrl: './book-detail.component.scss',
})
export class BookDetailComponent implements OnInit {
  private readonly booksService = inject(BooksService);
  private readonly route = inject(ActivatedRoute);
  selectedBook$?: Observable<Book>;

  ngOnInit(): void {
    this.selectedBook$ = this.route.paramMap.pipe(
      map((params) => params.get('id') ?? ''),
      switchMap((id) => this.booksService.getBook(id))
    );
  }
}

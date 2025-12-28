import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';

import { loadBook } from '../../store/books/books.actions';
import {
  selectedBook as selectedBookSelector,
  selectedBookError as selectedBookErrorSelector,
  selectedBookLoading as selectedBookLoadingSelector,
} from '../../store/books/books.selectors';

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './book-detail.component.html',
  styleUrl: './book-detail.component.scss',
})
export class BookDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly store = inject(Store);

  selectedBook = this.store.selectSignal(selectedBookSelector);
  selectedBookLoading = this.store.selectSignal(selectedBookLoadingSelector);
  selectedBookError = this.store.selectSignal(selectedBookErrorSelector);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.store.dispatch(loadBook({ id }));
    }
  }
}

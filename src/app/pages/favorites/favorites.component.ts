import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';

import { Book } from '../../../core/model/book.model';
import { toggleFavorite } from '../../store/books/books.actions';
import { selectFavorites } from '../../store/books/books.selectors';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss'],
})
export class FavoritesComponent {
  private readonly store = inject(Store);
  readonly favorites = this.store.selectSignal(selectFavorites);

  toggleFavorite(book: Book) {
    this.store.dispatch(toggleFavorite({ book }));
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map, Observable } from 'rxjs';

import { ApiBook, Book } from '../model/book.model';

const API_BASE = 'https://www.anapioficeandfire.com/api/books';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  private readonly http = inject(HttpClient);

  getBooks(): Observable<Book[]> {
    return this.http
      .get<ApiBook[]>(API_BASE)
      .pipe(
        map((books) =>
          books.map((book) => ({
            ...book,
            id: book.url.split('/').pop() ?? '',
          }))
        )
      );
  }

  getBook(id: string): Observable<Book> {
    return this.http.get<ApiBook>(`${API_BASE}/${id}`).pipe(
      map((book) => ({
        ...book,
        id,
      }))
    );
  }
}

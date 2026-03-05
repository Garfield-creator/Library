import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Book } from '../models/book';
import { BookCreateDto } from '../models/bookCreateDto';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private apiUrl = '/api/books';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Book[]> {
    const token = localStorage.getItem('jwtToken'); // wherever you store it
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<Book[]>(this.apiUrl, { headers });
  }

  getById(id: number): Observable<Book> {
    const token = localStorage.getItem('jwtToken'); // wherever you store it
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<Book>(`${this.apiUrl}/${id}`, { headers });
  }

  create(book: BookCreateDto): Observable<BookCreateDto> {
    const token = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    return this.http.post<BookCreateDto>(this.apiUrl, book, { headers });
  }

  update(id: number, book: Book) {
    const token = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    return this.http.put(`${this.apiUrl}/${id}`, book, { headers });
  }

  delete(id: number) {
    const token = localStorage.getItem('jwtToken');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    return this.http.delete(`${this.apiUrl}/${id}`, { headers });
  }
}

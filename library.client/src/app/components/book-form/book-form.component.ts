import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Book } from '../../models/book';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './book-form.component.html'
})
export class BookFormComponent implements OnInit {

  form!: FormGroup;

  bookId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private bookService: BookService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {

    this.form = this.fb.group({
      title: [''],
      author: [''],
      publishingDate: ['']
    });

    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.bookId = +id;
      this.bookService.getById(this.bookId)
        .subscribe(book => this.form.patchValue(book));
    }
  }

  submit() {
    console.log("Submit clicked");
    const book = this.form.value as Book;

    if (this.bookId) {
      this.bookService.update(this.bookId, book)
        .subscribe(() => this.router.navigate(['/books']));
    } else {
      this.bookService.create(book)
        .subscribe(() => this.router.navigate(['/books']));
    }
  }
}

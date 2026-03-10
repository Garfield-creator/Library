import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { FormGroup } from '@angular/forms';

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
    const formValue = this.form.value;
    const dto = {
      title: formValue.title,
      author: formValue.author,
      publishingDate: formValue.publishingDate
    };
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.bookId = +id;
      this.bookService.update(this.bookId, dto)
        .subscribe(() => this.router.navigate(['/books']));
    }
    else {
    this.bookService.create(dto)
        .subscribe(() => this.router.navigate(['/books']));
    }
  }
}

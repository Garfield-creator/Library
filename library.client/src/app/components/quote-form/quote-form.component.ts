import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { QuoteService } from '../../services/quote.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-quote-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './quote-form.component.html',
  styleUrl: './quote-form.component.css',
})
export class QuoteFormComponent implements OnInit {

  form!: FormGroup;
  quoteId: number | null = null;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private quoteService: QuoteService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.submitted = false;

    this.form = this.formBuilder.group({
      text: ['', [Validators.required, Validators.maxLength(400)]],
      source: ['', [Validators.required]]
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.quoteId = +id;
      this.quoteService.getById(this.quoteId)
        .subscribe(quote => this.form.patchValue(quote));
    }
  }

  submit(): void {

    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    const formValue = this.form.value;
    const dto = {
      text: formValue.text,
      source: formValue.source
    };


    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.quoteId = +id;
      this.quoteService.update(this.quoteId, dto)
        .subscribe(() => this.router.navigate(['/quote']));
    } else {
      this.quoteService.create(dto)
        .subscribe({
          next: () => this.router.navigate(['/quote']),
          error: (err: unknown) => {
            const httpErr = err as HttpErrorResponse;
            if (httpErr?.status === 409) {
              alert('Du kan max ha 5 citat.');
              return;
            }
            alert('Kunde inte spara citatet. Försök igen.');
          }
        });
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { QuoteService } from '../../services/quote.service';

@Component({
  selector: 'app-quote-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './quote-form.component.html',
  styleUrl: './quote-form.component.css',
})
export class QuoteFormComponent implements OnInit {

  form!: FormGroup;
  quoteId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private quoteService: QuoteService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      text: [''],
      source: ['']
    });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.quoteId = +id;
      this.quoteService.getById(this.quoteId)
        .subscribe(quote => this.form.patchValue(quote));
    }
  }

  submit(): void {
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
        .subscribe(() => this.router.navigate(['/quote']));
    }
  }
}

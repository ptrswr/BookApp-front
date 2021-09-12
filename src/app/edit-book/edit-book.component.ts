import { Component, OnInit, OnDestroy } from '@angular/core';
import { BookDataService } from '../book-data.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { BookService } from '../book.service';



@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css'],
  providers: [DatePipe]

})
export class EditBookComponent implements OnInit {

  subscription?: Subscription
  bookToEdit: any
  editForm!: FormGroup;
  submitted = false;


  constructor(private formBuilder: FormBuilder,
    private dataService: BookDataService,
    private router: Router,
    private datePipe: DatePipe,
    private bookService: BookService) { }

  ngOnInit(): void {
    this.subscription = this.dataService.messageReceived$.subscribe(message => {
      this.bookToEdit = message;
      console.log(message);
    }
    )
    this.editForm = this.formBuilder.group({
      title: [this.bookToEdit.title, Validators.required],
      author: [this.bookToEdit.author, Validators.required],
      publishDate: [this.datePipe.transform(this.bookToEdit.publish_date, 'yyyy-MM-dd'), [Validators.required, Validators.pattern(/\d{4}-\d{2}-\d{2}/)]],
      isbnNum: this.bookToEdit.isbn_num,
      pageCount: this.bookToEdit.page_count,
      coverLink: this.bookToEdit.cover_link,
      language: this.bookToEdit.language
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
  get form() { return this.editForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.editForm.invalid) {
      return;
    }
    this.bookService.updateBook({
      title: this.form.title.value,
      author: this.form.author.value,
      publish_date: this.form.publishDate.value,
      isbn_num: this.form.isbnNum.value,
      page_count: this.form.pageCount.value,
      cover_link: this.form.coverLink.value,
      language: this.form.language.value,
    }, this.bookToEdit.book_id)
      .then((data: any) => {
        alert("Book has been successfully updated")
        this.router.navigate(['']);
        return
      })
      .catch(
        err => {
          this.submitted = false;
          console.log(err);
        }
      )
  }
  onCancel() {
    this.router.navigate(['']);
    return;
  }
}

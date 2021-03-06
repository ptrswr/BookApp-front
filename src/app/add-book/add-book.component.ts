import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookService } from '../book.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {


  addForm!: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, private bookService: BookService, private router: Router) { }


  ngOnInit(): void {
    this.addForm = this.formBuilder.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      // Assuming that user will input full date, although there are incomplete dates in database too 
      publishDate: ['', [Validators.required, Validators.pattern(/\d{4}-\d{2}-\d{2}/)]],
      isbnNum: '',
      pageCount: '',
      coverLink: '',
      language: ''
    });
  }
  get form() { return this.addForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.addForm.invalid) {
      return;
    }
    this.bookService.addBook({
      title: this.form.title.value,
      author: this.form.author.value,
      publish_date: this.form.publishDate.value,
      isbn_num: this.form.isbnNum.value,
      page_count: this.form.pageCount.value,
      cover_link: this.form.coverLink.value,
      language: this.form.language.value,
    }).then((data: any) => {
      alert("Book has been added");
      this.router.navigate(['']);
      return;
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

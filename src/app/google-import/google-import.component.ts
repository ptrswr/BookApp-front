import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { BookService } from '../book.service';
import { Router } from '@angular/router';
import { BooksListComponent } from '../books-list/books-list.component';


@Component({
  selector: 'app-google-import',
  templateUrl: './google-import.component.html',
  styleUrls: ['./google-import.component.css']
})
export class GoogleImportComponent implements OnInit {
  
  importForm!: FormGroup; 
  books: any;

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private bookService: BookService) { }
  
  ngOnInit(): void {
    this.importForm = this.formBuilder.group({
      intitle: '',
      inauthor: '',
      inpublisher: '',
      subject: '',
      isbn: '',
      lccn: '',
      oclc: ''
    });
  }

  onSearch(){
    let queryString = '';
    for (const field in this.importForm.controls) { 
      const formValue = this.importForm.get(field); 
      if(formValue?.value !== "") {
        queryString += field + ':' + formValue?.value + '+';
      }
    }

    queryString = queryString.slice(0, -1);
    console.log(queryString);

    this.bookService.importBooksFromGoogle(queryString)
    .then((data:any) => {
      console.log(data);
      this.books = data.items;
    })
    .catch(
      err => {
        console.log(err);
      }
    ) 
  }
  onSave(){
    let bookArr = [];
    this.books.array.forEach((book:any) => {
      bookArr.push({
        title: book.volumeInfo.title,
        author: book.volumeInfo.authors[0],
        publish_date: book.volumeInfo.publishedDate,
        isbn_num: book.volumeInfo.industryIdentifiers[1].identifier, //in 2007 the ISBN system switched to a 13-digit format
        page_count: book.volumeInfo.pageCount,
        cover_link: book.volumeInfo.previewLink,
        language: book.volumeInfo.language
      })     
    });
    // this.bookService.addImportedBooks({
    //     title: this.form.title.value,
    //     author: this.form.author.value,
    //     publish_date: this.form.publishDate.value,
    //     isbn_num: this.form.isbnNum.value,
    //     page_count: this.form.pageCount.value,
    //     cover_link: this.form.coverLink.value,
    //     language: this.form.language.value,
    // })
    // .then((data:any) => {
    //   console.log(data);
    //   this.books = data.items;
    // })
    // .catch(
    //   err => {
    //     console.log(err);
    //   }
    // )
  }
  onCancel(){
    this.router.navigate(['']);
    return;
  }

}

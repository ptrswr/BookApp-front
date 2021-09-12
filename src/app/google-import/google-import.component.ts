import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { BookService } from '../book.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-google-import',
  templateUrl: './google-import.component.html',
  styleUrls: ['./google-import.component.css']
})
export class GoogleImportComponent implements OnInit {
  
  importForm!: FormGroup; 
  books:any[] = [];
  submitted = false;

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
    this.submitted = true;
    this.books = []
    for (const field in this.importForm.controls) { 
      const formValue = this.importForm.get(field); 
      if(formValue?.value !== "") {
        queryString += field + ':' + formValue?.value + '+';
      }
    }
    if(queryString === ''){
      alert("You have to fill the form first")
      this.submitted = false;
      return
    }
    queryString = queryString.slice(0, -1);
    console.log(queryString);
    this.bookService.importBooksFromGoogle(queryString)
    .then((data:any) => {
      console.log(data);
      this.submitted = false;
      if(data.totalItems === 0){
        alert("No results for given query")
        return
      }
      data.items.forEach((book:any) => {
        book.volumeInfo.authors = book.volumeInfo.authors?.join(', ');
        this.books.push({
          title: book.volumeInfo.title || '',
          author: book.volumeInfo.authors || '',
          publish_date: book.volumeInfo.publishedDate || '',
          isbn_num: book.volumeInfo.industryIdentifiers[1]?.identifier || '', //in 2007 the ISBN system switched to a 13-digit format
          page_count: book.volumeInfo.pageCount || '',
          cover_link: book.volumeInfo.previewLink || '',
          language: book.volumeInfo.language || ''
        })
      });
    })
    .catch(
      err => {
        console.log(err);
        this.submitted = false;
      }
    ) 
  }
  onSave(){
    if(this.books.length === 0){
      alert('Search for some books first!');
      return;
    }
    this.bookService.addImportedBooks(({data: this.books}))
    .then((data:any) => {
      console.log(data);
      this.books = [];
    })
    .catch(
      err => {
        console.log(err);
      }
    )
  }
  onCancel(){
    this.router.navigate(['']);
    this.submitted = false;
    return;
  }

}

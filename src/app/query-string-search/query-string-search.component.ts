import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { BookService } from '../book.service';
import { Router } from '@angular/router';
import { BookDataService } from '../book-data.service';

@Component({
  selector: 'app-query-string-search',
  templateUrl: './query-string-search.component.html',
  styleUrls: ['./query-string-search.component.css']
})
export class QueryStringSearchComponent implements OnInit {

  searchForm!: FormGroup; 
  books:any[] = [];

  constructor(private router: Router,
              private formBuilder: FormBuilder,
              private bookService: BookService,
              private dataService: BookDataService
              ) { }
  
  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      title: '',
      author: '',
      publishDate: '',
      isbnNum: '',
      pageCount: '',
      coverLink: '',
      language: ''
    });
  }

  onSearch(){
    let queryString = '';
    for (const field in this.searchForm.controls) { 
      const formValue = this.searchForm.get(field); 
      if(formValue?.value !== "") {
        queryString += field + ':' + formValue?.value + '|';
      }
    }

    queryString = queryString.slice(0, -1);
    console.log(queryString);
    this.bookService.getBooksByQueryString(queryString)
    .then((data:any) => {
      this.books = data.data;
    })
    .catch(
      err => {
        console.log(err);
      }
    ) 
  }
  editBook(book: any){
    this.dataService.pushMessage(book);
  }
  removeBook(title: string, id: string){
    this.bookService.removeBook(id).then((data: any) =>
    {
      this.books = this.books.filter((book:any) => book.book_id !== id);
      alert(`Book ${title} has been removed`);

    }
    ).catch(err =>
    {
      console.log(err)
    })
  }
  onCancel(){
    this.router.navigate(['']);
    return;
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { BookService } from '../book.service';
import { Router } from '@angular/router';

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
              private bookService: BookService) { }
  
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
        queryString += field + ':' + formValue?.value + '+';
      }
    }

    queryString = queryString.slice(0, -1);
    console.log(queryString);

    this.bookService.importBooksFromGoogle(queryString)
    .then((data:any) => {
      console.log(data);
      data.items.forEach((book:any) => {
        book.volumeInfo.authors = book.volumeInfo.authors.join(', ');
        this.books.push({
          title: book.volumeInfo.title || '',
          author: book.volumeInfo.authors || '',
          publish_date: book.volumeInfo.publishedDate || '',
          isbn_num: book.volumeInfo.industryIdentifiers[1].identifier || '', //in 2007 the ISBN system switched to a 13-digit format
          page_count: book.volumeInfo.pageCount || '',
          cover_link: book.volumeInfo.previewLink || '',
          language: book.volumeInfo.language || ''
        })
         console.log(this.books) 
      });
    })
    .catch(
      err => {
        console.log(err);
      }
    ) 
  }
  onCancel(){
    this.router.navigate(['']);
    return;
  }

}

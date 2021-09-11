import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { BookDataService } from '../book-data.service';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css']
})
export class BooksListComponent implements OnInit {
  books: any;

  constructor(private bookservice: BookService, private dataService: BookDataService) { }

  ngOnInit(): void {
    this.bookservice.getAllBooks().then((data: any) => {
      this.books = data.data;
      this.books.forEach((book: any) => {
        book.publish_date = new Date(book.publish_date); 
      });
    })
  }

  editBook(book: any){
      this.dataService.pushMessage(book);
  }
    

  removeBook(title: string, id: string){
    this.bookservice.removeBook(id).then((data: any) =>
    {
      this.books = this.books.filter((book:any) => book.book_id !== id);
      alert(`Book ${title} has been removed`);

    }
    ).catch(err =>
    {
      console.log(err)
    })
  }

}

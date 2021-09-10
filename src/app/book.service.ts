import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }
  async getAllBooks() {
    return await this.http.get(`${environment.apiUrl}/api/books`).toPromise();
  }
  async getBookById(id:string) {
    return await this.http.get(`${environment.apiUrl}/api/books/${id}`).toPromise();
  }

  async updateBook(body: any, id:string) {
    return await this.http.put(`${environment.apiUrl}/api/books/edit/${id}`, body).toPromise();
  }

  async addBook(body: any) {
    return await this.http.post(`${environment.apiUrl}/api/books/add`, body).toPromise();
  }

  async addImportedBooks(body: any){
    console.log(body);
    return await this.http.post(`${environment.apiUrl}/api/books/import`, body).toPromise();
  }

  async removeBook(id: string) {
    return await this.http.delete(`${environment.apiUrl}/api/books/delete/${id}`).toPromise();
  }
  async importBooksFromGoogle(queryString: string){
    return await this.http.get(`https://www.googleapis.com/books/v1/volumes?q=${queryString}&key=${environment.apiKey}`).toPromise();
  }

}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBookComponent } from './add-book/add-book.component';
import { BooksListComponent } from './books-list/books-list.component';
import { EditBookComponent } from './edit-book/edit-book.component';
import { GoogleImportComponent } from './google-import/google-import.component';
import { QueryStringSearchComponent } from './query-string-search/query-string-search.component';

const routes: Routes = [
  { path: '', component: BooksListComponent },
  { path: 'add', component: AddBookComponent },
  { path: 'edit', component: EditBookComponent },
  { path: 'import', component: GoogleImportComponent },
  { path: 'search', component: QueryStringSearchComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


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
  submitted = false;
  books: any;

  constructor(private router: Router) { }
  
  get form() { return this.importForm.controls; }



  ngOnInit(): void {
  }
  onSubmit(){

  }
  onSave(){

  }
  onCancel(){
    this.router.navigate(['']);
    return;
  }

}

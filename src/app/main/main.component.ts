import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  addForm!: FormGroup; 
  submitted = false;

  constructor(private formBuilder: FormBuilder) { }
  

  ngOnInit(): void {
    this.addForm = this.formBuilder.group({
        title: ['',Validators.required],
        author: ['',Validators.required],
        publishDate: ['',Validators.pattern(/\d{4}-\d{2}-\d{2}/)],
        isbnNum: '',
        pageCount: '',
        coverLink: '',
        language: ''
    });
  }
  get form() { return this.addForm.controls; }

  onSubmit(){
    this.submitted = true;
    if (this.addForm.invalid) {
      return;
    }
    alert("valid");
  }

}

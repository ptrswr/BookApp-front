import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookDataService {
  private messageSource = new BehaviorSubject(0);
  messageReceived$ = this.messageSource.asObservable();

  constructor() { }
  
  pushMessage(message: any) {
    this.messageSource.next(message);
  }
}

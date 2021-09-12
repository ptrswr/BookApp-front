import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css']
})
export class MenuBarComponent implements OnInit {

  items: MenuItem[] = [];

  constructor() { }

  ngOnInit(): void {
    this.items = [
      {
        icon: 'pi pi-bookmark',
        routerLink: '/',
      },
      {
        label: 'List of books',
        icon: 'pi pi-book',
        routerLink: '/'
      },
      {
        label: 'Add new book',
        icon: 'pi pi-plus',
        routerLink: '/add'
      },
      {
        label: 'Import from google',
        icon: 'pi pi-google',
        routerLink: '/import'
      },
      {
        label: 'Search for books',
        icon: 'pi pi-search',
        routerLink: '/search'
      }
    ];
  }

}

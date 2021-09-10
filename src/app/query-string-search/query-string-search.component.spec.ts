import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QueryStringSearchComponent } from './query-string-search.component';

describe('QueryStringSearchComponent', () => {
  let component: QueryStringSearchComponent;
  let fixture: ComponentFixture<QueryStringSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QueryStringSearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QueryStringSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginListPage } from './login-list.page';

describe('LoginListPage', () => {
  let component: LoginListPage;
  let fixture: ComponentFixture<LoginListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

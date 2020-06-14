import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CusNavbarComponent } from './cus-navbar.component';

describe('CusNavbarComponent', () => {
  let component: CusNavbarComponent;
  let fixture: ComponentFixture<CusNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CusNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CusNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmNavbarComponent } from './em-navbar.component';

describe('EmNavbarComponent', () => {
  let component: EmNavbarComponent;
  let fixture: ComponentFixture<EmNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

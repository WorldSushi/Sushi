import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptManagerDialogComponent } from './accept-manager-dialog.component';

describe('AcceptManagerDialogComponent', () => {
  let component: AcceptManagerDialogComponent;
  let fixture: ComponentFixture<AcceptManagerDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcceptManagerDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptManagerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

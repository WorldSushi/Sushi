import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailManagerDialogComponent } from './detail-manager-dialog.component';

describe('DetailManagerDialogComponent', () => {
  let component: DetailManagerDialogComponent;
  let fixture: ComponentFixture<DetailManagerDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailManagerDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailManagerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailWorkgroupDialogComponent } from './detail-workgroup-dialog.component';

describe('DetailWorkgroupDialogComponent', () => {
  let component: DetailWorkgroupDialogComponent;
  let fixture: ComponentFixture<DetailWorkgroupDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailWorkgroupDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailWorkgroupDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

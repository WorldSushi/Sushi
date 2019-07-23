import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditWorkgroupDialogComponent } from './edit-workgroup-dialog.component';

describe('EditWorkgroupDialogComponent', () => {
  let component: EditWorkgroupDialogComponent;
  let fixture: ComponentFixture<EditWorkgroupDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditWorkgroupDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditWorkgroupDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

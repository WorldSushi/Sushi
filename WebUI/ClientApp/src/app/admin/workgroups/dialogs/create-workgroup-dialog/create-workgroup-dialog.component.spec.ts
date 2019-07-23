import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateWorkgroupDialogComponent } from './create-workgroup-dialog.component';

describe('CreateWorkgroupDialogComponent', () => {
  let component: CreateWorkgroupDialogComponent;
  let fixture: ComponentFixture<CreateWorkgroupDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateWorkgroupDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateWorkgroupDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

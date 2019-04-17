import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToplineComponent } from './topline.component';

describe('ToplineComponent', () => {
  let component: ToplineComponent;
  let fixture: ComponentFixture<ToplineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToplineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToplineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

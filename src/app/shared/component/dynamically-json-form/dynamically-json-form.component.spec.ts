import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicallyJsonFormComponent } from './dynamically-json-form.component';

describe('DynamicallyJsonFormComponent', () => {
  let component: DynamicallyJsonFormComponent;
  let fixture: ComponentFixture<DynamicallyJsonFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicallyJsonFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicallyJsonFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

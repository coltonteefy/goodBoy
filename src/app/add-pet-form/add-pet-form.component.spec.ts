import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPetFormComponent } from './add-pet-form.component';

describe('AddPetFormComponent', () => {
  let component: AddPetFormComponent;
  let fixture: ComponentFixture<AddPetFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPetFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPetFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

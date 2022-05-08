import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPeripheralComponent } from './edit-peripheral.component';

describe('EditPeripheralComponent', () => {
  let component: EditPeripheralComponent;
  let fixture: ComponentFixture<EditPeripheralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPeripheralComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPeripheralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoconsultasComponent } from './autoconsultas.component';

describe('AutoconsultasComponent', () => {
  let component: AutoconsultasComponent;
  let fixture: ComponentFixture<AutoconsultasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutoconsultasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoconsultasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImoveisComponent } from './imoveis.component';

describe('ImoveisComponent', () => {
  let component: ImoveisComponent;
  let fixture: ComponentFixture<ImoveisComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImoveisComponent]
    });
    fixture = TestBed.createComponent(ImoveisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

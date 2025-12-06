import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Programok } from './programok';

describe('Programok', () => {
  let component: Programok;
  let fixture: ComponentFixture<Programok>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Programok]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Programok);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

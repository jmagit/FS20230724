import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JmaCoreComponent } from './jma-core.component';

describe('JmaCoreComponent', () => {
  let component: JmaCoreComponent;
  let fixture: ComponentFixture<JmaCoreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [JmaCoreComponent]
    });
    fixture = TestBed.createComponent(JmaCoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

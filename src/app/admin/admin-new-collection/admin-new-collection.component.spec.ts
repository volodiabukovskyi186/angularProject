import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNewCollectionComponent } from './admin-new-collection.component';

describe('AdminNewCollectionComponent', () => {
  let component: AdminNewCollectionComponent;
  let fixture: ComponentFixture<AdminNewCollectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminNewCollectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminNewCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

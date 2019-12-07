import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SowDataPage } from './sow-data.page';

describe('SowDataPage', () => {
  let component: SowDataPage;
  let fixture: ComponentFixture<SowDataPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SowDataPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SowDataPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

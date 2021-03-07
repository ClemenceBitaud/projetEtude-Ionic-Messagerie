import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UserConversationPage } from './user-conversation.page';

describe('UserConversationPage', () => {
  let component: UserConversationPage;
  let fixture: ComponentFixture<UserConversationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserConversationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UserConversationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

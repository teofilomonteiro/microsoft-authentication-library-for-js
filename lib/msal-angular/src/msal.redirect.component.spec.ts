import { TestBed } from '@angular/core/testing';
import {
  IPublicClientApplication,
  PublicClientApplication,
} from '@azure/msal-browser';
import { MsalBroadcastService } from './msal.broadcast.service';
import { MsalModule } from './msal.module';
import { MsalRedirectComponent } from './msal.redirect.component';
import { MsalService } from './msal.service';

let authService: MsalService;
let broadcastService: MsalBroadcastService;

function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: '6226576d-37e9-49eb-b201-ec1eeb0029b6',
      redirectUri: 'http://localhost:4200',
    },
  });
}

function initializeMsal() {
  TestBed.resetTestingModule();

  TestBed.configureTestingModule({
    declarations: [MsalRedirectComponent],
    imports: [MsalModule.forRoot(MSALInstanceFactory(), null, null)],
    providers: [],
  });

  authService = TestBed.inject(MsalService);
  broadcastService = TestBed.inject(MsalBroadcastService);
}

describe('MsalRedirectComponent', () => {
  beforeAll(initializeMsal);

  it('calls handleRedirectObservable on ngInit', (done) => {
    const sampleAccessToken = {
      accessToken: '123abc',
    };

    spyOn(PublicClientApplication.prototype, 'initialize').and.returnValue(
      Promise.resolve()
    );
    spyOn(
      PublicClientApplication.prototype,
      'handleRedirectPromise'
    ).and.callFake(() => {
      return new Promise((resolve) => {
        console.log('Spy called');
        //@ts-ignore
        resolve(sampleAccessToken);

        expect(PublicClientApplication.prototype.initialize).toHaveBeenCalled();
        expect(
          PublicClientApplication.prototype.handleRedirectPromise
        ).toHaveBeenCalled();
        done();
      });
    });

    const component = new MsalRedirectComponent(authService);
    component.ngOnInit();
  });
});

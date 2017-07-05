import {TestBed} from '@angular/core/testing';
import {WindowService} from './window.service';
describe('Window', () => {

  var windowService: WindowService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      // providers:    [ UserService ]  // NO! Don't provide the real service!
      // Provide a test-double instead
      providers: [WindowService]
    });
    windowService = TestBed.get(WindowService);
  });

  it('service created', () => {
    expect(windowService).not.toBeNull();
  });

  it('should return the window.document object', () => {
    expect(windowService.getDocument()).not.toBeNull();
  });

  it('should return the window object', function () {
    expect(windowService.getWindow().location).not.toBeNull();
  });
});

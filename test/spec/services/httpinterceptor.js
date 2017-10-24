'use strict';

describe('Service: httpInterceptor', function () {

  // load the service's module
  beforeEach(module('refreshTokenExempleApp'));

  // instantiate service
  var httpInterceptor;
  beforeEach(inject(function (_httpInterceptor_) {
    httpInterceptor = _httpInterceptor_;
  }));

  it('should do something', function () {
    expect(!!httpInterceptor).toBe(true);
  });

});

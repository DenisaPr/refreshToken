'use strict';

describe('Service: httpBuffer', function () {

  // load the service's module
  beforeEach(module('refreshTokenExempleApp'));

  // instantiate service
  var httpBuffer;
  beforeEach(inject(function (_httpBuffer_) {
    httpBuffer = _httpBuffer_;
  }));

  it('should do something', function () {
    expect(!!httpBuffer).toBe(true);
  });

});

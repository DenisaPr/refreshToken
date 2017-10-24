'use strict';

describe('Service: var', function () {

  // load the service's module
  beforeEach(module('refreshTokenExempleApp'));

  // instantiate service
  var var;
  beforeEach(inject(function (_var_) {
    var = _var_;
  }));

  it('should do something', function () {
    expect(!!var).toBe(true);
  });

});

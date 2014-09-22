'use strict';

describe('Controller: PromotersCtrl', function () {

  // load the controller's module
  beforeEach(module('eventureApp'));

  var PromotersCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    PromotersCtrl = $controller('PromotersCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});

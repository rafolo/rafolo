"use strict";
describe("the mappoint module", function () {
    var mappointServiceMock;
    var $scope, ctrl, log;

    beforeEach(function () {
        mappointServiceMock = jasmine.createSpyObj('mappointService', ['getData']);

        module("ngRoute");
        module("app.mappoint");
        jasmine.getJSONFixtures().fixturesPath='base/test/client/fixture';

        inject(function($rootScope, $controller, $log) {
            $scope = $rootScope.$new();
            log = $log;

            mappointServiceMock.getData.andReturn(getJSONFixture('legend.json'));

            ctrl = $controller('LegendController', {
                $scope: $scope,
                mappointService: mappointServiceMock
            });
        });
    });


    it("should start with map point data populated", function () {
        expect(mappointServiceMock.getData).toHaveBeenCalled();
        expect($scope.amsterdam.lat).not.toBeUndefined();
    });
});

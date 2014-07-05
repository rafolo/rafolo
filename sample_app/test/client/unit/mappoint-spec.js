"use strict";
describe("the mappoint module", function () {
    var mappointServiceMock;
    var $scope, ctrl, log;

    beforeEach(function () {
        mappointServiceMock = jasmine.createSpyObj('mappointService', ['getData']);

        debugger;
        module("ngRoute");
        module("app.mappoint.points");

        jasmine.getJSONFixtures().fixturesPath='base/test/client/fixture';

        inject(function($rootScope, $controller, $log) {
            $scope = $rootScope.$new();
            log = $log;

            mappointServiceMock.getData.andReturn(getJSONFixture('legend.json'));

            ctrl = $controller('MapPointsController', {
                $scope: $scope,
                mappointService: mappointServiceMock
            });
        });
    });


    it("should start with map point data populated", function () {
        expect(mappointServiceMock.getData).toHaveBeenCalled();
        expect($scope.osloCenter.lat).not.toBeUndefined();
    });
});

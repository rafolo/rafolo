"use strict";
describe("the home module", function () {
    var helloMock, helloWorldService;

    beforeEach(function () {

        module("ngRoute");
        module("app.home", ['$provide', function($provide) {
            helloMock = { sayHello: jasmine.createSpy().andReturn("Hello Mock!") };
            $provide.value('helloWorldService', helloMock);
        }]);

        //properly instantiate the service
        inject(["helloWorldService", function (_helloWorldService) {
            helloWorldService = _helloWorldService;
        }]);

        console.log = jasmine.createSpy('console');
    });


    it("should succeed", function () {
        expect(true).toBe(true);

    });

    it("should call sayHello on app.home.helloWorldService", function () {
        expect(helloWorldService.sayHello()).toBe("Hello Mock!");
        expect(helloMock.sayHello).toHaveBeenCalled();
    });
});
